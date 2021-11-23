import React,{ Fragment } from 'react';
import { Container, Row } from 'reactstrap';
import Logo from '../../assets/img/baktikominfo.png';
import styles from './styles.module.css';

const HeaderComponent = (props) => {
    return(
        <Fragment>
            <Container>
                <Row>
                    <div className="header-wrapper">
                        <img src={Logo} className="header-logo" alt="" ></img>
                        <div className="wrapper-right">
                            {props.icon}
                            <h3 className="breadcrumb-class">{props.title}</h3>
                        </div>
                    </div>
                </Row>
            </Container>
        </Fragment>
    )
}

export default HeaderComponent