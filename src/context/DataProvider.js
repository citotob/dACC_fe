import React, { Component, useState, useEffect } from "react";
import RootContext from "./index";

const DataProvider = (props) => {
    let [data, setData] = useState({});

    let dispatch = (action) => {
        if (action.type === "CHANGE_DATA") {
            setData(action.value);
        }
    };
    useEffect(() => {
    }, [data])
    return (
        <RootContext.Provider
            value={{
                data: data,
                dispatch: dispatch,
            }}
        >
            {props.children}
        </RootContext.Provider>
    );
};

export default DataProvider;
