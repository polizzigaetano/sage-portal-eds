/**
 * Marketing Cards Block
 * 3-column cards with pill labels at top
 *
 * DA.live Authoring:
 * | Marketing Cards |
 * | Video | image | /link |
 * | Spotlight | image | /link |
 * | Foundation | image | /link |
 */

export default function decorate(block) {
  const rows = [...block.children];

  // Create cards container
  const container = document.createElement('div');
  container.className = 'marketing-cards-container';

  rows.forEach((row) => {
    const columns = [...row.children];

    // Create card element
    const card = document.createElement('a');
    card.className = 'marketing-card';

    // First column: label
    const labelCol = columns[0];
    let label = '';
    if (labelCol) {
      label = labelCol.textContent.trim();
    }

    // Second column: image
    const imageCol = columns[1];
    let picture = null;
    if (imageCol) {
      picture = imageCol.querySelector('picture');
      if (!picture) {
        const img = imageCol.querySelector('img');
        if (img) {
          picture = document.createElement('picture');
          picture.append(img.cloneNode(true));
        }
      }
    }

    // Third column: link (optional)
    const linkCol = columns[2];
    let href = '#';
    if (linkCol) {
      const linkElement = linkCol.querySelector('a');
      if (linkElement) {
        href = linkElement.href;
      } else {
        href = linkCol.textContent.trim() || '#';
      }
    } else if (labelCol) {
      const linkElement = labelCol.querySelector('a');
      if (linkElement) {
        href = linkElement.href;
      }
    }

    card.href = href;

    // Add label pill at top
    if (label) {
      const labelPill = document.createElement('span');
      labelPill.className = 'marketing-card-label';
      labelPill.textContent = label;
      card.append(labelPill);
    }

    // Add image
    if (picture) {
      const imageWrapper = document.createElement('div');
      imageWrapper.className = 'marketing-card-image';
      imageWrapper.append(picture.cloneNode(true));
      card.append(imageWrapper);
    }

    container.append(card);
  });

  // Clear original content and add container
  block.textContent = '';
  block.append(container);
}
