/**
 * Carousel Block
 * A hero carousel with auto-rotation and pagination dots
 *
 * DA.live Authoring:
 * | Carousel |
 * | Slide 1 content (text/heading) | Slide 1 Image |
 * | Slide 2 content (text/heading) | Slide 2 Image |
 */

const AUTOPLAY_INTERVAL = 5000; // 5 seconds

export default function decorate(block) {
  const rows = [...block.children];

  if (rows.length === 0) return;

  // Create carousel structure
  const carousel = document.createElement('div');
  carousel.className = 'carousel-container';

  const slidesWrapper = document.createElement('div');
  slidesWrapper.className = 'carousel-slides';

  const pagination = document.createElement('div');
  pagination.className = 'carousel-pagination';

  let currentSlide = 0;
  let autoplayTimer = null;

  /**
   * Stop autoplay
   */
  function stopAutoplay() {
    if (autoplayTimer) {
      clearInterval(autoplayTimer);
      autoplayTimer = null;
    }
  }

  /**
   * Start autoplay
   */
  function startAutoplay() {
    if (rows.length > 1) {
      // eslint-disable-next-line no-use-before-define
      autoplayTimer = setInterval(nextSlide, AUTOPLAY_INTERVAL);
    }
  }

  /**
   * Reset autoplay timer
   */
  function resetAutoplay() {
    stopAutoplay();
    startAutoplay();
  }

  /**
   * Navigate to a specific slide
   * @param {number} index The slide index to navigate to
   */
  function goToSlide(index) {
    const slides = slidesWrapper.querySelectorAll('.carousel-slide');
    const dots = pagination.querySelectorAll('.carousel-dot');

    // Remove active class from current slide and dot
    slides[currentSlide].classList.remove('active');
    dots[currentSlide].classList.remove('active');

    // Update current slide index
    currentSlide = index;
    if (currentSlide >= slides.length) currentSlide = 0;
    if (currentSlide < 0) currentSlide = slides.length - 1;

    // Add active class to new slide and dot
    slides[currentSlide].classList.add('active');
    dots[currentSlide].classList.add('active');

    // Reset autoplay timer
    resetAutoplay();
  }

  /**
   * Go to the next slide
   */
  function nextSlide() {
    goToSlide(currentSlide + 1);
  }

  // Process each row as a slide
  rows.forEach((row, index) => {
    const slide = document.createElement('div');
    slide.className = 'carousel-slide';
    if (index === 0) slide.classList.add('active');

    // Get content and image columns
    const columns = [...row.children];

    // Content column (text, heading, description)
    const contentCol = columns[0];
    if (contentCol) {
      const content = document.createElement('div');
      content.className = 'carousel-slide-content';
      content.innerHTML = contentCol.innerHTML;
      slide.append(content);
    }

    // Image column
    const imageCol = columns[1];
    if (imageCol) {
      const imageWrapper = document.createElement('div');
      imageWrapper.className = 'carousel-slide-image';
      const picture = imageCol.querySelector('picture');
      if (picture) {
        imageWrapper.append(picture.cloneNode(true));
      } else {
        imageWrapper.innerHTML = imageCol.innerHTML;
      }
      slide.append(imageWrapper);
    }

    slidesWrapper.append(slide);

    // Create pagination dot
    const dot = document.createElement('button');
    dot.className = 'carousel-dot';
    if (index === 0) dot.classList.add('active');
    dot.setAttribute('aria-label', `Go to slide ${index + 1}`);
    dot.addEventListener('click', () => goToSlide(index));
    pagination.append(dot);
  });

  // Pause autoplay on hover/focus
  carousel.addEventListener('mouseenter', stopAutoplay);
  carousel.addEventListener('focusin', stopAutoplay);
  carousel.addEventListener('mouseleave', startAutoplay);
  carousel.addEventListener('focusout', (e) => {
    if (!carousel.contains(e.relatedTarget)) {
      startAutoplay();
    }
  });

  // Keyboard navigation
  carousel.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft') {
      goToSlide(currentSlide - 1);
    } else if (e.key === 'ArrowRight') {
      goToSlide(currentSlide + 1);
    }
  });

  carousel.append(slidesWrapper);
  if (rows.length > 1) {
    carousel.append(pagination);
  }

  // Clear original content and add carousel
  block.textContent = '';
  block.append(carousel);

  // Start autoplay
  startAutoplay();
}
