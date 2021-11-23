import React, { Component } from 'react';
import RootContext from './index';

class StaffAdminProvider extends Component {
    render() {
        const menulist = [
			{ page:"DASHBOARD", path:'/staffadmin/dashboard' },
			{ page:"PENGGUNA", path:'/staffadmin/pengguna' },
			{ page:"LOKASI SURVEY", path:'/staffadmin/lokasisurvey' },
			{ page:"PENUGASAN", path:'/staffadmin/penugasan' },
            { page:"HASIL SURVEY", path:'/staffadmin/hasilsurvey' },
            { page:"SURVEY CLUSTER", path:'/staffadmin/surveycluster' },
			{ page:"FAQ", path:'/staffadmin/faq' },
		]
        return (
            <RootContext.Provider value={{ menulist }}>
                {this.props.children}
            </RootContext.Provider>
        );
    }
}

export default StaffAdminProvider