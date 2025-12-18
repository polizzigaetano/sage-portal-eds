import { getMetadata } from '../../scripts/aem.js';
import { loadFragment } from '../fragment/fragment.js';

/**
 * loads and decorates the footer
 * @param {Element} block The footer block element
 */
export default async function decorate(block) {
  // load footer as fragment
  const footerMeta = getMetadata('footer');
  const footerPath = footerMeta ? new URL(footerMeta, window.location).pathname : '/footer';
  const fragment = await loadFragment(footerPath);

  // decorate footer DOM
  block.textContent = '';
  const footer = document.createElement('div');
  footer.className = 'footer-content';

  if (fragment) {
    // Process fragment sections
    const sections = fragment.querySelectorAll(':scope > div');

    sections.forEach((section, index) => {
      const wrapper = document.createElement('div');

      // First section is typically the logo
      if (index === 0) {
        wrapper.className = 'footer-logo';
        const picture = section.querySelector('picture');
        if (picture) {
          wrapper.append(picture.cloneNode(true));
        } else {
          wrapper.innerHTML = section.innerHTML;
        }
      // Second section is copyright text
      } else if (index === 1) {
        wrapper.className = 'footer-copyright';
        wrapper.innerHTML = section.innerHTML;
      // Third section is legal links
      } else if (index === 2) {
        wrapper.className = 'footer-legal';
        const links = section.querySelectorAll('a');
        links.forEach((link, linkIndex) => {
          wrapper.append(link.cloneNode(true));
          // Add separator between links
          if (linkIndex < links.length - 1) {
            const separator = document.createElement('span');
            separator.className = 'separator';
            separator.textContent = '|';
            wrapper.append(separator);
          }
        });
      } else {
        wrapper.innerHTML = section.innerHTML;
      }

      footer.append(wrapper);
    });
  }

  block.append(footer);
}
