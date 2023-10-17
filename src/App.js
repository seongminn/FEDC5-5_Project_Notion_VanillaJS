import DocumentList from './DocumentList.js';
import Editor from './Editor.js';
import { request } from './api.js';

export default function App({ $target }) {
  const $documentListContainer = document.createElement('div');
  $documentListContainer.className = 'document-list-container';

  const $editorContainer = document.createElement('div');
  $editorContainer.className = 'editor-container';
  
  $target.appendChild($documentListContainer);
  $target.appendChild($editorContainer);
  

  this.state = {
    documentList: [],
    selectedDocument: null,
  }

  this.setState = (nextState) => {
    this.state = nextState;
    this.render();
  };

  this.render = () => {
    const { selectedDocument } = this.state;
    if (selectedDocument) {
      $editorContainer.style.display = 'block';
    } else {
      $editorContainer.style.display = 'none';
    }
  }

  const documentList = new DocumentList({
    $target: $documentListContainer,
    initialState: [],
    onClickDocument: async (id) => {
      await fetchSelectedDocument(id);
    },
    onClickAddButton: async (id) => {
      
    }
  });

  const editor = new Editor({
    $target: $editorContainer,
    initialState: this.state.selectedDocument,
    onEditing: (post) => {
      
    }
  });

  const fetchRootDocuments = async () => {
    const rootDocuments = await request();
    documentList.setState(rootDocuments);
  };
  
  const fetchSelectedDocument = async (id) => {
    const selectedDocument = await request(`/${id}`);
    this.setState({
      ...this.state,
      selectedDocument,
    })

    editor.setState(selectedDocument);
  }

  fetchRootDocuments();
  this.render();
}
