import React, { Component } from 'react';
import RootContext from './index';

class AdminSurveyorProvider extends Component {
    render() {
    	const menulist = [
			{ page:"DASHBOARD", path:'/adminsurveyor/dashboard' },
			{ page:"PENUGASAN", path:'/adminsurveyor/penugasan' },
            { page:"HASIL SURVEY", path:'/adminsurveyor/hasilsurvey' },
            { page:"FAQ", path:'/adminsurveyor/faq' },
		]
        return (
            <RootContext.Provider
                value={{ menulist }}
            >
                {this.props.children}
            </RootContext.Provider>
        );
    }
}

export default AdminSurveyorProvider