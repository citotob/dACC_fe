import React, {Fragment,Component} from "react";
import { Row } from 'reactstrap';
import axios from 'axios';
import Loader from "./loadingspin.js";
// import { useMediaQuery } from 'react-responsive'

class InfoWindows extends Component{
  state={
    display:"none",
    provinsi:"",
    code:"",
    dataProvinsi:[],
    pegProv:0,
    otgProv:0,
    odpProv:0,
    pdpProv:0,
    penyakit1:0,
    penyakit2: 0,
    penyakit3: 0,
    // meninggalProv:0,
    // sembuhProv:0,
    // perawatanProv:0,
    // positifProv:0,
    isloading:true,
    displayButton:"none"
  }

  changeProvinsi = async (val) =>{
    const query = {provinsi: val[2],}
    const provinsiData = await axios.post("https://sehatapi.baktikominfo.id/api/user/stats/provinsi/kabkota",query)
    const kabkotData = await axios.post("https://sehatapi.baktikominfo.id/api/user/stats/provinsi/id",query)
    Promise.all([provinsiData,kabkotData])
      .then(res => {
        
        this.setState({
          dataProvinsi:res[0].data.data,
          provinsi:val[0],
          code:val[1],
          pegProv:res[1].data.data.jmlPegawai,
          otgProv:res[1].data.data.otg,
          odpProv:res[1].data.data.odp,
          pdpProv:res[1].data.data.pdp,
          // batukProv:res[1].data.data.batuk,
          // influenzaProv:res[1].data.data.pilek,
          // asmaProv:res[1].data.data.asma,
          penyakit1: res[1].data.data.penyakit1 ? res[1].data.data.penyakit1  : {nama:"-",jumlah:"0"},
          penyakit2: res[1].data.data.penyakit2 ? res[1].data.data.penyakit2 : {nama:"-",jumlah:"0"},
          penyakit3: res[1].data.data.penyakit3 ? res[1].data.data.penyakit3 : {nama:"-",jumlah:"0"},
          // meninggalProv:res[1].data.data.meninggal,
          // sembuhProv:res[1].data.data.sembuh,
          // perawatanProv:res[1].data.data.perawatan,
          // positifProv:res[1].data.data.positif,
          isloading:false
        })
        // this.setState({
        //   isloading: false,
        //   kasus: fetcheddata.data.kasus ? fetcheddata.data.kasus : 0,
        //   sembuh: fetcheddata.data.sembuh ? fetcheddata.data.sembuh : 0,
        //   kematian: fetcheddata.data.kematian ? fetcheddata.data.kematian : 0,
        //   perawatan: fetcheddata.data.perawatan ? fetcheddata.data.perawatan : 0,
        //   otg:fetcheddata.data.otp ? fetcheddata.data.otp : 0,
        //   odp:fetcheddata.data.odp ? fetcheddata.data.odp : 0,
        //   pdp:fetcheddata.data.pdp ? fetcheddata.data.pdp : 0
        // });
      })  
  }

  displayInfoWindows = () =>{
    this.setState({
      display:"block"
    })
  }

  displayCloseBUtton = () =>{
    this.setState({
      displayButton:"block"
    })
  }

  render(){
    const container={
      backgroundColor:"white",
      padding:"0.5rem",
      width:"50%",
      boxSizing: "border-box",
      borderRadius: "6px",
      height:"95%",
      position:"absolute",
      top: "1%",
      right: "1%",
      display:`${this.state.display}`,
      alignItems:"center",
      justifyContent:"center",
      WebkitBoxShadow: "10px 10px 50px 0px rgba(0,0,0,0.5)",
      MozBoxShadow: "10px 10px 50px 0px rgba(0,0,0,0.5)",
      BoxShadow: "10px 10px 50px 0px rgba(0,0,0,0.5)",
    }

    const containerMobile ={
      backgroundColor:"white",
      padding:"0.5rem",
      width:"100%",
      boxSizing: "border-box",
      borderRadius: "6px",
      display:`${this.state.display}`,
      alignItems:"center",
      justifyContent:"center",
      WebkitBoxShadow: "10px 10px 50px 0px rgba(0,0,0,0.5)",
      MozBoxShadow: "10px 10px 50px 0px rgba(0,0,0,0.5)",
      BoxShadow: "10px 10px 50px 0px rgba(0,0,0,0.5)",
    }

  const buttonCss = {
    position:"absolute",
    display:this.state.displayButton,
    bottom:"2%",
    right:"2%",
    backgroundColor:"#EC8313",
    color:"white",
    boxSizing: "border-box",
    borderRadius: "6px",
    height:"2rem",
    marginLeft:"60%",
    width:"150px"
  } 

  const buttonCssMObile = {
    backgroundColor:"#EC8313",
    color:"white",
    boxSizing: "border-box",
    borderRadius: "6px",
    height:"2rem",
    marginLeft:"80%",
    width:"brem"
  } 
  
  const cardMini = {
    display:"flex",
    alignItems:"center",
    boxSizing: "border-box",
    width: "8rem",
    justifyContent:"flex-start",
    padding:"0.5rem",
    margin:"0.15",
    borderRadius: "6px",
  }

  const cardMiniTab = {
    display:"flex",
    alignItems:"center",
    justifyContent:"flex-start",
    padding:"0 0 0 0.25rem",
    borderRadius: "6px",
  }

  const listCss={
    width:"100%",
    margin:"1rem",
    padding:"0",
    boxSizing: "border-box",
    display:"flex",
    alignItems:"center",
    justifyContent:"flex-start",
    WebkitBoxShadow: "10px 10px 50px 0px rgba(0,0,0,0.05)",
    MozBoxShadow: "10px 10px 50px 0px rgba(0,0,0,0.05)",
    BoxShadow: "10px 10px 50px 0px rgba(0,0,0,0.05)",
  }

  const listStyle = {
    WebkitBoxShadow: "10px 10px 50px 0px rgba(0,0,0,0.05)",
    MozBoxShadow: "10px 10px 50px 0px rgba(0,0,0,0.05)",
    BoxShadow: "10px 10px 50px 0px rgba(0,0,0,0.05)",
  }

  const list2Css={
    width:"100%",
    margin:"1rem",
    padding:"0",
    boxSizing: "border-box",
    display:"flex",
    alignItems:"center",
    justifyContent:"center",
  }

  const listChildCss = {display:"flex",justifyContent:"flex-start"}
  const listChildC2ss = {display:"flex",justifyContent:"flex-start",width:"20rem",flexWrap:"row"}

  let dataKabKot = this.state.dataProvinsi
//   const lists = [{kabkot:"Bekasi", positif:4, meninggal:5, sembuh:10},{kabkot:"Bekasi", positif:4, meninggal:5, sembuh:10},{kabkot:"Bekasi", positif:4, meninggal:5, sembuh:10},{kabkot:"Bekasi", positif:4, meninggal:5, sembuh:10},{kabkot:"Bekasi", positif:4, meninggal:5, sembuh:10},{kabkot:"Bekasi", positif:4, meninggal:5, sembuh:10},
// {kabkot:"Bekasi", positif:4, meninggal:5, sembuh:10},{kabkot:"Bekasi", positif:4, meninggal:5, sembuh:10},{kabkot:"Bekasi", positif:4, meninggal:5, sembuh:10},{kabkot:"Bekasi", positif:4, meninggal:5, sembuh:10},{kabkot:"Bekasi", positif:4, meninggal:5, sembuh:10}]
    return(
      <Fragment>
          {(this.state.isloading && (this.state.display === "block")) ? <Loader/> : (!this.state.isloading && (this.state.display === "block")) ? 
          <div style={container}>
            
            <div style={{display:"block", alignItems:"center",justifyContent:"space-evenly", height:"15%",marginBottom:"1rem", padding:"0"}}>
              <div style={{display:"flex", alignItems:"center",justifyContent:"center"}}>
                 <h2 style={{margin:"0",padding:"0"}}>Provinsi {this.state.provinsi}</h2>
              </div>
             
              <hr style={{padding:"0 0 0.5rem 0", margin:"0"}}/>
              <Row style={{display:"flex", alignItems:"center",justifyContent:"space-evenly",margin:"1rem 0 0 0", padding:"0"}}>
                {/*<Col stylel={{margin:"0", padding:"0"}} xs={"4"}>
                  <p style={{...cardMini,backgroundColor:"grey",color:"white"}}>TOTAL<br/>PEGAWAI: {this.state.pegProv}</p>
                  <p style={{...cardMini,backgroundColor:"grey",color:"white"}}>TOTAL<br/>POSITIF: {this.state.positifProv}</p>
                  <p style={{...cardMini,backgroundColor:"grey",color:"white"}}>TOTAL<br/>MENINGGAL: {this.state.meninggalProv}</p>
                  
                </Col>
                <Col style={{margin:"0", padding:"0"}} xs={"4"}>
                  <p style={{...cardMini,backgroundColor:"grey",color:"white"}}>TOTAL<br/>SEMBUH: {this.state.sembuhProv}</p>
                  <p style={{...cardMini,backgroundColor:"grey",color:"white"}}>TOTAL<br/>PERAWATAN: {this.state.perawatanProv}</p>
                </Col>*/}
                  <p style={{...cardMini,backgroundColor:"#1A5276",color:"white",margin:"0"}}>{this.state.penyakit1.nama}: {this.state.penyakit1.jumlah}</p>
                  <p style={{...cardMini,backgroundColor:"#9A7D0A",color:"white",margin:"0"}}>{this.state.penyakit2.nama}: {this.state.penyakit2.jumlah}</p>
                  <p style={{...cardMini,backgroundColor:"#f000ff",color:"white",margin:"0"}}>{this.state.penyakit3.nama} : {this.state.penyakit3.jumlah}</p>
              </Row>
              <Row style={{display:"flex", alignItems:"center",justifyContent:"space-evenly",margin:"0.1rem 0 0 0", padding:"0"}}>
                  <p style={{...cardMini,backgroundColor:"#228B22",color:"white"}}>TOTAL OTG: {this.state.otgProv}</p>
                  <p style={{...cardMini,backgroundColor:"#EC8313",color:"white"}}>TOTAL ODP: {this.state.odpProv}</p>
                  <p style={{...cardMini,backgroundColor:"#C42127",color:"white"}}>TOTAL PDP: {this.state.pdpProv}</p>
              </Row>
            </div>

            <div style={{width:"100%", height:"85%",display:"flex",justifyContent:"center",alignItems:"center"}}>
              <div style={{display:"block",height:"72%", padding:"0",width:"90%",overflow:"scroll"}}>
                
                <table style={{width:"100%"}}>
                  <tbody>
                  <tr>
                      <th style={{margin:"0",padding:"0",fontWeight:"900"}} >Kabupaten/Kota</th>
                      <th style={{margin:"0",padding:"0"}} >{this.state.penyakit1.nama}</th>
                      <th style={{margin:"0",padding:"0"}} >{this.state.penyakit2.nama}</th>
                      <th style={{margin:"0",padding:"0"}} >{this.state.penyakit3.nama}</th>
                      <th style={{margin:"0",padding:"0"}} >OTG</th>
                      <th style={{margin:"0",padding:"0"}} >ODP</th>
                      <th style={{margin:"0",padding:"0"}} >PDP</th>
                  </tr>
                  {dataKabKot.map((list,index)=> {
                    return (
                      <tr key={index}>
                          <td style={listStyle}>{list.kabupatenKota}</td>
                          <td style={listStyle}>{list.penyakit1 ? list.penyakit1.jumlah : "0"}</td>
                          <td style={listStyle}>{list.penyakit2 ? list.penyakit2.jumlah : "0"}</td>
                          <td style={listStyle}>{list.penyakit3 ? list.penyakit3.jumlah : "0"}</td>
                          <td style={listStyle}>{list.otg}</td>
                          <td style={listStyle}>{list.odp}</td>
                          <td style={listStyle}>{list.pdp}</td>
                      </tr>
                    )
                  })}
                  </tbody>
                </table>
                
               {/* <div style={{margin:"2rem 0 0 0",width:"100%"}}>
                  <div style={list2Css}>
                    <div style={{...listChildC2ss,width:"5rem"}} >
                      <p style={{margin:"0",padding:"0",width:"100%"}} ><b>Kabupaten / Kota</b></p>
                    </div>
                     <div style={listChildCss} >
                      <p style={{margin:"0",padding:"0"}} ><b>Batuk</b></p>
                    </div>
                    <div style={listChildCss}>
                      <p style={{margin:"0",padding:"0"}} ><b>Influenza</b></p>
                    </div>
                    <div style={listChildCss} >
                      <p style={{margin:"0",padding:"0"}} ><b>Asma</b></p>
                    </div>
                    <div style={listChildCss} >
                      <p style={{margin:"0",padding:"0"}} ><b>OTG</b></p>
                    </div>
                    <div style={listChildCss}>
                      <p style={{margin:"0",padding:"0"}} ><b>ODP</b></p>
                    </div>
                    <div style={listChildCss} >
                      <p style={{margin:"0",padding:"0"}} ><b>PDP</b></p>
                    </div>
                  </div>
                </div>
                <div style={{height:'80%',padding:"0",width:"100%"}}>
                  {dataKabKot.map((list,index)=> {
                    return (
                      <div key={index} style={listCss}>
                        <div style={{...listChildC2ss}} >
                          <p style={{margin:"0",padding:"0",width:"100%"}} key={"kabkot"+index}>{list.kabupatenKota}</p>
                        </div>
                        <p style={{margin:"0",padding:"0"}} key={"swab"+index}>{list.otg}</p>
                        <p style={{margin:"0",padding:"0"}} key={"swab"+index}>{list.otg}</p>
                        <p style={{margin:"0",padding:"0"}} key={"swab"+index}>{list.otg}</p>
                        <p style={{margin:"0",padding:"0"}} key={"swab"+index}>{list.otg}</p>
                        <p style={{margin:"0",padding:"0"}} key={"swab"+index}>{list.otg}</p>
                        <p style={{margin:"0",padding:"0"}} key={"swab"+index}>{list.otg}</p>

                        <div style={listChildCss} >
                          <p style={{margin:"0",padding:"0"}} key={"swab"+index}>{list.otg}</p>
                        </div>
                        <div style={listChildCss}>
                          <p style={{margin:"0",padding:"0"}} key={"rapid"+index}>{list.odp}</p>
                        </div>
                        <div style={listChildCss} >
                          <p style={{margin:"0",padding:"0"}} key={"result"+index}>{list.pdp}</p>
                        </div>
                        <div style={listChildCss} >
                          <p style={{margin:"0",padding:"0"}} key={"swab"+index}>{list.otg}</p>
                        </div>
                        <div style={listChildCss}>
                          <p style={{margin:"0",padding:"0"}} key={"rapid"+index}>{list.odp}</p>
                        </div>
                        <div style={listChildCss} >
                          <p style={{margin:"0",padding:"0"}} key={"result"+index}>{list.pdp}</p>
                        </div>
                      </div>
                  )})}
                </div>*/}
              </div>
            </div>

            <button 
              style={buttonCss}
              onClick={() => {
              this.setState({display:"none",isloading:true});
              this.props.action(this.state.code);
            }}> Kembali </button>
          </div> : ""}
      </Fragment>
    )
  }
}

export default InfoWindows
