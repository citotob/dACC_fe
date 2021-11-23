import React, { useState } from "react";
import FilterCalendar from "../../components/ModuleFilter/FilterDate/FilterDate";

//STYLE
import style from "./style.module.css";
import moment from "moment";
import { Button } from "reactstrap";

export default function ModuleFilter() {
  const [modalCalendar, setModalCalendar] = useState(false);
  const toggleModalCalendar = () => {
    setModalCalendar(!modalCalendar);
  };
  const [selectedDate, setSelectedDate] = useState("");
  const [tanggal, setTanggal] = useState("");

  console.log("Tanggal di Module Filter : ", tanggal);
  let enumerateDaysBetweenDates = (startDate, endDate) => {
    let now = startDate.clone(),
      dates = [];

    while (now.isSameOrBefore(endDate)) {
      dates.push(now.format("DD-MM-YYYY"));
      now.add(1, "days");
    }
    return dates;
  };
  //return filtered data
  const handleSelectedDate = (date) => {
    let startDate = moment(date[0].startDate);
    let endDate = moment(date[0].endDate);
    //data for
    setSelectedDate(
      `${startDate.format("DD-MM-YYYY")} - ${endDate.format("DD-MM-YYYY")}`
    );
    setTanggal(enumerateDaysBetweenDates(startDate, endDate));
  };
  return (
    <div className={`container-fluid ${style.containerPageModuleFilter}`}>
      <div className='font-weight-bold'>Filter By Date</div>
      <FilterCalendar
        modalCalendar={modalCalendar}
        toggleModalCalendar={toggleModalCalendar}
        selectedDate={handleSelectedDate}
      />
      <div className='row mt-3'>
        <div className='col-lg-3 col-md-3'>
          <Button
            color=''
            onClick={toggleModalCalendar}
            id='tanggal'
            className={`${style.btnTanggal} ${style.inputWrapper}`}
            style={{ marginRight: "10px" }}
          >
            <p className='selectedDate'>
              {selectedDate}
              <span
                className='mdi mdi-18px mdi-calendar-range'
                style={{ float: "right" }}
              />
            </p>
          </Button>
        </div>
      </div>
    </div>
  );
}
