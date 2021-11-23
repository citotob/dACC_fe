import React, { Component } from "react";
import { EditorState, convertToRaw, ContentState } from "draft-js";
import { Editor } from "react-draft-wysiwyg";
import draftToHtml from "draftjs-to-html";
import htmlToDraft from "html-to-draftjs";

class RawToHtml extends Component {
  constructor(props) {
    super(props);
    const html = "<p>Hey this <strong>editor</strong> rocks 😀</p>";
    const contentBlock = htmlToDraft(html);
    if (contentBlock) {
      const contentState = ContentState.createFromBlockArray(
        contentBlock.contentBlocks
      );
      const editorState = EditorState.createWithContent(contentState);
      this.state = {
        editorState,
      };
    }
  }

  onEditorStateChange = (editorState) => {
    this.setState({
      editorState,
    });
  };

  render() {
    const { editorState } = this.state;
    console.log("editorState ", editorState);
    return (
      <div>
        <Editor
          editorState={editorState}
          wrapperClassName='demo-wrapper'
          editorClassName='demo-editor'
          onEditorStateChange={this.onEditorStateChange}
        />
        <textarea
          disabled
          value={draftToHtml(convertToRaw(editorState.getCurrentContent()))}
        />
      </div>
    );
  }
}
// import React from "react";
// import { convertToRaw } from "draft-js";
// import draftToHtml from "draftjs-to-html";

// const editorState = {
//   blocks: [
//     {
//       key: "19f8s",
//       text: "this is 1 link",
//       type: "unordered-list-item",
//       depth: 0,
//       inlineStyleRanges: [],
//       entityRanges: [],
//       data: {},
//     },
//     {
//       key: "8aqsr",
//       text: "this is 2 list",
//       type: "unordered-list-item",
//       depth: 0,
//       inlineStyleRanges: [],
//       entityRanges: [],
//       data: {},
//     },
//     {
//       key: "9t42u",
//       text: "this is not a list",
//       type: "unstyled",
//       depth: 0,
//       inlineStyleRanges: [],
//       entityRanges: [],
//       data: {},
//     },
//   ],
//   entityMap: {},
// };
// const rawContentState = convertToRaw(editorState.getCurrentContent());

// const markup = draftToHtml(rawContentState);

// function RawToHtml() {
//   return <div>{markup}</div>;
// }

export default RawToHtml;
