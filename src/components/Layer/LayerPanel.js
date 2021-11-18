// import React from 'react';
// import LayerList from './LayerList.js';
// import { actionsData } from './Layer.stories';
// import PropTypes from 'prop-types';
// import Layer from './Layer';
// import ModalWindowLess from '../Modal/ModalWindowLess'

// function LayerPanel({layersData, onAddLayer, onSaveLayerList, loading}) {

//   return (
//     <div className={'FlexColumnCenterFluid'} style={{width:"23%", height:"max-content",padding:"1rem",}}>
//       <div className={'FlexRowCenterFluid'} style={{justifyContent:"flex-start"}}>
//         <h3> Layer Panel </h3>
//       </div>
//       <div className="FlexRowCenterFluid" style={{justifyContent:"flex-end",margin:"0.5rem 0"}}>
//         <ModalWindowLess buttonLabel={'+ Add Layer'} color={"#F2F1F9"}/>
//       </div>
//       <div className={'FlexRowCenterFluid'} style={{justifyContent:`${(layersData.length !== 0) ? "flex-start" : "center"}`}}>
//         {loading ? <LayerList loading layers={layersData} {...actionsData} /> : <LayerList layers={layersData} {...actionsData} />}
//       </div>
//       <div className="FlexRowCenterFluid" style={{justifyContent:"flex-end",margin:"0.5rem 0"}}>
//         {(layersData.length !== 0) ?
//           <div onClick={() => {onSaveLayerList("save layer list")}} className={"FlexRowCenter"} style={{width:"max-content",cursor:"pointer"}}>
//             <svg width="13" height="12" viewBox="0 0 13 12" fill="none" xmlns="http://www.w3.org/2000/svg">
//               <path d="M0.5 11.5H12.5" stroke="#CFCFCF"/>
//               <path d="M6.64704 9.89306C6.55938 9.95681 6.44062 9.95681 6.35296 9.89306L1.62175 6.45218C1.42594 6.30978 1.52668 6 1.7688 6L11.2312 6C11.4733 6 11.5741 6.30978 11.3782 6.45218L6.64704 9.89306Z" fill="#CFCFCF"/>
//               <rect x="4" width="5" height="7" rx="0.25" fill="#CFCFCF"/>
//             </svg>
//             <p style={{margin: "0px 1rem 0px 1rem", color:"#CFCFCF"}}> Save </p>
//           </div> :
//           ''
//         }
//       </div>
//     </div>
//   );
// }

// LayerPanel.propTypes = {
//   layersData: PropTypes.arrayOf(Layer.propTypes.layer),
// };
// LayerPanel.defaultProps = {
//   loading: false,
// };

// export default LayerPanel;
