import React, { createContext, useState } from 'react';

// Create Context
export const GlobalContext = createContext();

//Provider Components
export const GlobalProvider = ({ children }) => {
	const [nav,displayNav] = useState(false);
	const showNav = () => displayNav(prevState => !prevState)

	return(
		<GlobalContext.Provider value={{
			nav,
			showNav
		}}>
			{ children }
		</GlobalContext.Provider>
	)
}