/**
 * Resource Cards Block
 * 4-column grid for "The Basics" style sections
 *
 * DA.live Authoring:
 * | Resource Cards |
 * | Iconography | image | /link |
 * | Logos | image | /link |
 * | Templates | image | /link |
 * | Guidelines | image | /link |
 */

export default function decorate(block) {
  const rows = [...block.children];

  // Create cards container
  const container = document.createElement('div');
  container.className = 'resource-cards-container';

  rows.forEach((row) => {
    const columns = [...row.children];

    // Create card element
    const card = document.createElement('a');
    card.className = 'resource-card';

    // First column: label
    const labelCol = columns[0];
    let label = '';
    if (labelCol) {
      label = labelCol.textContent.trim();
    }

    // Second column: image/icon
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
      labelPill.className = 'resource-card-label';
      labelPill.textContent = label;
      card.append(labelPill);
    }

    // Add image/icon
    if (picture) {
      const imageWrapper = document.createElement('div');
      imageWrapper.className = 'resource-card-image';
      imageWrapper.append(picture.cloneNode(true));
      card.append(imageWrapper);
    }

    container.append(card);
  });

  // Clear original content and add container
  block.textContent = '';
  block.append(container);
}
