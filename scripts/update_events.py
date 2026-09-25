import urllib.request
import re

url = 'https://irishjudoassociation.ie/events/'
req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'})
try:
    with urllib.request.urlopen(req) as response:
        html = response.read().decode('utf-8')
except Exception as e:
    print(f"Failed to fetch {url}: {e}")
    exit(1)

events = re.findall(r'<a[^>]*class="tribe-events-calendar-list__event-title-link[^"]*"[^>]*>(.*?)</a>', html, re.DOTALL)
dates = re.findall(r'<div class="tribe-events-calendar-list__event-datetime-wrapper[^"]*">.*?<time[^>]*datetime="([^"]+)"', html, re.DOTALL)

events_data = []
for e, d in zip(events, dates):
    name = e.replace('\t', '').replace('\n', '').strip()
    name = re.sub(r'&#8211;', '-', name)
    name = re.sub(r'&#038;', '&', name)
    date = d.replace('\t', '').replace('\n', '').strip()
    date = re.sub(r'<[^>]+>', '', date).strip()
    
    # Simple logic for categories
    name_lower = name.lower()
    minors = "✅" if "minor" in name_lower else "❌"
    pre_cadet = "✅" if "pre-cadet" in name_lower or "pre cadet" in name_lower else "❌"
    junior = "✅" if "junior" in name_lower else "❌"
    senior = "✅" if "senior" in name_lower else "❌"
    veteran = "✅" if "veteran" in name_lower or "master" in name_lower else "❌"
    
    # Broaden categories if it's a general championship or open
    if "open" in name_lower or "championship" in name_lower:
        minors = pre_cadet = junior = senior = veteran = "✅"

    events_data.append((date, name, minors, pre_cadet, junior, senior, veteran))

# Now read the existing events.html and replace the tbody
try:
    with open('events.html', 'r', encoding='utf-8') as f:
        events_page = f.read()
except FileNotFoundError:
    print("events.html not found, cannot update.")
    exit(1)

tbody_start = events_page.find('<tbody>')
tbody_end = events_page.find('</tbody>')

if tbody_start == -1 or tbody_end == -1:
    print("Could not find <tbody> in events.html")
    exit(1)

new_tbody = '<tbody>\n'
for date, name, mi, pc, ju, se, ve in events_data:
    new_tbody += f'''      <tr style="border-bottom: 1px solid #e5e7eb;">
        <td style="padding: 12px; font-weight: 500;">{date}</td>
        <td style="padding: 12px; font-weight: 600; color: #1F2937;">{name}</td>
        <td style="padding: 12px; text-align: center;">{mi}</td>
        <td style="padding: 12px; text-align: center;">{pc}</td>
        <td style="padding: 12px; text-align: center;">{ju}</td>
        <td style="padding: 12px; text-align: center;">{se}</td>
        <td style="padding: 12px; text-align: center;">{ve}</td>
      </tr>\n'''

new_html = events_page[:tbody_start] + new_tbody + events_page[tbody_end:]

with open('events.html', 'w', encoding='utf-8') as f:
    f.write(new_html)

print(f"Successfully updated events.html with {len(events_data)} events.")
