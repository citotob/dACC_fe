
import React, { useState } from "react";

import style from "./index.module.css"

import FormStandard  from "./FormStandard";
import FormTypes from "./FormTypes";

export default function ModuleForm() {

    return(<div className={`container-fluid ${style.containerPageModuleMap}`}>
        <div className="row">
            <div className="col-md-6">
                <FormStandard></FormStandard>
            </div>
            <div className="col-md-6">
                <FormTypes></FormTypes>
            </div>
        </div>
        <div className="row">
            <div className="col-md-4">

            </div>
            <div className="col-md-4">

            </div>
            <div className="col-md-4">

            </div>
        </div>
        
        
    </div>)
}