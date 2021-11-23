import React, {Fragment, Component} from "react";
// import "../../assets/css/bootstrap.css";
import Toggle from 'react-toggle';
// import { useMediaQuery } from 'react-responsive';

class Legend extends Component{
  state = {
    toggle:false,
    toggle2:false,
    toggle3:false,
    disabled:false,
    disabled2:false,
    disabled3:false,
    penyakit1:"-",
    penyakit2:"-",
    penyakit3:"-",
  }

  componentDidMount() {
    fetch('https://sehatapi.baktikominfo.id/api/user/stats/kominfo')
      .then(response => response.json())
      .then(data => {
        this.setState({
          penyakit1: data.data.penyakit1 ? data.data.penyakit1.nama : "-",
          penyakit2: data.data.penyakit2 ? data.data.penyakit2.nama : "-",
          penyakit3: data.data.penyakit3 ? data.data.penyakit3.nama : "-",
        })
      });
  }

  disableToggle = async (val) =>{
    this.setState({
      disabled:false
    })
  }

  disableToggle2 = async (val) =>{
    this.setState({
      disabled2:false
    })
  }

  disableToggle3 = async (val) =>{
    this.setState({
      disabled3:false
    })
  }

  render(){
    const legendCss = {
    backgroundColor:"white",
    width:"25rem",
    boxSizing: "border-box",
    borderRadius: "6px",
    height:"1rem",
    position:"absolute",
    left: "1%",
    bottom: "5%",
    display:"flex",
    alignItems:"center",
    justifyContent:"space-around",
  }

  const legendCssMobile = {
    backgroundColor:"white",
    width:"100%",
    boxSizing: "border-box",
    borderRadius: "6px",
    height:"1rem",
    display:"flex",
    alignItems:"center",
    justifyContent:"center",
  }

  const toggleCss = {
    backgroundColor:"white",
    boxSizing: "border-box",
    borderRadius: "6px",
    height:"max-content",
    padding:"0.25rem",
    position:"absolute",
    left: "1%",
    bottom: "8%",
    display:"flex",
    alignItems:"center",
    justifyContent:"space-around",
    transition: "width 2s"
  }

  const toggleCss2 = {
    backgroundColor:"white",
    boxSizing: "border-box",
    borderRadius: "6px",
    height:"1.5rem",
    padding:"0.5rem",
    position:"absolute",
    left: "1%",
    bottom: "11%",
    display:"flex",
    alignItems:"center",
    justifyContent:"space-around",
    transition: "width 2s"
  }

  const toggleCss3 = {
    backgroundColor:"white",
    boxSizing: "border-box",
    borderRadius: "6px",
    height:"1.5rem",
    padding:"0.5rem",
    position:"absolute",
    left: "1%",
    bottom: "14%",
    display:"flex",
    alignItems:"center",
    justifyContent:"space-around",
    transition: "width 2s"
  }

  const toggleCssMobile = {
    backgroundColor:"white",
    boxSizing: "border-box",
    borderRadius: "6px",
    height:"1.5rem",
    padding:"0.5rem",
    display:"flex",
    alignItems:"center",
    justifyContent:"space-around",
    transition: "width 2s"
  }

  const toggleCssActiveMobile = {
    backgroundColor:"white",
    boxSizing: "border-box",
    borderRadius: "6px",
    height:"1.5rem",
    padding:"0.5rem",
    display:"flex",
    alignItems:"center",
    justifyContent:"space-around",
    width:"25rem",
    transition: "width 2s"
  }

  const toggleCssActive = {
    backgroundColor:"white",
    boxSizing: "border-box",
    borderRadius: "6px",
    height:"max-content",
    padding:"0.25rem",
    position:"absolute",
    left: "1%",
    bottom: "8%",
    display:"flex",
    alignItems:"center",
    flexDirection: "row",
    justifyContent:"center",
    width:"34rem",
    transition: "width 2s"
  }

  const toggleCssActive2 = {
    backgroundColor:"white",
    boxSizing: "border-box",
    borderRadius: "6px",
    height:"1.5rem",
    padding:"0.5rem",
    position:"absolute",
    left: "1%",
    bottom: "11%",
    display:"flex",
    alignItems:"center",
    justifyContent:"space-around",
    width:"22rem",
    transition: "width 2s"
  }

  const toggleCssActive3 = {
    backgroundColor:"white",
    boxSizing: "border-box",
    borderRadius: "6px",
    height:"1.5rem",
    padding:"0.5rem",
    position:"absolute",
    left: "1%",
    bottom: "14%",
    display:"flex",
    alignItems:"center",
    justifyContent:"space-around",
    width:"27rem",
    transition: "width 2s"
  }

  const centerCss = {
    display:"flex",
    alignItems:"center",
    justifyContent:"center",
    margin:"0",
    padding:"0",
    width:"5rem"
  }

  const dot = {
    height: "10px",
    width: "10px",
    borderRadius: "50%",
    display: "inline-block",
    margin:"0",
    padding:"0",
  }

  const pCss = {
    margin:"0",padding:"0",fontSize:'9px'
  }
    return(
      <Fragment>
            <div style={!this.state.toggle ? toggleCss : toggleCssActive}>
              <Toggle
                defaultChecked={this.state.toggle}
                disabled={this.state.disabled}
                onClick={() => {
                  if (!this.state.toggle) {
                    this.setState({toggle:true});this.props.action()};
                  if (this.state.toggle) {this.setState({toggle:false}); this.props.reaction()};
                }}
                />
              
              { this.state.toggle ?  <Fragment>
                <p style={{fontSize:"9px",margin:"0 0 0 0.5rem",padding:"0",width:"max-content"}}>Hasil Test Dini</p>
                <div style={centerCss}>
                  <span style={{...dot,backgroundColor: "green",}}></span>
                  <p style={pCss}>OTG</p>
                </div>
                <div style={centerCss}>
                  <span style={{...dot,backgroundColor: "#ff8000",}}></span>
                  <p style={pCss}>ODP</p>
                </div>
                <div style={centerCss}>
                  <span style={{...dot,backgroundColor: "red",}}></span>
                  <p style={pCss}>PDP</p>
                </div>
                <div style={centerCss}>
                  <span style={{...dot,backgroundColor: "#911eb4",}}></span>
                  <p style={pCss}>Komorbid</p>
                </div>
                <div style={{...centerCss}}>
                  <span style={{...dot,backgroundColor: "black",}}></span>
                  <p style={pCss}>Analisa</p>
                </div>
              </Fragment> : 
              <Fragment>
                <p style={{fontSize:"9px",margin:"0 0 0 0.5rem",padding:"0"}}> Hasil Test Dini </p>
              </Fragment> }
            </div>

            <div style={!this.state.toggle2 ? toggleCss2 : toggleCssActive2}>
              <Toggle
                defaultChecked={this.state.toggle2}
                disabled={this.state.disabled2}
                onClick={() => {
                  if (!this.state.toggle2) {
                    this.setState({toggle2:true});this.props.action2()};
                  if (this.state.toggle2) {this.setState({toggle2:false}); this.props.reaction2()};
                }}
                />
              
              { this.state.toggle2 ?  <Fragment>
                <p style={{fontSize:"9px",margin:"0 0 0 0.5rem",padding:"0"}}>Hasil Rapid Test</p>
                <div style={{...centerCss,width:"25%"}}>
                  <span style={{...dot,backgroundColor: "#e6194B",}}></span>
                  <p style={pCss}>Positif</p>
                </div>
                <div style={{...centerCss,width:"25%"}}>
                  <span style={{...dot,backgroundColor: "#4363d8",}}></span>
                  <p style={pCss}>Negatif</p>
                </div>
              </Fragment> : 
              <Fragment>
                <p style={{fontSize:"9px",margin:"0 0 0 0.5rem",padding:"0"}}> Hasil Rapid Test </p>
              </Fragment> }
            </div>

            <div style={!this.state.toggle3 ? toggleCss3 : toggleCssActive3}>
              <Toggle
                defaultChecked={this.state.toggle3}
                disabled={this.state.disabled3}
                onClick={() => {
                  if (!this.state.toggle3) {
                    this.setState({toggle3:true});this.props.action3()};
                  if (this.state.toggle3) {this.setState({toggle3:false}); this.props.reaction3()};
                }}
                />
              
              { this.state.toggle3 ?  <Fragment>
                <p style={{fontSize:"9px",margin:"0 0 0 0.5rem",padding:"0"}}>Penyakit Umum</p>
               <div style={{...centerCss}}>
                  <span style={{...dot,backgroundColor: "#1A5276",}}></span>
                  <p style={pCss}>{this.state.penyakit1}</p>
                </div>
                <div style={{...centerCss}}>
                  <span style={{...dot,backgroundColor: "#9A7D0A",}}></span>
                  <p style={pCss}>{this.state.penyakit2}</p>
                </div>
                <div style={{...centerCss}}>
                  <span style={{...dot,backgroundColor: "#f000ff",}}></span>
                  <p style={pCss}>{this.state.penyakit3}</p>
                </div>
              </Fragment> : 
              <Fragment>
                <p style={{fontSize:"9px",margin:"0 0 0 0.5rem",padding:"0"}}> Penyakit Umum </p>
              </Fragment> }
            </div>

            <div style={ legendCss }>
              <p style={{...pCss,fontSize:"9px"}}>Jumlah PDP KOMINFO</p>
              <p style={{fontSize:"9px",margin:"0 0.5rem",padding:"0"}}>|</p>
              <p style={{fontSize:"9px",margin:"0",padding:"0"}}>Min</p>
              <div style={{opacity: "0.5",height:"0.75rem",width:"10rem",
                backgroundImage: "linear-gradient(to right, #ffb95a , #c40233)",
                borderRadius: "6px"
              }}></div>
              <p style={{...pCss,fontSize:"9px"}}>Max</p>
            </div>
          </Fragment>
    )
  }
}

export default Legend