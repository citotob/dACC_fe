import React, { useState } from "react";
import { Card } from "react-bootstrap"

import style from "./index.module.css"

export default function ModuleUsers() { 
    return(
        <div className={`container-fluid ${style.container}`}>
            <div className="row">
                <div className="col-md-12">
                    <Card>
                        <Card.Header className="bg-primary">
                            <Card.Title className="text-white">
                                User List
                            </Card.Title>
                        </Card.Header>
                        <Card.Body>

                        </Card.Body>
                        
                    </Card>
                </div>
            </div>
        </div>
    )
}