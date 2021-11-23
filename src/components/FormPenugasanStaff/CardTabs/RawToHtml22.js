import React, { useState } from "react";
import { EditorState, convertToRaw, ContentState } from "draft-js";
import { Editor } from "react-draft-wysiwyg";
import draftToHtml from "draftjs-to-html";
import htmlToDraft from "html-to-draftjs";

// redux
import { useSelector, useDispatch } from "react-redux";
import {
  setSection21,
  setSection42,
  setBtsMain,
} from "../../../store/formSurveyStaff/action";

function RawToHtml22(props) {
  // == LOCAL STORAGE
  let strSection21 = "section21";
  let strSection42 = "section42";
  let localSection21 = JSON.parse(
    window.localStorage.getItem(strSection21.concat(props.kodeSurvey))
  );
  let localSection42 = JSON.parse(
    window.localStorage.getItem(strSection42.concat(props.kodeSurvey))
  );

  // redux
  const dispatch = useDispatch();
  const btsMain = useSelector((state) => state.FormSurveyStaff.btsMain);
  const section21 = useSelector((state) => state.FormSurveyStaff.section21);
  const section42 = useSelector((state) => state.FormSurveyStaff.section42);

  // Raw To HTML Functions
  const html =
    props.section === "21"
      ? btsMain.section21.generalcommenthtml
      : props.section === "42"
      ? btsMain.section42.catatanhtml
      : "";
  const contentBlock = htmlToDraft(html);
  const [contentState, setcontentState] = useState(
    ContentState.createFromBlockArray(contentBlock.contentBlocks)
  );
  const [editorState, setEditorState] = useState(
    EditorState.createWithContent(contentState)
  );
  const onEditorStateChange = (editorState) => {
    setEditorState(editorState);
    switch (props.section) {
      case "21":
        dispatch(
          setBtsMain({
            ...btsMain,
            section21: {
              ...btsMain.section21,
              generalcommenthtml: draftToHtml(
                convertToRaw(editorState.getCurrentContent())
              ),
            },
          })
        );

        // dispatch(
        //   setSection21({
        //     ...section21,
        //     // generalcommentraw: editorState,
        //     generalcommenthtml: draftToHtml(
        //       convertToRaw(editorState.getCurrentContent())
        //     ),
        //   })
        // );

        break;
      case "42":
        dispatch(
          setBtsMain({
            ...btsMain,
            section42: {
              ...btsMain.section42,
              catatanhtml: draftToHtml(
                convertToRaw(editorState.getCurrentContent())
              ),
            },
          })
        );

        break;

      default:
        break;
    }
  };

  return (
    <div>
      <Editor
        wrapperClassName='demo-wrapper'
        editorClassName='demo-editor'
        editorState={editorState} // value
        // editorState={btsMain.section21.generalcommentraw} // value
        onEditorStateChange={onEditorStateChange} // onchange
      />
      {/* <textarea disabled value={btsMain.section21.generalcommenthtml} /> */}
    </div>
  );
}

export default RawToHtml22;
