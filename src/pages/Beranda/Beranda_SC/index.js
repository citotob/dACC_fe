import React, { Fragment, useEffect, useState } from 'react';
import { Container, Row, Card, Button } from 'reactstrap';
// component
import CardTicketComponent from '../../../components/Card/CardTicket/CardTicket';
import CardContentTerdaftarComponent from '../../../components/Card/CardContentTerdaftar/CardContentTerdaftar';
import CardContentDisetujuiComponent from '../../../components/Card/CardContentDisetujui/CardContentDisetujui';
import CardContentTayangComponent from '../../../components/Card/CardContentTayang/CardContentTayang';
import CardChartComponent from '../../../components/Card/CardChart/CardChart';
import CardTableComponent from '../../../components/Card/CardTable/CardTable';
import HeaderComponent from '../../../components/Header/HeaderDashboard';
import SidebarComponent from '../../../components/Sidebar/Sidebar';
//assets
import ImageTimer from '../../../assets/icons/Timer.svg';
import ImageBerita from '../../../assets/icons/Berita.svg';
import ImageBanner from '../../../assets/icons/Banner.svg';
import ImageVideo from '../../../assets/icons/Video.svg';
import IconBell from '../../../assets/icons/Bell.svg';
import IconNotif from '../../../assets/icons/Notif.svg';
import './style.css';


const title = 'title1';
const number = '500';
const iconTimer = () => <img className="img-icon" src={ImageTimer} alt=""></img>
const iconBerita = () => <img className="img-icon" src={ImageBerita} alt=""></img>
const iconBanner = () => <img className="img-icon" src={ImageBanner} alt=""></img>
const iconVideo = () => <img className="img-icon" src={ImageVideo} alt=""></img>


const Icon = () => <img className="icon-notif" src={IconBell} alt=""></img>

const DashboardPage = (props) => {
    const [dataTicket, setDataTicket] = useState('0');
    const [countRegistered, setCountRegistered] = useState('0');
    const [countApproved, setCountApproved] = useState('0');
    const [dataAverage, setAverage] = useState({});

    async function fetchAPIContentTerdaftar() {
        const responseApprovedRegistered = await fetch(`${process.env.REACT_APP_BE_URL}/content/curation/type`);
        const responseTicket = await fetch(`${process.env.REACT_APP_BE_URL}/ticketing/search/stats`);

        const responseAverage = await fetch(`${process.env.REACT_APP_BE_URL}/ticketing/search/solved/average`);
        const jsonAverage = await responseAverage.json();

        const jsonApprovedRegistered = await responseApprovedRegistered.json();
        const jsonTicket = await responseTicket.json();

        setCountApproved(jsonApprovedRegistered.data);
        setCountRegistered(jsonApprovedRegistered.data);
        setDataTicket(jsonTicket.data);
        setAverage(jsonAverage.data);
    }
    useEffect(() => {
        fetchAPIContentTerdaftar()
    }, [])
    return (
        //dashboard-container
        <Container>
            <header>
                <HeaderComponent title={"DASHBOARD SUPPORT"} icon={Icon()} />
            </header>
            <main>
                <Row className="dashboard-wrapper ticket">
                    <CardTicketComponent title={"HARI INI"} number={dataTicket.jumlah_ticket_hari_ini} />
                    <CardTicketComponent title={"MINGGU INI"} number={dataTicket.jumlah_ticket_minggu_ini} />
                    <CardTicketComponent title={"BULAN INI"} number={dataTicket.jumlah_ticket_hari_ini} />
                    <CardTicketComponent classNew="card-issue" title={"WAKTU AVERAGE ISSUE DISELESAIKAN"} numberAverage={dataAverage.average} icon={iconTimer()} />
                </Row>
                <Row className="dashboard-wrapper chart">
                    <Card className="card-wrapper-chart-berandaSC">
                        <div><h3 className="content-title">JUMLAH ISSUE HARIAN</h3></div>
                        <CardChartComponent />
                    </Card>
                </Row>
                <Row className="dashboard-wrapper table">
                    <Card className="card-wrapper-issue-berandaSC">
                        <div><h3 className="content-title">ISSUE TERBARU</h3></div>
                        <CardTableComponent />
                    </Card>
                </Row>
                <Card className="card-wrapper-konten-berandaSC">
                    <Row className="dashboard-wrapper konten-tayang">
                        <Container className="content-card-wrapper new-content-wrapper">
                            <CardContentTayangComponent title={"TOTAL KONTEN TAYANG"} number={177} />
                        </Container>
                    </Row>
                    <Row className="dashboard-wrapper konten-terdaftar">
                        <h3 className="content-title">KONTEN TERDAFTAR</h3>
                        <Container className="content-card-wrapper new-content-wrapper">
                            <CardContentTerdaftarComponent title={"VIDEO"} number={countRegistered.videos_submitted} icon={iconVideo()} color="#DCFFFB" />
                            <CardContentTerdaftarComponent title={"BERITA"} number={countRegistered.news_submitted} icon={iconBerita()} color="#FFECEC" />
                            <CardContentTerdaftarComponent title={"BANNER"} number={countRegistered.banners_submitted} icon={iconBanner()} color="#FEFFE8" />
                        </Container>
                    </Row>
                    <Row className="dashboard-wrapper konten-disetujui">
                        <h3 className="content-title">KONTEN DISETUJUI</h3>
                        <Container className="content-card-wrapper new-content-wrapper">
                            <CardContentDisetujuiComponent title={"VIDEO"} number={countApproved.videos_approved} icon={iconVideo()} color="#DCFFFB" />
                            <CardContentDisetujuiComponent title={"BERITA"} number={countApproved.news_approved} icon={iconBerita()} color="#FFE9E9" />
                            <CardContentDisetujuiComponent title={"BANNER"} number={countApproved.banners_approved} icon={iconBanner()} color="#FEFFE8" />
                        </Container>
                    </Row>
                </Card>
            </main>
            {/* <aside>
                <SidebarComponent />
            </aside> */}
        </Container>
    )
}

export default DashboardPage