import React, { useContext } from 'react';
import { Container, Row, Col, Button } from 'reactstrap';
import { GlobalContext } from '../../context/GlobalState';
import { useLayoutEffect, useState, useEffect } from 'react';



const DashboardLayout = ({ sidebar, mainsection }) => {
	const [windowWidth, setWindowWidth] = useState(0);
	const [windowHeight, setWindowHeight] = useState(0);
	let resizeWindow = () => {
		setWindowWidth(window.innerWidth);
		setWindowHeight(window.innerHeight);
	};
	useEffect(() => {
		resizeWindow();
		window.addEventListener("resize", resizeWindow);
		return () => window.removeEventListener("resize", resizeWindow);
	}, []);

	const { nav, showNav } = useContext(GlobalContext);
	const styleContainer = { margin: "0", boxSizing: "border-box", height: "100vh", width: "100vw", backgroundColor: "#f4f5ff" }
	const styleContainerSmall = { margin: "0", boxSizing: "border-box", height: "auto", width: "100vw", backgroundColor: "#f4f5ff" }
	const styleSidebar = { margin: "0", padding: "5px" };
	const styleMain = { margin: "0", height: "100%", overflowY: "auto" };

	return (
		windowWidth > 990 ?
			<>
				<div className={'d-none d-lg-block'}>
					<Row style={styleContainer}>
						<Col xs="2" style={styleSidebar}>
							{sidebar}
						</Col>
						<Col xs="10" style={styleMain}>
							{mainsection}
						</Col>
					</Row>
				</div>
			</>
			: windowWidth > 500 && windowWidth < 990 ?
				<>
					<div className={'d-none d-md-block d-lg-none'}>
						{nav &&
							<div className={'vw-100 vh-100'} style={{ zIndex: "99" }}>
								<Container className={'w-100 d-flex justify-content-end m-3'}>
									<Button onClick={() => showNav()}>Close</Button>
								</Container>
								{sidebar}
							</div>
						}
						<div style={styleContainerSmall} >{mainsection}</div>
					</div>
				</> : null
			// 	: <>
			// 		<div className={'d-block d-md-none'}>
			// 			{nav &&
			// 				<div className={'vw-100 vh-100'} style={{ zIndex: "99" }}>
			// 					<Container className={'w-100 d-flex justify-content-end m-3'}>
			// 						{/* <Button onClick={() => showNav()}>Close</Button> */}
			// 					</Container>
			// 					{sidebar}
			// 				</div>
			// 			}
			// 			<div style={styleContainerSmall}>{mainsection}</div>
			// 		</div>
			// 	</>
	)
}

export default DashboardLayout