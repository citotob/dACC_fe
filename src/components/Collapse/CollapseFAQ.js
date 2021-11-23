import React,{ useState } from 'react';
import { Collapse, Button, CardBody, Card } from 'reactstrap';
import ArrowUp from '../../assets/icons/Polygon1.svg'
import ArrowDown from '../../assets/icons/Polygon2.svg'
import './style.css';

const CollapseFAQComponent = (props) => {
    const [isOpen, setIsOpen] = useState(false);
    const toggle = () => setIsOpen(!isOpen);
    let arrow ='';
    if(isOpen){

        arrow = <img src={ArrowUp} alt=""></img>;
    }else{
        arrow = <img src={ArrowDown} alt=""></img>;

    }
    return(
        <div>
        <Button onClick={toggle} className='btn-collapse'>
            <div className='btn-title'>{props.pertanyaan}</div>
            <i className='btn-icon'>{arrow}</i>
        </Button>
        <Collapse isOpen={isOpen}>
            <Card>
                <CardBody className='jawaban'>
                <p>jawaban : </p>
                <p className='jawaban-text'>{props.jawaban}</p>
                </CardBody>
            </Card>
        </Collapse>
        </div>
    )
    }
    
    export default CollapseFAQComponent
