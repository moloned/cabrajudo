import { blogPosts } from './blog-data.js';

document.addEventListener('DOMContentLoaded', () => {
  initMobileMenu();
  highlightActiveNav();
  initImageFallbacks();
  initSamuraiBlog();
  initNativeBlog();
});

/**
 * Mobile navigation menu toggle
 */
function initMobileMenu() {
  const toggleBtn = document.querySelector('.mobile-menu-toggle');
  const drawer = document.querySelector('.mobile-drawer');

  if (toggleBtn && drawer) {
    toggleBtn.addEventListener('click', () => {
      const isOpen = drawer.classList.toggle('open');
      toggleBtn.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
      toggleBtn.innerHTML = isOpen 
        ? '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>'
        : '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg>';
    });
  }
}

/**
 * Highlight active page in navigation bar
 */
function highlightActiveNav() {
  const currentPath = window.location.pathname.toLowerCase();
  const navLinks = document.querySelectorAll('.nav-link, .mobile-nav-link');

  navLinks.forEach(link => {
    const href = link.getAttribute('href').toLowerCase();
    
    // Check if match
    if (
      (currentPath.endsWith('/') || currentPath.endsWith('index.html')) && (href === '/' || href === 'index.html' || href === './') ||
      (currentPath.includes('gradings') && href.includes('gradings')) ||
      (currentPath.includes('shop') && href.includes('shop')) ||
      (currentPath.includes('payments') && href.includes('payments')) ||
      (currentPath.includes('staff') && href.includes('staff')) ||
      (currentPath.includes('alonzo') && href.includes('alonzo')) ||
      ((currentPath.includes('safeguarding') || currentPath.includes('policies')) && href.includes('safeguarding'))
    ) {
      link.classList.add('active');
    } else {
      link.classList.remove('active');
    }
  });
}

/**
 * Image error fallback to clean SVG avatars
 */
function initImageFallbacks() {
  const images = document.querySelectorAll('img');
  images.forEach(img => {
    img.addEventListener('error', function() {
      // Check role or alt text to provide contextual avatar
      const alt = (this.getAttribute('alt') || '').toLowerCase();
      if (alt.includes('alonzo') || alt.includes('coach') || alt.includes('staff') || alt.includes('officer')) {
        this.src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'%3E%3Crect width='100' height='100' fill='%231F2937'/%3E%3Ccircle cx='50' cy='38' r='20' fill='%23F59E0B'/%3E%3Cpath d='M20,88 C20,68 35,58 50,58 C65,58 80,68 80,88 Z' fill='%23F59E0B'/%3E%3C/svg%3E";
      } else if (alt.includes('venue') || alt.includes('school')) {
        this.src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 400 250'%3E%3Crect width='400' height='250' fill='%231E293B'/%3E%3Ctext x='200' y='125' fill='%23FDE047' font-family='sans-serif' font-size='18' text-anchor='middle'%3ELindsay Road National School%3C/text%3E%3Ctext x='200' y='155' fill='%2394A3B8' font-family='sans-serif' font-size='14' text-anchor='middle'%3EDublin 7 • Training Venue%3C/text%3E%3C/svg%3E";
      }
    });
  });
}

/**
 * Interactive Samurai blog reveal and gallery lightbox
 */
function initSamuraiBlog() {
  // Gallery image click lightbox
  const galleryItems = document.querySelectorAll('.blog-gallery-item');
  const lightbox = document.getElementById('gallery-lightbox');
  const lightboxImg = document.getElementById('lightbox-img');
  const lightboxCaption = document.getElementById('lightbox-caption');
  const lightboxClose = document.getElementById('lightbox-close');

  if (galleryItems.length && lightbox && lightboxImg) {
    galleryItems.forEach(item => {
      item.addEventListener('click', () => {
        const img = item.querySelector('img');
        const caption = item.querySelector('.blog-gallery-caption');
        if (img) {
          lightboxImg.src = img.src;
          lightboxImg.alt = img.alt;
          if (caption && lightboxCaption) {
            lightboxCaption.textContent = caption.textContent;
          }
          lightbox.classList.add('active');
        }
      });
    });

    if (lightboxClose) {
      lightboxClose.addEventListener('click', () => {
        lightbox.classList.remove('active');
      });
    }

    lightbox.addEventListener('click', (e) => {
      if (e.target === lightbox) {
        lightbox.classList.remove('active');
      }
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && lightbox.classList.contains('active')) {
        lightbox.classList.remove('active');
      }
    });
  }
}

/**
 * Native Blog & Archive Feed System (Zero 3rd-Party Dependencies)
 */
function initNativeBlog() {
  const grid = document.getElementById('native-blog-grid');
  if (!grid || !Array.isArray(blogPosts)) return;

  const countAll = document.getElementById('count-all');
  if (countAll) countAll.textContent = blogPosts.length;

  const searchInput = document.getElementById('blog-search-input');
  const filterBtns = document.querySelectorAll('.blog-filter-btn');
  const loadMoreBtn = document.getElementById('blog-load-more-btn');
  const loadMoreWrap = document.getElementById('blog-load-more-wrap');
  const emptyState = document.getElementById('blog-empty-state');

  // Modal elements
  const modal = document.getElementById('article-modal');
  const modalClose = document.getElementById('modal-close-btn');
  const modalCategory = document.getElementById('modal-category');
  const modalDate = document.getElementById('modal-date');
  const modalAuthor = document.getElementById('modal-author');
  const modalTitle = document.getElementById('modal-title');
  const modalIntro = document.getElementById('modal-intro');
  const modalFeaturedImg = document.getElementById('modal-featured-img');
  const modalFeaturedImgWrap = document.getElementById('modal-featured-img-wrap');
  const modalContent = document.getElementById('modal-content');

  let currentCategory = 'all';
  let searchQuery = '';
  let visibleCount = 6;

  function getFilteredPosts() {
    return blogPosts.filter((post) => {
      const matchCat = (currentCategory === 'all') || (post.category.toLowerCase().includes(currentCategory.toLowerCase()));
      const searchTerms = `${post.title} ${post.intro} ${post.content || ''}`.toLowerCase();
      const matchSearch = !searchQuery || searchTerms.includes(searchQuery.toLowerCase());
      return matchCat && matchSearch;
    });
  }

  function getBadgeClass(category) {
    const c = (category || '').toLowerCase();
    if (c.includes('competition')) return 'badge-competitions';
    if (c.includes('news')) return 'badge-club-news';
    if (c.includes('training') || c.includes('tips')) return 'badge-training-tips';
    if (c.includes('gear') || c.includes('merch')) return 'badge-gear-merch';
    return 'badge-club-heritage';
  }

  function renderGrid() {
    const filtered = getFilteredPosts();
    const toShow = filtered.slice(0, visibleCount);

    grid.innerHTML = '';

    if (filtered.length === 0) {
      if (emptyState) emptyState.style.display = 'block';
      if (loadMoreWrap) loadMoreWrap.style.display = 'none';
      return;
    }

    if (emptyState) emptyState.style.display = 'none';

    toShow.forEach(post => {
      const card = document.createElement('article');
      card.className = 'native-blog-card';
      card.setAttribute('tabindex', '0');
      card.setAttribute('role', 'button');
      card.setAttribute('aria-label', `Read article: ${post.title}`);

      const badgeClass = getBadgeClass(post.category);
      const imgUrl = post.featuredImage || 'images/cabra_logo.svg';

      card.innerHTML = `
        <div class="native-blog-thumb-wrap">
          <img src="${imgUrl}" alt="${post.title}" class="native-blog-thumb" loading="lazy">
        </div>
        <div class="native-blog-card-body">
          <span class="native-blog-badge ${badgeClass}">${post.category}</span>
          <div class="native-blog-date">📅 ${post.dateFormatted || post.date}</div>
          <h4 class="native-blog-card-title">${post.title}</h4>
          <p class="native-blog-card-intro">${post.intro || ''}</p>
          <div style="display:flex;justify-content:space-between;align-items:center;">
            <button type="button" class="native-blog-read-btn">
              <span>Read Full Story &amp; Photos</span>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
            </button>
            <button type="button" class="native-blog-pdf-btn" aria-label="Download PDF" onclick="event.stopPropagation(); downloadPostPdf('${post.id}')" style="background:none;border:none;cursor:pointer;color:#4B5563;display:flex;align-items:center;padding:5px;" title="Download PDF">
               <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" y1="15" x2="12" y2="3"></line></svg>
            </button>
          </div>
        </div>
      `;

      card.addEventListener('click', () => openArticle(post));
      card.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          openArticle(post);
        }
      });

      grid.appendChild(card);
    });

    if (loadMoreWrap) {
      loadMoreWrap.style.display = (visibleCount < filtered.length) ? 'block' : 'none';
    }
  }

  function openArticle(post) {
    if (!modal) return;
    if (modalCategory) {
      modalCategory.textContent = post.category;
      modalCategory.className = `native-blog-badge ${getBadgeClass(post.category)}`;
    }
    if (modalDate) modalDate.textContent = `📅 ${post.dateFormatted || post.date}`;
    if (modalAuthor) modalAuthor.textContent = `✍️ By ${post.author || 'Cabra Judo Club'}`;
    if (modalTitle) modalTitle.textContent = post.title;
    if (modalIntro) {
      modalIntro.textContent = post.intro;
      modalIntro.style.display = post.intro ? 'block' : 'none';
    }
    if (modalFeaturedImg && modalFeaturedImgWrap) {
      if (post.featuredImage && !post.featuredImage.endsWith('.svg')) {
        modalFeaturedImg.src = post.featuredImage;
        modalFeaturedImg.alt = post.title;
        modalFeaturedImgWrap.style.display = 'block';
      } else {
        modalFeaturedImgWrap.style.display = 'none';
      }
    }
    if (modalContent) {
      modalContent.innerHTML = post.content || `<p>${post.intro}</p>`;
    }

    modal.classList.add('active');
    modal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  }

  function closeModal() {
    if (!modal) return;
    modal.classList.remove('active');
    modal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  if (modalClose) {
    modalClose.addEventListener('click', closeModal);
  }

  if (modal) {
    modal.addEventListener('click', (e) => {
      if (e.target === modal) closeModal();
    });
  }

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal && modal.classList.contains('active')) {
      closeModal();
    }
  });

  // Filter Buttons
  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      currentCategory = btn.getAttribute('data-filter');
      visibleCount = 6;
      renderGrid();
    });
  });

  // Search Input
  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      searchQuery = e.target.value.trim();
      visibleCount = 6;
      renderGrid();
    });
  }

  // Load More Button
  if (loadMoreBtn) {
    loadMoreBtn.addEventListener('click', () => {
      visibleCount += 6;
      renderGrid();
    });
  }

  // Initial render
  renderGrid();
}



window.downloadPostPdf = function(postId) {
  const post = blogPosts.find(p => p.id === postId);
  if (post) {
    openArticle(post);
    setTimeout(() => {
      window.print();
    }, 300);
  }
};
