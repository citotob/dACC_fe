
import React, {Fragment} from "react";
// import "../../assets/css/bootstrap.css";
import { Table, Row, Spinner, Button, Alert, Input, Pagination, PaginationItem, PaginationLink } from 'reactstrap';
// import { useMediaQuery } from 'react-responsive'

const Loading = (props) => {
	const container={
    backgroundColor:"white",
    padding:"0.5rem",
    width:"40%",
    boxSizing: "border-box",
    borderRadius: "6px",
    height:"95%",
    position:"absolute",
    top: "1%",
    right: "1%",
    display:"flex",
    alignItems:"center",
    justifyContent:"center",
    WebkitBoxShadow: "10px 10px 50px 0px rgba(0,0,0,0.1)",
    MozBoxShadow: "10px 10px 50px 0px rgba(0,0,0,0.1)",
    BoxShadow: "10px 10px 50px 0px rgba(0,0,0,0.1)",
  }

  const containerMobile ={
      backgroundColor:"white",
      padding:"0.5rem",
      width:"100%",
      boxSizing: "border-box",
      borderRadius: "6px",
      display:"block",
      alignItems:"center",
      justifyContent:"center",
      WebkitBoxShadow: "10px 10px 50px 0px rgba(0,0,0,0.5)",
      MozBoxShadow: "10px 10px 50px 0px rgba(0,0,0,0.5)",
      BoxShadow: "10px 10px 50px 0px rgba(0,0,0,0.5)",
    }

  return(
      <Fragment>
          <div style={container}>
            <Spinner/>
          </div>
      </Fragment>
  )
}

export default Loading