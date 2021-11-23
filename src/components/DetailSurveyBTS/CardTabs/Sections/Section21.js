import React from "react";
import { CardBody, CardTitle } from "reactstrap";

//Import Style
import style from "../style.module.scss";

function Section21({ data }) {
  let placeholderData = {
    generalcommenthtml:
      "<ol><li>this is a html view test</li><li>this is a html view test2</li></ol>",
  };

  return (
    <CardBody>
      {/* {data.page21 ? ( */}
      <>
        <span className={style.section}>Section 21</span>
        <CardTitle className={`mb-5 mt-2 text26`}>General Comment</CardTitle>
        <div className={`font-weight-bold`}>
          <div
            dangerouslySetInnerHTML={{
              __html: placeholderData.generalcommenthtml,
            }}
          />
        </div>
      </>
      {/* ) : (<p>No Data Found</p> */}
      {/* )} */}
    </CardBody>
  );
}

export default Section21;
