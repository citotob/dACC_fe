import React, { useState } from "react";

import { Form, CardTitle } from "reactstrap";

// Form Editor
import { convertFromRaw } from "draft-js";
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";

const FormEditors = (props) => {
  const content = {
    entityMap: {},
    blocks: [
      {
        key: "637gr",
        text: "Initialized from content state.",
        type: "unstyled",
        depth: 0,
        inlineStyleRanges: [],
        entityRanges: [],
        data: {},
      },
    ],
  };
  const [contentState, setcontentState] = useState(convertFromRaw(content));
  const onContentStateChange = (contentState) => {
    setcontentState(contentState);
    window.localStorage.setItem(
      "rawdatageneralcomment",
      JSON.stringify(contentState)
    );
  };

  return (
    <>
      {/* <CardTitle>General Comment</CardTitle> */}
      <Form method='post'>
        <Editor
          toolbarClassName='toolbarClassName'
          wrapperClassName='wrapperClassName'
          editorClassName='editorClassName'
          onContentStateChange={onContentStateChange}
        />
      </Form>
    </>
  );
};

export default FormEditors;
