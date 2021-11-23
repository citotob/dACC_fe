import React, { useState, useEffect } from 'react'
import { Container, Card, Row } from 'reactstrap'

//aseet
import HeaderComponent from '../../../components/Header/HeaderDashboard';
import CardTicketComponent from '../../../components/Card/CardTicket/CardTicket';
import ImageBerita from '../../../assets/icons/Berita.svg';
import ImageBanner from '../../../assets/icons/Banner.svg';
import ImageVideo from '../../../assets/icons/Video.svg';
import ImageUsers from '../../../assets/icons/Users.svg';
import ImagePen from '../../../assets/icons/Pen.svg';
import ImageCheckCircle from '../../../assets/icons/CheckCircle.svg';
import ImageBell from '../../../assets/icons/Bell.svg';
import CardContentComponent from '../../../components/Card/CardContent/CardContent';

//css
import './style.css'

const iconBell = () => <img src={ImageBell} alt=""></img>
const iconBerita = () => <img className="img-icon" src={ImageBerita} alt=""></img>
const iconBanner = () => <img className="img-icon" src={ImageBanner} alt=""></img>
const iconVideo = () => <img className="img-icon" src={ImageVideo} alt=""></img>

const iconUsers = () => <img className="img-icon" src={ImageUsers} alt=""></img>
const iconPen = () => <img className="img-icon" src={ImagePen} alt=""></img>
const iconCheckCircle = () => <img className="img-icon" src={ImageCheckCircle} alt=""></img>

const DashboardCuratorPage = () => {
    let [dataContent,setDataContent] = useState('0');
    let [dataTotalNotCurated,setDataTotalNotCurated] = useState('0');
    let [dataTotalCurated,setDataTotalCurated] = useState('0');
    let [totalContentPartner, setTotalContentPartner] = useState('0');

    async function fetchAPI(){
        let request = await fetch(`${process.env.REACT_APP_BE_URL}/content/curation/type`);
        let requestCP = await fetch(`${process.env.REACT_APP_BE_URL}/user/contentpatner/all`);
        let response = request.status === 200 ? await request.json() : '';
        let responseCP = requestCP.status === 200 ? await requestCP.json() : '';
        setDataContent(response.data);
        setTotalContentPartner(responseCP.count);
        let totalNotCurated = response.data.videos_submitted + response.data.news_submitted + response.data.banners_submitted;
        let totalCurated =  response.data.videos_approved + response.data.news_approved + response.data.banners_approved;
        setDataTotalCurated(totalCurated);
        setDataTotalNotCurated(totalNotCurated);
    }
    useEffect(() => {
        fetchAPI();
    },[dataContent])
    return (
        <Container>
            <header>
                <HeaderComponent title={"DASHBOARD"} icon={iconBell()} />
            </header>
            <main>
                <Row className="content-ticket-wrapper">
                    <CardTicketComponent classNew="ticket-kurator" title={"TOTAL CONTENT PATNER"} number={totalContentPartner} icon={iconUsers()} />
                    <CardTicketComponent classNew="ticket-kurator" title={"KONTEN PERLU DIKURASI"} number={dataTotalNotCurated} icon={iconUsers()} />
                    <CardTicketComponent classNew="ticket-kurator" title={"SUDAH DIKURASI"} number={dataTotalCurated} icon={iconUsers()} />
                </Row>
                
                <Card className="card-content">
                    <Row className="content-wrapper-curator">
                        <CardContentComponent icon={iconVideo()} title={"VIDEO"} registered={dataContent.videos_submitted} approved={dataContent.videos_approved} />
                        <CardContentComponent icon={iconBerita()} title={"BERITA"} registered={dataContent.news_submitted} approved={dataContent.news_approved} />
                        <CardContentComponent icon={iconBanner()} title={"BANNER"} registered={dataContent.banners_submitted} approved={dataContent.banners_approved} />
                    </Row>
                </Card>
            </main>
        </Container>
    )
}

export default DashboardCuratorPage