import React, { Component } from 'react';
import RootContext from './index';

class AdminProvider extends Component {
    render() {
    	const menulist = [
			{ page:"DASHBOARD", path:'/admin/dashboard' },
			{ page:"PENGGUNA", path:'/admin/pengguna' },
			{ page:"LOKASI SURVEY", path:'/admin/lokasisurvey' },
			{ page:"PENUGASAN", path:'/admin/penugasan' },
			{ page:"HASIL SURVEY", path:'/admin/hasilsurvey' },
			{ page:"SURVEY CLUSTER", path:'/admin/surveycluster' },
			{ page:"FAQ", path:'/admin/faq' },
		]
        return (
            <RootContext.Provider value={{ menulist }}>
                {this.props.children}
            </RootContext.Provider>
        );
    }
}

export default AdminProvider