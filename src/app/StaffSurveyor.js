import React from 'react';
import DashboardLayout from "../components/Layout/DashboardLayout.js";
import Sidebar from "../components/Sidebar/Sidebar";
import StaffSurveyorProvider from "../context/StaffSurveyorProvider";
import HasilSurvey from "../pages/HasilSurvey/Surveyor";
import Penugasan from '../pages/Penugasan/Admin';
import Dashboard from "../pages/Dashboard/DashboardSurveyor";

const Test = ({ item }) =>  <div>{item}</div>

const MainSectionViewer = ({ item }) => {
	return (
		<React.Fragment>
			{
		        {
				  "DASHBOARD": <Dashboard />,
		          "PENUGASAN": <Penugasan />,
		          "HASIL SURVEY": <HasilSurvey />,
		          "PROFILE":<p>PROFILE</p>,
		        }[item]
		    }
		</React.Fragment>
	)
}

const StaffSurveyor = () => {
	const [menu, setMenu] = React.useState("DASHBOARD");
	const changeMainSectionView = (item) => setMenu(item);

	return(
		<StaffSurveyorProvider>
			<DashboardLayout
				sidebar={ <Sidebar active={menu} action={changeMainSectionView}/> } 
				mainsection={ <MainSectionViewer item={menu} /> } 
			/>
		</StaffSurveyorProvider>
	)
}

export default StaffSurveyor