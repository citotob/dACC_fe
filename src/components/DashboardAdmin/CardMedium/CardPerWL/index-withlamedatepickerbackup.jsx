import React, { useState } from "react";
import { InputGroup } from "reactstrap";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import VerticalBar from "./VerticalBar";

//IMPORT CUSTOM STYLING
import style from "../style.module.css";

var dateFormat = require("dateformat");

function Index() {
  const [default_date, setdefault_date] = useState(new Date());
  const [from_date, setfrom_date] = useState(new Date());
  const [to_date, setto_date] = useState(new Date());

  console.log("From Date : ", from_date);
  console.log("To Date : ", to_date);

  return (
    <div className='col col-lg-6 col-m-12 col-s-12'>
      {/* BOX PUTIH  */}
      <div className={`${style.cardMediumWrapper} px-4`}>
        <div className={`${style.cardMediumTitle}`}>
          <div className={`${style.cardMediumLabel}`}>
            <p>Update Penambahan Lokasi Sudah Disurvey</p>
          </div>
          <div className={`${style.cardMediumButtonsWrapper}`}>
            <div className={`${style.cardMediumButtons}`}>
              <button className={`${style.active}`}>Akses Internet</button>
              <button className={`${style.inactive}`}>BTS</button>
            </div>
            <div className={`${style.cardMediumChartFilter}`}>
              <InputGroup>
                <DatePicker
                  className='form-control'
                  selected={from_date}
                  onChange={(date) => setfrom_date(dateFormat(date, "isoDate"))}
                />
              </InputGroup>

              <InputGroup>
                <DatePicker
                  className='form-control'
                  selected={to_date}
                  onChange={(date) => setto_date(dateFormat(date, "isoDate"))}
                />
              </InputGroup>
            </div>
          </div>
        </div>
        <div className={`${style.chartWrapper}`}>
          <VerticalBar />
        </div>
      </div>
    </div>
  );
}

export default Index;
