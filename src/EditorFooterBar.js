import { push } from "./router.js";

export default function EditorFooterBar({ $target, initialState }) {
  const $div = document.createElement("div");
  $div.className = "treeFooterBar";
  this.state = initialState;

  this.setState = (nextState) => {
    this.state = nextState;
    this.render();
    const count = depthCheck(this.state.document.documents, 0);

    this.state.totalHeight = 27 + 21 * count;
    $div.style.height = "21px";
  };

  $target.appendChild($div);

  this.render = () => {
    $div.innerHTML = `
            <div class="treeFooterBarDiv" >
              <div class="treeFooterBarButtonDiv" >
                <button class="treeFooterBarButton" data-toggle="false">▲</button> <hr />
              </div>
              <div class="treeFooterBarHeader"> <p>현재 문서 : ${
                this.state.document.title
              }</p>
                    <hr />
                    <div class="treeFooterBarSub">
                        <ul>
                            ${
                              this.state.document.documents &&
                              this.state.document.documents
                                .map(
                                  (doc) =>
                                    `<li class="treeFooterBarSubDocument" id=${
                                      doc.id
                                    }>
                                    <a style="cursor:pointer">${doc.title}</a>
                                </li>
                                    ${
                                      doc.documents.length > 0
                                        ? documentDepth(doc.documents, 8, [])
                                        : ""
                                    }
                                `
                                )
                                .join("")
                            }
                        </ul>
                    </div>
                </div>
            </div>
            
        `;
    //현재 진행중인 문서 div 높이 : 21
    //document.querySelector(".treeFooterBar").clientHeight : 전체 footer바 높이
  };
  this.render();

  //에디터 하단 바의 애니메이션을 위해 현재 문서에서 하위 문서의 총 갯수를 구함
  const depthCheck = (list, count) => {
    for (let i = 0; i < list.length; i++) {
      const { id, title, documents } = list[i];
      count++;
      if (documents.length > 0) {
        count += depthCheck(documents, 0);
      }
    }
    return count;
  };

  //현재 문서의 하위문서를 innerHTML로 갖고옴
  const documentDepth = (list, depth, arr) => {
    for (let i = 0; i < list.length; i++) {
      const { id, title, documents } = list[i];
      arr.push(
        `
                <li id=${id} class="treeFooterBarSubDocument" style="padding-left:${depth}px">
                    <a style="cursor:pointer">${title}</a>
                     ${
                       documents.length > 0
                         ? documentDepth(documents, depth + 8, [])
                         : ""
                     }
                </li>
          `
      );
    }

    return arr.join("");
  };

  $div.addEventListener("click", (e) => {
    const $li = e.target.closest("li");

    if (e.target.className === "treeFooterBarButton") {
      $div.style.height = this.state.totalHeight + "px";
    } else if ($li) {
      const { id } = $li;
      push(`/documents/${id}`);
    }
  });
}