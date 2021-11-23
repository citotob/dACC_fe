import React from 'react';
import ErrorLogo from '../../assets/icons/Error.svg';
import GhostLogo from '../../assets/icons/Ghost.svg';
import GhostShadowLogo from '../../assets/icons/Ghost_shadow.svg';
import { Row, Button } from 'reactstrap';
import style from './style.module.css';
import { Link } from 'react-router-dom';

const ErrorPage = (props) => {
  return (
  	<>
  		<div className={'d-none d-lg-block'}>
		    <div className="bg-light vw-100 vh-100 d-flex flex-column justify-content-center align-items-center">
		    	<Row className={"h-50 d-flex align-items-center justify-content-center flex-column"}>
		    		<img src={ErrorLogo} alt=""/>	
		    		<div style={{top:"30vh"}}className={"position-absolute d-flex align-items-center justify-content-center flex-column"}>	
		    			<img className={`${style.object}`} src={GhostLogo} alt="" />	
		    			<img className={`${style.object2}`} src={GhostShadowLogo} alt="" />	
		    		</div>
		    	</Row>
		    	<Row className={"h-50 text-muted"}>
		    		<div className={"mb-5 pb-5 d-flex align-items-center justify-content-center flex-column "}>
			    		<h3> Page not Found </h3>
			    		<p className={'text-center mt-3 mb-3'}> The page you are looking for might have been removed, had its name changed, <br />
							or is temporarily unavailable. </p>
						<Link to={`/`}><Button color={'primary'}>Back to Login</Button></Link>
					</div>
		    	</Row>
		    </div>
	    </div>

	    <div className={'d-none d-md-block d-lg-none'}>
		    <div className="bg-light vw-100 vh-100 d-flex flex-column justify-content-center align-items-center">
		    	<div className={"h-50 d-flex align-items-center justify-content-center flex-column"}>
		    		<img src={ErrorLogo} height={"20%"} alt=""/>	
		    		<div style={{top:"30vh"}}className={"position-absolute d-flex align-items-center justify-content-center flex-column"}>	
		    			<img className={`${style.object}`} src={GhostLogo} alt="" />	
		    			<img className={`${style.object2}`} src={GhostShadowLogo} alt="" />	
		    		</div>
		    	</div>
		    	<div className={"h-50 text-muted"}>
		    		<div className={"mb-5 pb-5 d-flex align-items-center justify-content-center flex-column "}>
			    		<h3> Page not Found </h3>
			    		<span className={'text-center text-wrap mt-3 mb-3'}> The page you are looking for might have been removed, <br /> had its name changed,
							or is temporarily unavailable. </span>
						<Link to={`/`}><Button color={'primary'}>Back to Login</Button></Link>
					</div>
		    	</div>
		    </div>
	    </div>

	    <div className={'d-block d-md-none'}>
		    <div className="bg-light vw-100 vh-100 d-flex flex-column justify-content-center align-items-center">
		    	<div className={"h-50 d-flex align-items-center justify-content-center flex-column"}>
		    		<img src={ErrorLogo} height={"50rem"} alt=""/>	
		    		<div style={{top:"30vh"}}className={"position-absolute d-flex align-items-center justify-content-center flex-column"}>	
		    			<img className={`${style.object}`} src={GhostLogo} alt="" />	
		    			<img className={`${style.object2}`} src={GhostShadowLogo} alt="" />	
		    		</div>
		    	</div>
		    	<div className={"h-50 text-muted"}>
		    		<div className={"d-flex align-items-center justify-content-center flex-column "}>
			    		<h3 className={"mt-3"}> Page not Found </h3>
			    		<span className={'text-center mt-3 mb-3'}> The page you are looking for <br />  might have been removed,  <br /> had its name changed,
							or is temporarily unavailable. </span>
						<Link to={`/`}><Button color={'primary'}>Back to Login</Button></Link>
					</div>
		    	</div>		    	
		    </div>
	    </div>
    </>
  )
}

export default ErrorPage;