
import React, { useState } from "react";
import { Card, Tabs, Tab, Button, Form  } from "react-bootstrap"

import { CopyBlock, atomOneDark } from "react-code-blocks";

const textCode = `<div className="form-group">
    <label> Text </label>
    <input type="text" className="form-control"></input>
</div>
<div className="form-group">
    <label> Select </label>
    <select className="form-control">
        <option value="">-- Default --</option>
        <option value="1"> One </option>
        <option value="2"> Two </option>
        <option value="3"> Three </option>
    </select>
</div>
<Form.Group aria-label="Checkbox" >
    <Form.Check inline label="checkbox1" name="group1" type="checkbox" id={"inline-checkbox-1"}  />
    <Form.Check inline label="checkbox2" name="group1" type="checkbox" id={"inline-checkbox-2"} />
</Form.Group>
<Form.Group >
    <Form.Check inline type="radio" name="group2" label="Radio1" id="inline-radio-1" />
    <Form.Check inline type="radio" name="group2" label="Radio2" id="inline-radio-2" />
</Form.Group>`

export default function FormTypes() {
    
    const [formTypeTab, setFormTypeTab] = useState("formTypePreview")

    return (<Card>
        <Card.Header className="bg-primary">
            <Card.Title className="text-white"> Form Type </Card.Title>
        </Card.Header>
        <Card.Body>
            <Tabs
                id="controlled-form-type-tab"
                activeKey={formTypeTab}
                onSelect={(k) => setFormTypeTab(k)}
            >
                <Tab eventKey="formTypePreview" title="Preview">
                    <div style={{marginTop:30}}>
                        <div className="form-group">
                            <label> Text </label>
                            <input type="text" className="form-control"></input>
                        </div>
                        <div className="form-group">
                            <label> Select </label>
                            <select className="form-control">
                                <option value="">-- Default --</option>
                                <option value="1"> One </option>
                                <option value="2"> Two </option>
                                <option value="3"> Three </option>
                            </select>
                        </div>
                        <Form.Group aria-label="Checkbox" >
                            
                            <Form.Check inline label="checkbox1" name="group1" type="checkbox" id={`inline-checkbox-1`}  />
                            <Form.Check inline label="checkbox2" name="group1" type="checkbox" id={`inline-checkbox-2`} />
                           
                        </Form.Group>
                        <Form.Group >
                            
                            <Form.Check inline type="radio" name="group2" label="Radio1" id="inline-radio-1" />
                            <Form.Check inline type="radio" name="group2" label="Radio2" id="inline-radio-2" />
                           
                        </Form.Group>
                        
                    </div>
                </Tab>
                <Tab eventKey="formTypeCode" title="<> Code">
                    <div style={{marginTop:30, minHeight:100}}>
                         <CopyBlock
                            language={"javascript"}
                            text={textCode}
                            showLineNumbers={true}
                            theme={atomOneDark}
                            wrapLines={true}
                            codeBlock
                        />
                    </div>
                </Tab>
            </Tabs>
        </Card.Body>
    </Card>)
}