/**
 * Asset Cards Block
 * Large image cards with overlay labels (2-column grid)
 *
 * DA.live Authoring:
 * | Asset Cards |
 * | Photography | image | /link |
 * | Brand, Strategy & Creative | image | /link |
 */

export default function decorate(block) {
  const rows = [...block.children];

  // Create cards container
  const container = document.createElement('div');
  container.className = 'asset-cards-container';

  rows.forEach((row) => {
    const columns = [...row.children];

    // Create card element
    const card = document.createElement('a');
    card.className = 'asset-card';

    // First column: label/category
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
        // Check if it's an img tag
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
      // Check for link in label column
      const linkElement = labelCol.querySelector('a');
      if (linkElement) {
        href = linkElement.href;
      }
    }

    card.href = href;

    // Add image wrapper with gradient overlay
    const imageWrapper = document.createElement('div');
    imageWrapper.className = 'asset-card-image';
    if (picture) {
      imageWrapper.append(picture.cloneNode(true));
    }
    card.append(imageWrapper);

    // Add label badge
    if (label) {
      const labelBadge = document.createElement('span');
      labelBadge.className = 'asset-card-label';
      labelBadge.textContent = label;
      card.append(labelBadge);
    }

    container.append(card);
  });

  // Clear original content and add container
  block.textContent = '';
  block.append(container);
}
