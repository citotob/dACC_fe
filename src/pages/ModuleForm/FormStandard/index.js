
import React, { useState } from "react";
import { Card, Tabs, Tab, Button, Form  } from "react-bootstrap"
import { CopyBlock, atomOneDark } from "react-code-blocks";

const textCode = `<Form method="post" action="./module-form">
    <div className="form-group">
        <label> Username </label>
        <input type="text" className="form-control" name="username" id="username"></input>
    </div>
    <div className="form-group">
        <label> Email </label>
        <input type="email" className="form-control" name="email" id="email"></input>
    </div>
    <div className="form-group">
        <label> Password </label>
        <input type="password" className="form-control" name="password" id="password"></input>
    </div>
    <Button type="submit"> Submit </Button>
</Form>`

export default function FormStandard() { 

    const [firstTabs, setFirstTabs] = useState('FirstFormPreview');
    

    return(<Card>
        <Card.Header className="bg-primary text-white">
            <Card.Title className="text-white"> Form Standard </Card.Title>
        </Card.Header>
        <Card.Body>
            <Tabs
                id="controlled-first-tab"
                activeKey={firstTabs}
                onSelect={(k) => setFirstTabs(k)}
            >
                <Tab eventKey="FirstFormPreview" title="Preview">
                    <div style={{marginTop:30}}>
                        <Form method="post" action="./module-form">
                            <div className="form-group">
                                <label> Username </label>
                                <input type="text" className="form-control" name="username" id="username"></input>
                            </div>
                            <div className="form-group">
                                <label> Email </label>
                                <input type="email" className="form-control" name="email" id="email"></input>
                            </div>
                            <div className="form-group">
                                <label> Password </label>
                                <input type="password" className="form-control" name="password" id="password"></input>
                            </div>
                            <Button type="submit"> Submit </Button>
                        </Form>
                    </div>
                    
                </Tab>
                <Tab eventKey="FirstFormCode" title=" <> Code ">
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