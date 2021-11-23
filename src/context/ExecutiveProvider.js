import React, { Component } from 'react';
import RootContext from './index';

class ExecutiveProvider extends Component {
    render() {
    	const menulist = [
			{ page:"DASHBOARD", path:'/executive' },
		]
        return (
            <RootContext.Provider value={{ menulist }}>
                {this.props.children}
            </RootContext.Provider>
        );
    }
}

export default ExecutiveProvider