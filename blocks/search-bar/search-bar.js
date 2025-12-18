/**
 * Search Bar Block
 * A prominent search input with a search button
 */
export default function decorate(block) {
  // Get placeholder text from block content or use default
  const placeholderText = block.textContent.trim() || 'What are you looking for?';

  // Clear the block content
  block.textContent = '';

  // Create search container
  const searchContainer = document.createElement('div');
  searchContainer.className = 'search-bar-container';

  // Create search form
  const searchForm = document.createElement('form');
  searchForm.className = 'search-bar-form';
  searchForm.setAttribute('role', 'search');
  searchForm.addEventListener('submit', (e) => {
    e.preventDefault();
    // Visual only - no search functionality
  });

  // Create input wrapper with icon
  const inputWrapper = document.createElement('div');
  inputWrapper.className = 'search-bar-input-wrapper';

  // Search icon
  const searchIcon = document.createElement('span');
  searchIcon.className = 'search-bar-icon';
  searchIcon.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
    <circle cx="11" cy="11" r="8"></circle>
    <path d="m21 21-4.35-4.35"></path>
  </svg>`;

  // Search input
  const searchInput = document.createElement('input');
  searchInput.type = 'search';
  searchInput.className = 'search-bar-input';
  searchInput.placeholder = placeholderText;
  searchInput.setAttribute('aria-label', 'Search');

  inputWrapper.append(searchIcon, searchInput);

  // Search button
  const searchButton = document.createElement('button');
  searchButton.type = 'submit';
  searchButton.className = 'search-bar-button';
  searchButton.textContent = 'Search';

  searchForm.append(inputWrapper, searchButton);
  searchContainer.append(searchForm);
  block.append(searchContainer);
}
