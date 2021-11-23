import React, { useState, useEffect } from "react";
import { Label, FormGroup, Input, Form } from "reactstrap";
import styles from "./styles.module.css";
import useDeepCompareEffect from "use-deep-compare-effect";

const FilterBox = (props) => {
  const { defaultPick, label } = props;
  const [selectValue, setSelectValue] = useState(props.value);

  useEffect(() => {
    setSelectValue(props.value);
    return () => {};
  }, [props.value]);

  const handleChange = (e) => {
    setSelectValue(e.target.value);
    props.handleFilter(e.target.value);
  };

  return (
    <>
      <div className={"d-none d-md-block"}>
        <Form className={"w-75 mb-1 d-flex justify-content-between align-items-center"}>
          <Label className={styles.label_filter} for={label}>
            {label}
          </Label>
          <Input
            bssize="sm"
            className={styles.filter}
            type="select"
            name="select"
            id={label}
            onKeyDown={props.handleKeyPress}
            value={selectValue}
            onChange={handleChange}>
            <option value="Default">{defaultPick ? defaultPick : "Filter"}</option>
            {props.dataFilter.map((i, index) => (
              <option key={index} value={i}>
                {i}
              </option>
            ))}
          </Input>
        </Form>
      </div>

      <div className={"d-block d-md-none"}>
        <Form className={"w-100 mb-1 d-flex justify-content-between align-items-center"}>
          <Label className={styles.label_filter} for={label}>
            {label}
          </Label>
          <Input
            bssize="sm"
            className={styles.filter}
            type="select"
            name="select"
            id={label}
            value={props.reset ? "" : selectValue}
            onChange={handleChange}>
            <option value="Default">{defaultPick ? defaultPick : "Filter"}</option>
            {props.dataFilter.map((i, index) => (
              <option key={index} value={i}>
                {i}
              </option>
            ))}
          </Input>
        </Form>
      </div>
    </>
  );
};

export default FilterBox;
