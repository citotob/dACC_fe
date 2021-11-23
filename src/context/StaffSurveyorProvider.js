import React, { Component } from 'react';
import RootContext from './index';

class StaffSurveyorProvider extends Component {
    render() {
        return (
            <RootContext.Provider
                value={{menulist:["DASHBOARD", "PENUGASAN", "HASIL SURVEY", "PROFILE"]}}
            >
                {this.props.children}
            </RootContext.Provider>
        );
    }
}

export default StaffSurveyorProvider