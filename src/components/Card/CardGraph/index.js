import React, { useState, useEffect, useRef } from "react";
import { Card, Button, CardBody, Row } from "reactstrap";
import DateRangePicker from "react-bootstrap-daterangepicker";
import styles from "./styles.module.css";
import "bootstrap-daterangepicker/daterangepicker.css";

import { select, axisBottom, axisLeft, scaleLinear, scaleBand } from "d3";
import * as d3 from "d3";
import moment from "moment";

function CardGraph() {
  // ini untuk d3js
  const [data, setData] = useState([]);
  const [dateAwalVal, setDateAwalVal] = useState();
  const [dateAkhirVal, setDateAkhirVal] = useState();
  const [dateAwalValBTS, setDateAwalValBTS] = useState();
  const [dateAkhirValBTS, setDateAkhirValBTS] = useState();
  const [hasil, setHasil] = useState([]);
  const [bts, setBts] = useState(false);
  const [ai, setAi] = useState(true);
  const svgRefAi = useRef();
  const svgRefBts = useRef();

  // ini untuk datepicker
  const [date, setDate] = useState();
  function handleApply(event, picker) {
    const dateAwalVal = moment(picker.startDate).format("YYYY-MM-DD 00:00:00");
    const dateAkhirVal = moment(picker.endDate).format("YYYY-MM-DD 23:59:59");

    handleChartAI(dateAwalVal, dateAkhirVal);
    handleChartBTS(dateAwalVal, dateAkhirVal);
  }

  function handleShow() {
    // const dateAwalVal = moment(picker.startDate).format('YYYY-MM-DD 00:00:00');
    // const dateAkhirVal = moment(picker.endDate).format('YYYY-MM-DD 23:59:59');
    const lastWeek = new Date();
    lastWeek.setDate(lastWeek.getDate() - 7);
    const date = new Date();
    date.setDate(date.getDate() - 7);
    const dateAwalVal = moment(date).format("YYYY-MM-DD 00:00:00");
    const dateAkhirVal = moment(new Date()).format("YYYY-MM-DD 23:59:59");
    handleChartAI(dateAwalVal, dateAkhirVal);
    handleChartBTS(dateAwalVal, dateAkhirVal);
  }
  useEffect(() => {
    handleShow();
  }, []);

  function handleChartAI(dateAwalVal, dateAkhirVal) {
    let formData = new FormData();
    formData.append("from", dateAwalVal);
    formData.append("to", dateAkhirVal);
    const w = 500;
    const h = 100;
    const requestOptions = {
      method: "POST",
      body: formData,
    };
    fetch(`${process.env.REACT_APP_BE_URL}/survey/getsurveybydateai/`, requestOptions)
      .then((result) => result.json())
      .then((result) => {
        const xData = result.values.map((value) => {
          return value.nilai;
        });

        // akan memanggil dari setiap inisial data
        const svg = select(svgRefAi.current);
        const xScale = scaleBand()
          .domain(result.values.map((value, index) => index))
          .range([30, 550])
          .padding(0.2);

        let yScale;
        if (xData.every(v => v === 0)) {
          yScale = scaleLinear()
            // .domain([0, 250])
            // .domain([0, Math.max(...xData)])
            .range([150, 0]);
        } else {
          yScale = scaleLinear()
            // .domain([0, 250])
            .domain([0, Math.max(...xData)])
            .range([150, 0]);
        }

        // const yScale = scaleLinear()
        //   // .domain([0, 250])
        //   .domain([0, Math.max(...xData)])
        //   .range([150, 0]);
        const colorScaleAi = scaleLinear().domain([100]).range(["#2C3780", "#2C3780"]).clamp(true);

        const xAxis = axisBottom(xScale)
          .ticks(result.values.length)
          // .tickFormat((index) => result.values[index].tanggal);
          .tickFormat((index) => moment(result.values[index].tanggal).format("DD/MM/YYYY"));

        var tooltipstext = svg
          .append("text")
          .text("circle")
          .attr("fill", "none")
          .attr("font-size", "12px");

        svg.select(".Xaxis").style("transform", "translateY(160px").call(xAxis);

        const yAxis = axisLeft(yScale).tickFormat(function (e) {
          if (Math.floor(e) !== e) {
            return;
          }

          return e;
        });

        svg
          .select(".Yaxis")
          .style("transform", "translate(30px, 10px)")
          // .style('padding', '')
          .call(yAxis);

        svg
          .selectAll(".bar")
          .data(xData)
          .join("rect")
          .attr("class", "bar")
          .attr("fill", "#2C3780")
          .style("transform", "scale(1,-1)")
          // .style('color', 'yellow')
          .attr("x", (value, index) => xScale(index))
          .attr("y", -160)
          .attr("width", xScale.bandwidth())
          .text((d) => d)
          .on("mouseenter", function (value, index) {
            d3.select(this).attr("fill", "orange");
            tooltipstext
              .text(value + " lokasi")
              .attr("fill", "black")
              .attr("x", xScale(index) + 5)
              .attr("y", yScale(value) + 9);
          })
          .on("mouseleave", function (value, index) {
            tooltipstext.attr("fill", "none");
            d3.select(this).attr("fill", "#2C3780");
          })
          .transition()
          .attr("height", (value) => 150 - yScale(value));

        svg
          .selectAll("text")
          .data(
            result.values.map((value) => {
              return value.nilai;
            })
          )
          .enter()
          .append("text")
          .text((d) => d)
          .attr("x", (d, i) => i * 30)
          .attr("y", (d, i) => h - (d * 3 + 3));
      })
      .catch((e) => console.log("error", e));
  }

  // bts
  function handleChartBTS(dateAwalValBTS, dateAkhirValBTS) {
    let formData = new FormData();
    formData.append("from", dateAwalValBTS);
    formData.append("to", dateAkhirValBTS);
    const w = 500;
    const h = 100;
    const requestOptions = {
      method: "POST",
      body: formData,
    };
    fetch(`${process.env.REACT_APP_BE_URL}/survey/getsurveybydatebts/`, requestOptions)
      .then((result) => result.json())
      .then((result) => {
        const xData = result.values.map((value) => {
          return value.nilai;
        });

        // akan memanggil dari setiap inisial data
        const svg = select(svgRefBts.current);
        const xScale = scaleBand()
          // .domain(result.values.map((value,index)  => { return value.nilai}))
          .domain(result.values.map((value, index) => index))
          .range([30, 550])
          .padding(0.2);

        let yScale;
        if (xData.every(v => v === 0)) {
          yScale = scaleLinear()
            // .domain([0, 250])
            // .domain([0, Math.max(...xData)])
            .range([150, 0]);
        } else {
          yScale = scaleLinear()
            // .domain([0, 250])
            .domain([0, Math.max(...xData)])
            .range([150, 0]);
        }

        // const yScale = scaleLinear()
        //   // .domain([0, 250])
        //   .domain([0, Math.max(...xData)])
        //   .range([150, 0]);
        const xAxis = axisBottom(xScale)
          .ticks(result.values.length)
          .tickFormat((index) => moment(result.values[index].tanggal).format("DD/MM/YYYY"));

        var tooltipstext = svg
          .append("text")
          .text("circle")
          .attr("fill", "none")
          .attr("font-size", "12px");

        svg.select(".XaxisBts").style("transform", "translateY(160px").call(xAxis);

        const yAxis = axisLeft(yScale).tickFormat(function (e) {
          if (Math.floor(e) != e) {
            return;
          }

          return e;
        });

        svg
          .select(".YaxisBts")
          .style("transform", "translate(30px, 10px)")
          // .style('padding', '')
          .call(yAxis);
        svg
          .selectAll(".bar")
          .data(
            result.values.map((value) => {
              return value.nilai;
            })
          )
          .join("rect")
          .attr("class", "bar")
          .attr("fill", "#c24141")
          .style("transform", "scale(1,-1)")
          // .style('color', 'yellow')
          .attr("x", (value, index) => xScale(index))
          .attr("y", -160)
          .attr("width", xScale.bandwidth())
          .text((d) => d)
          .on("mouseenter", function (value, index) {
            d3.select(this).attr("fill", "orange");
            tooltipstext
              .text(value + " lokasi")
              .attr("fill", "black")
              .attr("x", xScale(index) + 5)
              .attr("y", yScale(value) + 9);
          })
          .on("mouseleave", function (value, index) {
            tooltipstext.attr("fill", "none");
            d3.select(this).attr("fill", "#c24141");
          })
          .transition()
          .duration(1000)
          .attr("height", (value) => 150 - yScale(value));

        svg
          .selectAll("text")
          .data(
            result.values.map((value) => {
              return value.nilai;
            })
          )
          .enter()
          .append("text")
          .text((d) => d)
          .attr("x", (d, i) => i * 30)
          .attr("y", (d, i) => h - (d * 3 + 3));
      })
      .catch((e) => console.log("error", e));
  }

  const showChartAI = () => {
    setAi(true);
    setBts(false);
  };

  const showChartBTS = () => {
    setBts(true);
    setAi(false);
  };

  return (
    // <div>Card Graph</div>
    <>
      <Card className={`${styles.total_card}`}>
        <CardBody>
          <div className={"d-none d-md-block"}>
            <div className={"d-flex justify-content-between "}>
              <h6>
                <b>Update Penambahan Lokasi Sudah Disurvey</b>
              </h6>
              <div className={"d-flex flex-column align-items-end"}>
                <Row className={"mb-2"}>
                  <Button size="sm" onClick={showChartAI} className={ai && styles.btnAI}>
                    Akses Internet
                  </Button>
                  <Button
                    size="sm"
                    onClick={showChartBTS}
                    className={`${bts && styles.btnBTS} ml-2`}>
                    BTS
                  </Button>
                </Row>
                <Row>
                  <DateRangePicker
                    onApply={handleApply}
                    initialSettings={{
                      dateLimit: {
                        days: 7,
                      },
                      locale: {
                        format: "DD/MM/YYYY",
                      },
                    }}>
                    <input className={styles.dateRange} name="dateRange" />
                  </DateRangePicker>
                </Row>
              </div>
            </div>
          </div>
          <div className={"d-block d-md-none"}>
            <h6 className={"text-center"}>
              <b>Update Penambahan Lokasi Sudah Disurvey</b>
            </h6>
            <Button size="sm" onClick={showChartAI} className={ai && styles.btnAI}>
              Akses Internet
            </Button>
            <Button
              size="sm"
              onClick={showChartBTS}
              className={`${bts && styles.btnBTS} ml-2 mr-2`}>
              BTS
            </Button>
            <DateRangePicker
              onApply={handleApply}
              initialSettings={{
                dateLimit: {
                  days: 7,
                },
                locale: {
                  format: "DD/MM/YYYY",
                },
              }}>
              <input className={styles.dateRange} name="dateRange" />
            </DateRangePicker>
          </div>
          <div style={{ display: ai ? "block" : "none" }}>
            <center>
              <svg viewBox="0 0 600 180" ref={svgRefAi} className={styles.chartLine}>
                <g className="Yaxis" />
                <g className="Xaxis" />
              </svg>
            </center>
          </div>
          <div style={{ display: bts ? "block" : "none" }}>
            <center>
              <svg viewBox="0 0 600 180" ref={svgRefBts} className={styles.chartLine}>
                <g className="YaxisBts" />
                <g className="XaxisBts" />
              </svg>
            </center>
          </div>
        </CardBody>
      </Card>
    </>
  );
}

export default CardGraph;
