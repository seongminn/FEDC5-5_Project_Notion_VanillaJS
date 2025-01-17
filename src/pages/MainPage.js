import { push, replace } from '@/router';
import Component from '@/core/Component';
import DocumentList from '@/components/DocumentList';
import Editor from '@/components/Editor';
import Navigation from '@/components/Navigation';
import Fallback from '@/components/Fallback';
import DocumentHeader from '@/components/DocumentHeader';

import {
  getAllDocuments,
  createDocument,
  deleteDocument,
  getDetailOfDocument,
  updateDocument,
} from '@/api/document';
import { API_END_POINT } from '@/constants/api';
import { debounce } from '@/utils/debounce';
import { createTemplate } from '@/utils/dom';
import { ERROR_MESSAGE } from '@/constants/error';

export default class MainPage extends Component {
  constructor($target) {
    super($target);

    this.fetchDocumentList();
  }

  async setup() {
    this.state = { currentId: null };

    this.$sidebar = createTemplate('<aside class="sidebar"></aside>');
    this.$mainSection = createTemplate('<section class="mainSection"></section>');

    this.$target.appendChild(this.$sidebar);
    this.$target.appendChild(this.$mainSection);

    this.createInstance();
  }

  createInstance() {
    this.$sidebarHeader = new DocumentHeader(this.$sidebar);
    this.$documentList = new DocumentList(this.$sidebar, {
      onSelect: this.handleDocumentSelect.bind(this),
      onCreate: this.handleDocumentCreate.bind(this),
      onDelete: this.handleDocumentDelete.bind(this),
    });
    this.$editor = new Editor(this.$mainSection, {
      onEdit: debounce(this.handleEditorEdit.bind(this), 1000),
    });

    this.$navigation = new Navigation(this.$mainSection);
    this.$fallback = new Fallback(this.$mainSection, { isError: false, message: null });
  }

  setState(nextState) {
    if (this.state.currentId === nextState.currentId) return;

    this.$fallback.setState({ isError: false, code: null });
    this.state = nextState;
    this.render();
  }

  render() {
    if (!this.state.currentId) {
      this.$editor.setState(null);
      this.$navigation.setState(null);
      return;
    }

    this.fetchCurrentDocument(this.state.currentId);
  }

  async fetchDocumentList() {
    try {
      const documentList = await getAllDocuments();

      this.$documentList.setState({ ...this.$documentList.state, documentList });
    } catch (error) {
      this.$mainSection.replaceChildren();
      this.$fallback.setState({ isError: true, code: error.code });
    }
  }

  async fetchCurrentDocument(documentId) {
    try {
      const currentDocument = await getDetailOfDocument(documentId);

      this.$editor.setState(currentDocument);
      this.$navigation.setState(currentDocument.documents);
    } catch (error) {
      this.$mainSection.replaceChildren();
      this.$fallback.setState({ isError: true, code: error.code });
    }
  }

  handleDocumentSelect(documentId) {
    push(`${API_END_POINT.DOCUMENTS}/${documentId}`);
  }

  async handleDocumentCreate(documentId = null) {
    try {
      const newDocument = await createDocument(documentId);

      this.fetchDocumentList();
      push(`${API_END_POINT.DOCUMENTS}/${newDocument.id}`);
    } catch (error) {
      this.$mainSection.replaceChildren();
      this.$fallback.setState({ isError: true, message: ERROR_MESSAGE[error.code] });
    }
  }

  async handleDocumentDelete(documentId) {
    try {
      await deleteDocument(documentId);

      // TODO push가 아니라, replace로 수정해야 함!
      if (this.state.currentId === documentId) replace('/');
      this.fetchDocumentList();
    } catch (error) {
      // TODO 에러 발생 시 $editor.setState로 내부 값 변경해서 렌더링해주기
      this.$mainSection.replaceChildren();
      this.$fallback.setState({ isError: true, message: ERROR_MESSAGE[error.code] });
    }
  }

  async handleEditorEdit(nextState) {
    try {
      const { id, title, content } = nextState;

      await updateDocument(id, { title, content });
      this.fetchDocumentList(); // TODO 가능하면 낙관적 업데이트 해볼 것
    } catch (error) {
      // TODO 에러 발생 시 $editor.setState로 내부 값 변경해서 렌더링해주기
      this.$mainSection.replaceChildren();
      this.$fallback.setState({ isError: true, message: ERROR_MESSAGE[error.code] });
    }
  }
}
