import React, { useState, useEffect } from "react";
import styles from "./styles.module.css";
import { Input, FormGroup, Form, Label } from "reactstrap";
//asset
import SearchIcon from "../../assets/icons/SearchIcon.svg";

const SearchBox = (props) => {
  const [selectValue, setSelectValue] = useState(props.value);

  useEffect(() => {
    setSelectValue(props.value);
    return () => {};
  }, [props.value]);

  let { keywords } = props;

  const handleChange = (e) => {
    props.handleTerm(e.target.value);
  };
  return (
    <>
      <div className={"d-none d-md-block w-100"}>
        <Form className={"w-75 mb-1 d-flex justify-content-between align-items-center"}>
          <div className={"d-flex justify-content-between w-100"}>
            <Label className={styles.label_search} for={keywords}>
              {keywords}
            </Label>
            <Input
              bssize="sm"
              value={selectValue}
              className={styles.input}
              onChange={(e) => handleChange(e)}
              id={keywords}
              onKeyDown={props.handleKeyPress}
              placeholder={keywords}></Input>
          </div>
        </Form>
      </div>

      <div className={"d-block d-md-none"}>
        <Form className={"w-100 mb-1 d-flex justify-content-between align-items-center"}>
          <div className={"d-flex justify-content-between w-100"}>
            <Label className={styles.label_search} for={keywords}>
              {keywords}
            </Label>
            <Input
              bssize="sm"
              value={props.value}
              className={styles.input}
              onChange={(e) => handleChange(e)}
              id={keywords}
              placeholder={keywords}></Input>
          </div>
        </Form>
      </div>
    </>
  );
};

export default SearchBox;
