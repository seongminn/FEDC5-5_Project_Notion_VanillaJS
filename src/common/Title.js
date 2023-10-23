export default function Title({ $target, initialState, onTitleClick }) {
  // state = {title, href}
  // 타이틀이 구독한다. 누구의 상태를? => documentPage의 상태를 => 바뀌면, getDocument로 다시 가져온다.
  const $title = document.createElement("a");
  this.state = initialState;
  $target.appendChild($title);
  $title.setAttribute("href", this.state.href);
  this.render = () => {
    $title.textContent = this.state.title;
  };
  this.setState = (nextState) => {
    this.state = nextState;
    this.render();
  };
  $title.addEventListener("click", (e) => {
    e.preventDefault();
    //onTitleClick(e);
  });
  this.render();
}