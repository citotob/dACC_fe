import React, { useState, useEffect } from "react";
import { MDBContainer, MDBModal, MDBModalBody, MDBModalHeader } from "mdbreact";
import "./style.css";
import { addDays } from "date-fns";
import { Container, Button, Row, Alert, Col } from "reactstrap";
import "react-date-range/dist/styles.css"; // main css file
import "react-date-range/dist/theme/default.css"; // theme css file
import { DateRangePicker } from "react-date-range";
// ------------------REDUX---------------------
import { connect } from "react-redux";

const FilterCalendar = (props) => {
  const [isOpen, setIsOpen] = useState(false); //open alert
  const [notif, setNotif] = useState(false); //danger or success
  const [message, setMessage] = useState(""); //alert message
  const [state, setState] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: "selection",
    },
  ]);
  const handleChange = (date) => {
    //check date first value
    let firstState = [
      {
        startDate: new Date(),
        endDate: new Date(),
        key: "selection",
      },
    ];
    if (state == firstState) {
      setState([
        {
          startDate: date[0].startDate,
          endDate: addDays(date[0].endDate, 7),
          key: "selection",
        },
      ]);
    } else {
      setState(date);
    }
  };
  const handleCheckTanggal = () => {
    // if (differenceInDays(state[0].endDate, state[0].startDate) < 6) {
    //   setIsOpen(true);
    //   setNotif(false);
    //   setMessage("Range Tanggal Minimal 7 Hari");
    //   setTimeout(() => {
    //     setIsOpen(false);
    //   }, 5000);
    // }
    // if (differenceInMonths(state[0].endDate, state[0].startDate) > 1) {
    // setIsOpen(true);
    // setNotif(false);
    // setMessage("Range Tanggal Tidak Boleh Lebih dari 1 bulan");
    // setTimeout(() => {
    //   setIsOpen(false);
    // }, 5000);
    // } else {
    props.toggleModalCalendar();
    props.selectedDate(state);
    // }
    return 0;
  };

  const today = new Date();
  const thePast = new Date(2006, 1, 1);

  return (
    <MDBContainer>
      <MDBModal
        className='DatePickerCustom'
        size='lg'
        isOpen={props.modalCalendar}
        toggle={props.toggleModalCalendar}
        centered={true}
      >
        <MDBModalHeader className='text-center displayContent'>
          <Container>
            <Row className='col-lg-12'>
              <Col className='col-lg-4 mx-auto'>Pilih Tanggal</Col>
            </Row>
          </Container>
        </MDBModalHeader>
        <MDBModalBody>
          <Container className='containerCalendar'>
            <Row className='col-lg-12 mx-auto'>
              <Col className='col-lg-12 mx-auto'>
                <Alert
                  className='w-100 text-center wrapperAlert'
                  color={notif ? "success" : "danger"}
                  isOpen={isOpen}
                >
                  {message}
                </Alert>
              </Col>
            </Row>
            <Row className='rowCalendar'>
              <DateRangePicker
                className='mx-auto'
                onChange={(item) => handleChange([item.selection])}
                showSelectionPreview={true}
                moveRangeOnFirstSelection={false}
                direction='horizontal'
                months={2}
                ranges={state}
                direction='horizontal'
                minDate={thePast}
                maxDate={today}
              />
            </Row>
            <Row>
              <Button
                color=''
                onClick={handleCheckTanggal}
                className='btn btn-rounded btnCekJam mx-auto'
              >
                Filter
              </Button>
            </Row>
          </Container>
        </MDBModalBody>
      </MDBModal>
    </MDBContainer>
  );
};
const mapStatetoProps = (state) => {
  const { data } = state.dataReducer;
  return { data };
};
export default connect(mapStatetoProps, null)(FilterCalendar);
