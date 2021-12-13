import React, { useEffect, useState } from "react";

// MetisMenu
import MetisMenu from "metismenujs";
import { withRouter } from "react-router-dom";
import { Link, useHistory, useParams } from "react-router-dom";

//i18n
import { withNamespaces } from "react-i18next";

//redux
import { connect } from "react-redux";

import { changeSidebarType, toggleLeftmenu } from "../../store/actions";

//STYLE
import "./style.css";

const SidebarContent = (props) => {
  let role = window.localStorage.getItem("roleName");

  const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
  const history = useHistory();
  const pathname = history.location.pathname;

  // variable warna
  const iconActive = "#2F3A56";
  const iconInActive = "#A5A5A5";

  // states for ganti color
  const [iconDashboardColor, setIconDashboardColor] = useState(iconInActive);
  const [iconPenggunaColor, setIconPenggunaColor] = useState(iconInActive);
  const [iconLokasiColor, setIconLokasiColor] = useState(iconInActive);
  const [iconPenugasanColor, setIconPenugasanColor] = useState(iconInActive);
  const [iconHasilColor, setIconHasilColor] = useState(iconInActive);
  const [iconClusterColor, setIconClusterColor] = useState(iconInActive);
  const [iconCompareColor, setIconCompareColor] = useState(iconInActive);
  const [iconFAQColor, setIconFAQColor] = useState(iconInActive);
  const [iconGnettrackColor, setIconGnettrackColor] = useState(iconInActive);
  const [iconPlanetColor, setIconPlanetColor] = useState(iconInActive);

  useEffect(() => {
    switch (true) {
      case pathname.includes("dashboard"):
        setIconDashboardColor(iconActive);
        break;
      case pathname.includes("pengguna"):
        setIconPenggunaColor(iconActive);
        break;
      case pathname.includes("gnettrack"):
        setIconGnettrackColor(iconActive);
        break;
      case pathname.includes("plannet"):
        setIconPlanetColor(iconActive);
        break;
      case pathname.includes("lokasi"):
        setIconLokasiColor(iconActive);
        break;
      case pathname.includes("penugasan"):
        setIconPenugasanColor(iconActive);
        break;
      case pathname.includes("hasil"):
        setIconHasilColor(iconActive);
        break;
      case pathname.includes("cluster"):
        setIconClusterColor(iconActive);
        break;
      case pathname.includes("compare"):
        setIconCompareColor(iconActive);
        break;
      case pathname.includes("faq"):
        setIconFAQColor(iconActive);
        break;

      default:
        break;
    }
  }, [pathname]);

  return (
    <React.Fragment>
      <div id='sidebar-menu'>
        {/* Sidebar content for role Admin ========= */}
        {role === "admin" && (
          <ul className='metismenu list-unstyled' id='side-menu'>
            {/* DASHBOARD */}
            {/* MODULE Users */}

            <li>
              <Link to='/admin/dashboard' className='waves-effect'>
                <div className='sidebar-menu-wrapper'>
                  <div className='sidebar-icon-wrapper'>
                    <svg
                      width='14'
                      height='14'
                      viewBox='0 0 14 14'
                      fill='none'
                      xmlns='http://www.w3.org/2000/svg'
                    >
                      <path
                        d='M12.4444 0H1.55556C0.7 0 0 0.7 0 1.55556V12.4444C0 13.3 0.7 14 1.55556 14H12.4444C13.3 14 14 13.3 14 12.4444V1.55556C14 0.7 13.3 0 12.4444 0ZM1.55556 12.4444V1.55556H6.22222V12.4444H1.55556ZM12.4444 12.4444H7.77778V7H12.4444V12.4444ZM12.4444 5.44444H7.77778V1.55556H12.4444V5.44444Z'
                        fill={iconDashboardColor}
                      />
                    </svg>
                    {/* <i className='bx bxs-dashboard'></i> */}
                  </div>
                  <span style={{ color: `${iconDashboardColor}` }}>
                    {props.t("Dashboard")}
                  </span>
                </div>
              </Link>
            </li>

            <li>
              <Link to="/#" className="has-arrow waves-effect">
                <i className="bx bx-line-chart-down"></i>
                <span>{props.t("DATA")}</span>
              </Link>
              <ul className="sub-menu" aria-expanded="false">
                <li>
                  <Link to="/admin/role">{props.t("ROLE")}</Link>
                </li>
                <li>
                  <Link to="/admin/data-pengguna">{props.t("PENGGUNA")}</Link>
                </li>
                <li>
                  <Link to="/admin/bank">{props.t("BANK")}</Link>
                </li>
                <li>
                  <Link to="/admin/rek-bank">{props.t("REKENING")}</Link>
                </li>
                <li>
                  <Link to="/admin/whitelabel">{props.t("WHITELABEL")}</Link>
                </li>
              </ul>
            </li>

            <li>
              <Link to="/#" className="has-arrow waves-effect">
                <i className="bx bx-line-chart-down"></i>
                <span>{props.t("TRANSAKSI")}</span>
              </Link>
              <ul className="sub-menu" aria-expanded="false">
                <li>
                  <Link to="/admin/deposit">{props.t("DEPOSIT")}</Link>
                </li>
                <li>
                  <Link to="/admin/withdrawal">{props.t("WITHDRAWAL")}</Link>
                </li>
              </ul>
            </li>

            <li>
              <Link to="/#" className="has-arrow waves-effect">
                <i className="bx bx-line-chart-down"></i>
                <span>{props.t("REPORT")}</span>
              </Link>
              <ul className="sub-menu" aria-expanded="false">
                <li>
                  <Link to="/admin/report-deposit">{props.t("DEPOSIT")}</Link>
                </li>
                <li>
                  <Link to="/admin/report-withdrawal">{props.t("WITHDRAWAL")}</Link>
                </li>
              </ul>
            </li>
          </ul>
        )}

        {/* Sidebar content for role Executive ========= */}
        {role === "executive" && (
          <ul className='metismenu list-unstyled' id='side-menu'>
            {/* DASHBOARD */}
            {/* MODULE Users */}

            <li>
              <Link to='/admin/dashboard' className='waves-effect'>
                <div className='sidebar-menu-wrapper'>
                  <div className='sidebar-icon-wrapper'>
                    <svg
                      width='14'
                      height='14'
                      viewBox='0 0 14 14'
                      fill='none'
                      xmlns='http://www.w3.org/2000/svg'
                    >
                      <path
                        d='M12.4444 0H1.55556C0.7 0 0 0.7 0 1.55556V12.4444C0 13.3 0.7 14 1.55556 14H12.4444C13.3 14 14 13.3 14 12.4444V1.55556C14 0.7 13.3 0 12.4444 0ZM1.55556 12.4444V1.55556H6.22222V12.4444H1.55556ZM12.4444 12.4444H7.77778V7H12.4444V12.4444ZM12.4444 5.44444H7.77778V1.55556H12.4444V5.44444Z'
                        fill={iconDashboardColor}
                      />
                    </svg>
                    {/* <i className='bx bxs-dashboard'></i> */}
                  </div>
                  <span style={{ color: `${iconDashboardColor}` }}>
                    {props.t("Dashboard")}
                  </span>
                </div>
              </Link>
            </li>
          </ul>
        )}

        {/* Sidebar content for role Admin Surveyor ========= */}
        {role === "adminsurveyor" && (
          <ul className='metismenu list-unstyled' id='side-menu'>
            {/* DASHBOARD */}
            {/* MODULE Users */}
            <li>
              <Link to='/adminsurveyor/dashboard' className='waves-effect'>
                <div className='sidebar-menu-wrapper'>
                  <div className='sidebar-icon-wrapper'>
                    <svg
                      width='14'
                      height='14'
                      viewBox='0 0 14 14'
                      fill='none'
                      xmlns='http://www.w3.org/2000/svg'
                    >
                      <path
                        d='M12.4444 0H1.55556C0.7 0 0 0.7 0 1.55556V12.4444C0 13.3 0.7 14 1.55556 14H12.4444C13.3 14 14 13.3 14 12.4444V1.55556C14 0.7 13.3 0 12.4444 0ZM1.55556 12.4444V1.55556H6.22222V12.4444H1.55556ZM12.4444 12.4444H7.77778V7H12.4444V12.4444ZM12.4444 5.44444H7.77778V1.55556H12.4444V5.44444Z'
                        fill={iconDashboardColor}
                      />
                    </svg>
                    {/* <i className='bx bxs-dashboard'></i> */}
                  </div>
                  <span style={{ color: `${iconDashboardColor}` }}>
                    {props.t("Dashboard")}
                  </span>
                </div>
              </Link>
            </li>
            <li>
              <Link to='/adminsurveyor/penugasan' className='waves-effect'>
                <div className='sidebar-menu-wrapper'>
                  <div className='sidebar-icon-wrapper'>
                    <svg
                      width='14'
                      height='12'
                      viewBox='0 0 14 12'
                      fill='none'
                      xmlns='http://www.w3.org/2000/svg'
                    >
                      <path
                        d='M3.29967 0.204713C3.16856 0.0736353 2.99075 0 2.80535 0C2.61995 0 2.44214 0.0736353 2.31102 0.204713L1.40697 1.10876L1.20211 0.903902C1.07024 0.776539 0.893622 0.706065 0.710297 0.707658C0.526972 0.709251 0.351607 0.782784 0.221971 0.912419C0.092336 1.04205 0.018803 1.21742 0.01721 1.40075C0.0156169 1.58407 0.0860912 1.76069 0.213454 1.89256L0.912643 2.59174C1.04376 2.72282 1.22157 2.79646 1.40697 2.79646C1.59237 2.79646 1.77018 2.72282 1.9013 2.59174L3.29967 1.19337C3.43075 1.06225 3.50439 0.88444 3.50439 0.69904C3.50439 0.51364 3.43075 0.33583 3.29967 0.204713ZM13.2953 9.7836H5.60211L5.5203 9.7885C5.34334 9.80955 5.18109 9.89737 5.06671 10.034C4.95233 10.1707 4.89445 10.3459 4.90489 10.5238C4.91534 10.7017 4.99332 10.8689 5.1229 10.9912C5.25249 11.1135 5.4239 11.1818 5.60211 11.182H13.2953L13.3771 11.1778C13.5553 11.1582 13.7192 11.0709 13.8349 10.934C13.9506 10.797 14.0093 10.6208 13.9988 10.4418C13.9883 10.2628 13.9094 10.0947 13.7785 9.97221C13.6476 9.84971 13.4746 9.78219 13.2953 9.7836ZM13.2953 5.59336H5.60211L5.5203 5.59826C5.34334 5.61931 5.18109 5.70713 5.06671 5.84379C4.95233 5.98045 4.89445 6.15563 4.90489 6.33353C4.91534 6.51143 4.99332 6.67863 5.1229 6.80097C5.25249 6.92331 5.4239 6.99154 5.60211 6.99174H13.2953L13.3771 6.98685C13.5541 6.9658 13.7163 6.87797 13.8307 6.74132C13.9451 6.60466 14.0029 6.42948 13.9925 6.25158C13.9821 6.07367 13.9041 5.90647 13.7745 5.78414C13.6449 5.6618 13.4735 5.59356 13.2953 5.59336ZM13.2953 1.39823H5.60211L5.5203 1.40312C5.34334 1.42417 5.18109 1.512 5.06671 1.64866C4.95233 1.78531 4.89445 1.96049 4.90489 2.13839C4.91534 2.3163 4.99332 2.4835 5.1229 2.60583C5.25249 2.72817 5.4239 2.79641 5.60211 2.79661H13.2953L13.3771 2.79171C13.5541 2.77066 13.7163 2.68284 13.8307 2.54618C13.9451 2.40952 14.0029 2.23434 13.9925 2.05644C13.9821 1.87854 13.9041 1.71134 13.7745 1.589C13.6449 1.46666 13.4735 1.39843 13.2953 1.39823ZM3.29967 9.29417C3.16856 9.16309 2.99075 9.08946 2.80535 9.08946C2.61995 9.08946 2.44214 9.16309 2.31102 9.29417L1.40697 10.1982L1.20211 9.99336C1.07024 9.866 0.893622 9.79552 0.710297 9.79712C0.526972 9.79871 0.351607 9.87224 0.221971 10.0019C0.092336 10.1315 0.018803 10.3069 0.01721 10.4902C0.0156169 10.6735 0.0860912 10.8501 0.213454 10.982L0.912643 11.6812C1.04376 11.8123 1.22157 11.8859 1.40697 11.8859C1.59237 11.8859 1.77018 11.8123 1.9013 11.6812L3.29967 10.2828C3.43075 10.1517 3.50439 9.9739 3.50439 9.7885C3.50439 9.6031 3.43075 9.42529 3.29967 9.29417ZM2.31102 4.74944C2.44289 4.62208 2.61951 4.55161 2.80283 4.5532C2.98616 4.55479 3.16152 4.62832 3.29116 4.75796C3.42079 4.8876 3.49433 5.06296 3.49592 5.24629C3.49751 5.42961 3.42704 5.60623 3.29967 5.7381L1.9013 7.13647C1.77018 7.26755 1.59237 7.34119 1.40697 7.34119C1.22157 7.34119 1.04376 7.26755 0.912643 7.13647L0.213454 6.43729C0.146674 6.37279 0.0934088 6.29564 0.056765 6.21033C0.0201212 6.12503 0.000833135 6.03328 2.63991e-05 5.94044C-0.000780337 5.8476 0.0169104 5.75554 0.0520662 5.66961C0.0872221 5.58368 0.139139 5.50561 0.204788 5.43997C0.270437 5.37432 0.348502 5.3224 0.43443 5.28724C0.520358 5.25209 0.612427 5.2344 0.705265 5.2352C0.798103 5.23601 0.88985 5.2553 0.975154 5.29194C1.06046 5.32859 1.13761 5.38185 1.20211 5.44863L1.40697 5.65349L2.31102 4.74944Z'
                        fill={iconPenugasanColor}
                      />
                    </svg>
                  </div>
                  {/* <i className='bi bi-person-fill'></i> */}
                  <span style={{ color: `${iconPenugasanColor}` }}>
                    {props.t("Penugasan")}
                  </span>
                </div>
              </Link>
            </li>

            <li>
              <Link to='/adminsurveyor/hasil-survey' className='waves-effect'>
                <div className='sidebar-menu-wrapper'>
                  <div className='sidebar-icon-wrapper'>
                    <svg
                      width='14'
                      height='13'
                      viewBox='0 0 14 13'
                      fill='none'
                      xmlns='http://www.w3.org/2000/svg'
                    >
                      <path
                        fillRule='evenodd'
                        clipRule='evenodd'
                        d='M1.90909 0C1.40277 0 0.917184 0.201136 0.55916 0.55916C0.201136 0.917184 0 1.40277 0 1.90909V10.8182C0 11.3245 0.201136 11.8101 0.55916 12.1681C0.917184 12.5261 1.40277 12.7273 1.90909 12.7273H12.0909C12.5972 12.7273 13.0828 12.5261 13.4408 12.1681C13.7989 11.8101 14 11.3245 14 10.8182V1.90909C14 1.40277 13.7989 0.917184 13.4408 0.55916C13.0828 0.201136 12.5972 0 12.0909 0H1.90909ZM12.0909 1.27273H1.90909C1.74032 1.27273 1.57846 1.33977 1.45911 1.45911C1.33977 1.57846 1.27273 1.74032 1.27273 1.90909V3.81818H12.7273V1.90909C12.7273 1.74032 12.6602 1.57846 12.5409 1.45911C12.4215 1.33977 12.2597 1.27273 12.0909 1.27273ZM1.27273 10.8182V5.09091H12.7273V10.8182C12.7273 10.987 12.6602 11.1488 12.5409 11.2682C12.4215 11.3875 12.2597 11.4545 12.0909 11.4545H1.90909C1.74032 11.4545 1.57846 11.3875 1.45911 11.2682C1.33977 11.1488 1.27273 10.987 1.27273 10.8182Z'
                        fill={iconHasilColor}
                      />
                    </svg>
                  </div>
                  <span style={{ color: `${iconHasilColor}` }}>
                    {props.t("Hasil Survey")}
                  </span>
                </div>
              </Link>
            </li>

            <li>
              <Link to='/admin/faq' className='waves-effect'>
                <div className='sidebar-menu-wrapper'>
                  <div className='sidebar-icon-wrapper'>
                    <svg
                      width='14'
                      height='13'
                      viewBox='0 0 14 13'
                      fill='none'
                      xmlns='http://www.w3.org/2000/svg'
                    >
                      <path
                        d='M2.97 8.66667L1.61778 9.72901C0.961647 10.2445 0 9.77707 0 8.94267V0.666667C0 0.489856 0.0702379 0.320286 0.195262 0.195262C0.320286 0.0702379 0.489856 0 0.666667 0H10.6667C10.8435 0 11.013 0.0702379 11.1381 0.195262C11.2631 0.320286 11.3333 0.489856 11.3333 0.666667V8.66667H2.97ZM2.50867 7.33333H10V1.33333H1.33333V8.25667L2.50867 7.33333ZM4.66667 10H11.4913L12.6667 10.9233V4H13.3333C13.5101 4 13.6797 4.07024 13.8047 4.19526C13.9298 4.32029 14 4.48986 14 4.66667V11.6093C14 12.4437 13.0384 12.9112 12.3822 12.3957L11.03 11.3333H5.33333C5.15652 11.3333 4.98695 11.2631 4.86193 11.1381C4.7369 11.013 4.66667 10.8435 4.66667 10.6667V10Z'
                        fill={iconFAQColor}
                      />
                    </svg>
                  </div>
                  {/* <i className='bi bi-person-fill'></i> */}
                  <span style={{ color: `${iconFAQColor}` }}>
                    {props.t("FAQ")}
                  </span>
                </div>
              </Link>
            </li>

            {isMobile ? (
              <>
                <li>
                  <Link
                    to='#'
                    onClick={() => history.goBack()}
                    className=' waves-effect'
                  >
                    <i className='bx bx-arrow-back'></i>
                    <span>
                      {props.leftSideBarType === "default" ? `` : ` Back`}
                    </span>
                  </Link>
                </li>
                <li>
                  <Link to='home' className=' waves-effect'>
                    <i className='bx bx-show-alt'></i>
                    <span>{props.t("HOME")}</span>
                  </Link>
                </li>
              </>
            ) : (
              ""
            )}
          </ul>
        )}

        {/* Sidebar content for role Staff Surveyor ========= */}
        {role === "staffsurveyor" && (
          <ul className='metismenu list-unstyled' id='side-menu'>
            {/* DASHBOARD */}
            {/* MODULE Users */}
            <li>
              <Link to='/staffsurveyor/dashboard' className='waves-effect'>
                <div className='sidebar-menu-wrapper'>
                  <div className='sidebar-icon-wrapper'>
                    <svg
                      width='14'
                      height='14'
                      viewBox='0 0 14 14'
                      fill='none'
                      xmlns='http://www.w3.org/2000/svg'
                    >
                      <path
                        d='M12.4444 0H1.55556C0.7 0 0 0.7 0 1.55556V12.4444C0 13.3 0.7 14 1.55556 14H12.4444C13.3 14 14 13.3 14 12.4444V1.55556C14 0.7 13.3 0 12.4444 0ZM1.55556 12.4444V1.55556H6.22222V12.4444H1.55556ZM12.4444 12.4444H7.77778V7H12.4444V12.4444ZM12.4444 5.44444H7.77778V1.55556H12.4444V5.44444Z'
                        fill={iconDashboardColor}
                      />
                    </svg>
                    {/* <i className='bx bxs-dashboard'></i> */}
                  </div>
                  <span style={{ color: `${iconDashboardColor}` }}>
                    {props.t("Dashboard")}
                  </span>
                </div>
              </Link>
            </li>
            <li>
              <Link to='/staffsurveyor/penugasan' className='waves-effect'>
                <div className='sidebar-menu-wrapper'>
                  <div className='sidebar-icon-wrapper'>
                    <svg
                      width='14'
                      height='12'
                      viewBox='0 0 14 12'
                      fill='none'
                      xmlns='http://www.w3.org/2000/svg'
                    >
                      <path
                        d='M3.29967 0.204713C3.16856 0.0736353 2.99075 0 2.80535 0C2.61995 0 2.44214 0.0736353 2.31102 0.204713L1.40697 1.10876L1.20211 0.903902C1.07024 0.776539 0.893622 0.706065 0.710297 0.707658C0.526972 0.709251 0.351607 0.782784 0.221971 0.912419C0.092336 1.04205 0.018803 1.21742 0.01721 1.40075C0.0156169 1.58407 0.0860912 1.76069 0.213454 1.89256L0.912643 2.59174C1.04376 2.72282 1.22157 2.79646 1.40697 2.79646C1.59237 2.79646 1.77018 2.72282 1.9013 2.59174L3.29967 1.19337C3.43075 1.06225 3.50439 0.88444 3.50439 0.69904C3.50439 0.51364 3.43075 0.33583 3.29967 0.204713ZM13.2953 9.7836H5.60211L5.5203 9.7885C5.34334 9.80955 5.18109 9.89737 5.06671 10.034C4.95233 10.1707 4.89445 10.3459 4.90489 10.5238C4.91534 10.7017 4.99332 10.8689 5.1229 10.9912C5.25249 11.1135 5.4239 11.1818 5.60211 11.182H13.2953L13.3771 11.1778C13.5553 11.1582 13.7192 11.0709 13.8349 10.934C13.9506 10.797 14.0093 10.6208 13.9988 10.4418C13.9883 10.2628 13.9094 10.0947 13.7785 9.97221C13.6476 9.84971 13.4746 9.78219 13.2953 9.7836ZM13.2953 5.59336H5.60211L5.5203 5.59826C5.34334 5.61931 5.18109 5.70713 5.06671 5.84379C4.95233 5.98045 4.89445 6.15563 4.90489 6.33353C4.91534 6.51143 4.99332 6.67863 5.1229 6.80097C5.25249 6.92331 5.4239 6.99154 5.60211 6.99174H13.2953L13.3771 6.98685C13.5541 6.9658 13.7163 6.87797 13.8307 6.74132C13.9451 6.60466 14.0029 6.42948 13.9925 6.25158C13.9821 6.07367 13.9041 5.90647 13.7745 5.78414C13.6449 5.6618 13.4735 5.59356 13.2953 5.59336ZM13.2953 1.39823H5.60211L5.5203 1.40312C5.34334 1.42417 5.18109 1.512 5.06671 1.64866C4.95233 1.78531 4.89445 1.96049 4.90489 2.13839C4.91534 2.3163 4.99332 2.4835 5.1229 2.60583C5.25249 2.72817 5.4239 2.79641 5.60211 2.79661H13.2953L13.3771 2.79171C13.5541 2.77066 13.7163 2.68284 13.8307 2.54618C13.9451 2.40952 14.0029 2.23434 13.9925 2.05644C13.9821 1.87854 13.9041 1.71134 13.7745 1.589C13.6449 1.46666 13.4735 1.39843 13.2953 1.39823ZM3.29967 9.29417C3.16856 9.16309 2.99075 9.08946 2.80535 9.08946C2.61995 9.08946 2.44214 9.16309 2.31102 9.29417L1.40697 10.1982L1.20211 9.99336C1.07024 9.866 0.893622 9.79552 0.710297 9.79712C0.526972 9.79871 0.351607 9.87224 0.221971 10.0019C0.092336 10.1315 0.018803 10.3069 0.01721 10.4902C0.0156169 10.6735 0.0860912 10.8501 0.213454 10.982L0.912643 11.6812C1.04376 11.8123 1.22157 11.8859 1.40697 11.8859C1.59237 11.8859 1.77018 11.8123 1.9013 11.6812L3.29967 10.2828C3.43075 10.1517 3.50439 9.9739 3.50439 9.7885C3.50439 9.6031 3.43075 9.42529 3.29967 9.29417ZM2.31102 4.74944C2.44289 4.62208 2.61951 4.55161 2.80283 4.5532C2.98616 4.55479 3.16152 4.62832 3.29116 4.75796C3.42079 4.8876 3.49433 5.06296 3.49592 5.24629C3.49751 5.42961 3.42704 5.60623 3.29967 5.7381L1.9013 7.13647C1.77018 7.26755 1.59237 7.34119 1.40697 7.34119C1.22157 7.34119 1.04376 7.26755 0.912643 7.13647L0.213454 6.43729C0.146674 6.37279 0.0934088 6.29564 0.056765 6.21033C0.0201212 6.12503 0.000833135 6.03328 2.63991e-05 5.94044C-0.000780337 5.8476 0.0169104 5.75554 0.0520662 5.66961C0.0872221 5.58368 0.139139 5.50561 0.204788 5.43997C0.270437 5.37432 0.348502 5.3224 0.43443 5.28724C0.520358 5.25209 0.612427 5.2344 0.705265 5.2352C0.798103 5.23601 0.88985 5.2553 0.975154 5.29194C1.06046 5.32859 1.13761 5.38185 1.20211 5.44863L1.40697 5.65349L2.31102 4.74944Z'
                        fill={iconPenugasanColor}
                      />
                    </svg>
                  </div>
                  {/* <i className='bi bi-person-fill'></i> */}
                  <span style={{ color: `${iconPenugasanColor}` }}>
                    {props.t("Penugasan")}
                  </span>
                </div>
              </Link>
            </li>

            <li>
              <Link to='/staffsurveyor/hasil-survey' className='waves-effect'>
                <div className='sidebar-menu-wrapper'>
                  <div className='sidebar-icon-wrapper'>
                    <svg
                      width='14'
                      height='13'
                      viewBox='0 0 14 13'
                      fill='none'
                      xmlns='http://www.w3.org/2000/svg'
                    >
                      <path
                        fillRule='evenodd'
                        clipRule='evenodd'
                        d='M1.90909 0C1.40277 0 0.917184 0.201136 0.55916 0.55916C0.201136 0.917184 0 1.40277 0 1.90909V10.8182C0 11.3245 0.201136 11.8101 0.55916 12.1681C0.917184 12.5261 1.40277 12.7273 1.90909 12.7273H12.0909C12.5972 12.7273 13.0828 12.5261 13.4408 12.1681C13.7989 11.8101 14 11.3245 14 10.8182V1.90909C14 1.40277 13.7989 0.917184 13.4408 0.55916C13.0828 0.201136 12.5972 0 12.0909 0H1.90909ZM12.0909 1.27273H1.90909C1.74032 1.27273 1.57846 1.33977 1.45911 1.45911C1.33977 1.57846 1.27273 1.74032 1.27273 1.90909V3.81818H12.7273V1.90909C12.7273 1.74032 12.6602 1.57846 12.5409 1.45911C12.4215 1.33977 12.2597 1.27273 12.0909 1.27273ZM1.27273 10.8182V5.09091H12.7273V10.8182C12.7273 10.987 12.6602 11.1488 12.5409 11.2682C12.4215 11.3875 12.2597 11.4545 12.0909 11.4545H1.90909C1.74032 11.4545 1.57846 11.3875 1.45911 11.2682C1.33977 11.1488 1.27273 10.987 1.27273 10.8182Z'
                        fill={iconHasilColor}
                      />
                    </svg>
                  </div>
                  <span style={{ color: `${iconHasilColor}` }}>
                    {props.t("Hasil Survey")}
                  </span>
                </div>
              </Link>
            </li>

            <li>
              <Link to='/staffsurveyor/faq' className='waves-effect'>
                <div className='sidebar-menu-wrapper'>
                  <div className='sidebar-icon-wrapper'>
                    <svg
                      width='14'
                      height='13'
                      viewBox='0 0 14 13'
                      fill='none'
                      xmlns='http://www.w3.org/2000/svg'
                    >
                      <path
                        d='M2.97 8.66667L1.61778 9.72901C0.961647 10.2445 0 9.77707 0 8.94267V0.666667C0 0.489856 0.0702379 0.320286 0.195262 0.195262C0.320286 0.0702379 0.489856 0 0.666667 0H10.6667C10.8435 0 11.013 0.0702379 11.1381 0.195262C11.2631 0.320286 11.3333 0.489856 11.3333 0.666667V8.66667H2.97ZM2.50867 7.33333H10V1.33333H1.33333V8.25667L2.50867 7.33333ZM4.66667 10H11.4913L12.6667 10.9233V4H13.3333C13.5101 4 13.6797 4.07024 13.8047 4.19526C13.9298 4.32029 14 4.48986 14 4.66667V11.6093C14 12.4437 13.0384 12.9112 12.3822 12.3957L11.03 11.3333H5.33333C5.15652 11.3333 4.98695 11.2631 4.86193 11.1381C4.7369 11.013 4.66667 10.8435 4.66667 10.6667V10Z'
                        fill={iconFAQColor}
                      />
                    </svg>
                  </div>
                  {/* <i className='bi bi-person-fill'></i> */}
                  <span style={{ color: `${iconFAQColor}` }}>
                    {props.t("FAQ")}
                  </span>
                </div>
              </Link>
            </li>

            {isMobile ? (
              <>
                <li>
                  <Link
                    to='#'
                    onClick={() => history.goBack()}
                    className=' waves-effect'
                  >
                    <i className='bx bx-arrow-back'></i>
                    <span>
                      {props.leftSideBarType === "default" ? `` : ` Back`}
                    </span>
                  </Link>
                </li>
                <li>
                  <Link to='home' className=' waves-effect'>
                    <i className='bx bx-show-alt'></i>
                    <span>{props.t("HOME")}</span>
                  </Link>
                </li>
              </>
            ) : (
              ""
            )}
          </ul>
        )}
      </div>
    </React.Fragment>
  );
};

const mapStatetoProps = (state) => {
  const { leftMenu, leftSideBarType } = state.Layout;
  return { leftMenu, leftSideBarType };
};
export default connect(mapStatetoProps, { toggleLeftmenu, changeSidebarType })(
  withRouter(withNamespaces()(SidebarContent))
);
