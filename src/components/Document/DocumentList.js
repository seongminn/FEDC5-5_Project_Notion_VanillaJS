export default function DocumentList({
  $target,
  initialState,
  onClickDocument,
  onClickAddButton,
  onClickInitialAddButton,
  onClickRemoveButton,
}) {
  const $documentList = document.createElement('div');
  $documentList.className = 'document-list';

  $target.appendChild($documentList);

  this.state = initialState;

  this.setState = (nextState) => {
    this.state = nextState;
    this.render();
  };

  const renderDocuments = (documents) => {
    return `
      <ul>
        ${documents
          .map(
            (document) => `
          <li data-id="${document.id}" class="document-item">
            <div class='main-document-item'>
              <span class="title">${document.title}</span>
              <div class='button-group'>
                <button class='remove-button'>x</button>
                <button class='add-button'>+</button>
              </div>
            </div>
            
            ${
              document.documents && document.documents.length > 0
                ? renderDocuments(document.documents)
                : ''
            }
          </li>
        `,
          )
          .join('')}
      </ul>
    `;
  };

  this.render = () => {
    $documentList.innerHTML = renderDocuments(this.state);
  };

  $documentList.addEventListener('click', (e) => {
    const $li = e.target.closest('li');

    if ($li) {
      const { id } = $li.dataset;
      const { className } = e.target;

      if (className === 'add-button') {
        onClickAddButton(id);
      } else if (className === 'title') {
        onClickDocument(id);
      } else if (className === 'remove-button') {
        onClickRemoveButton(id);
      }
    }
  });
  this.render();
}