/**
 * Tag Buttons Block
 * A horizontal row of pill-shaped link buttons
 *
 * DA.live Authoring:
 * | Tag Buttons |
 * | PPT Template | /link |
 * | Sage Font | /link |
 * | Sage Master Logo | /link |
 */

export default function decorate(block) {
  const rows = [...block.children];

  // Create container for tag buttons
  const container = document.createElement('div');
  container.className = 'tag-buttons-container';

  rows.forEach((row) => {
    const columns = [...row.children];

    // First column is the label/text
    const labelCol = columns[0];
    // Second column is the link (optional)
    const linkCol = columns[1];

    if (labelCol) {
      const label = labelCol.textContent.trim();

      // Check if there's an existing link in the label column
      const existingLink = labelCol.querySelector('a');
      let href = '#';

      if (existingLink) {
        href = existingLink.href;
      } else if (linkCol) {
        // Check for link in second column
        const linkElement = linkCol.querySelector('a');
        if (linkElement) {
          href = linkElement.href;
        } else {
          href = linkCol.textContent.trim() || '#';
        }
      }

      // Create tag button
      const tagButton = document.createElement('a');
      tagButton.className = 'tag-button';
      tagButton.href = href;
      tagButton.textContent = label;

      container.append(tagButton);
    }
  });

  // Clear original content and add container
  block.textContent = '';
  block.append(container);
}
