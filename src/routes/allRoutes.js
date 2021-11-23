import React from 'react';
import { Redirect } from 'react-router-dom';

import Login from '../pages/Login/login';
import Register from '../pages/Register';
import Logout from '../pages/Authentication/Logout';
import ForgotPassword from '../pages/ForgotPassword';
import Pages404 from '../pages/Utility/pages-404';
import Pages500 from '../pages/Utility/pages-500';
import ModuleMapPolygon from '../pages/ModuleGraphic/ChartJS/BarChart';
import ModuleMapLineChart from '../pages/ModuleGraphic/ChartJS/LineChart';
import ModuleMapPieChart from '../pages/ModuleGraphic/ChartJS/PieChart';
import ModuleMapTitik from '../pages/ModuleMap/MapTitik';
import ModuleNotif from '../pages/ModuleNotif';
import DashboardAdmin from '../pages/DashboardAdmin/dashboardAdmin';
import Pengguna from '../pages/Pengguna/Pengguna';
import SurveyCluster from '../pages/SurveyCluster';
import FAQ from '../pages/FAQ';
import Profile from '../pages/Profile/Profile';
import LokasiSurvey from '../pages/LokasiSurvey/LokasiSurvey';
import HasilSurvey from '../pages/HasilSurvey/HasilSurvey';
import DetailSurvey from '../pages/DetailSurvey';
import Penugasan from '../pages/Penugasan/Penugasan';
import NotificationPage from '../pages/NotificationPage/NotificationPage';
import ModuleFilter from '../pages/ModuleFilter';
import DetailIssue from '../pages/DetailIssue';
import DetailSurveyBTS from '../pages/DetailSurveyBTS';
import Gnettrack from '../pages/Gnettrack/Gnettrack';
import DetailGNet from '../pages/DetailGNet';
import DetailGNetForm from '../pages/DetailGNetForm';
import Plannet from '../pages/Plannet/Plannet';
import DetailPlannet from '../pages/DetailPlannet';
import DetailCompare from '../pages/DetailCompare';
import DetailSurveyBTSDownloadPDF from '../components/DetailSurveyBTS/DownloadPDF';
import DetailSurveyDownloadPDF from '../components/DetailSurvey/DownloadPDF';
import DetailIssueDownloadPDF from '../components/DetailIssue/DownloadPDF';
import PrivacyPolicy from '../pages/PrivacyPolicy';

// executive
import DashboardExecutive from '../pages/DashboardExecutive/dashboardExecutive';

// admin surveyor
import DashboardAdminSurveyor from '../pages/DashboardAdminSurveyor/dashboardAdminSurveyor';

// staff surveyor
import DashboardStaffSurveyor from '../pages/DashboardStaffSurveyor/dashboardStaffSurveyor';
import FormPenugasanStaff from '../pages/FormPenugasanStaff';
import FormPenugasanStaffAI from '../pages/FormPenugasanStaffAI';

const userRoutes = [
  //login
  { path: '/login', component: Login },

  //Module Notid
  { path: '/module-notif', component: ModuleNotif },

  //Chart
  { path: '/module-graphic-pie-chart', component: ModuleMapPieChart },
  { path: '/module-graphic-bar-chart', component: ModuleMapPolygon },
  { path: '/module-graphic-line-chart', component: ModuleMapLineChart },

  //Map
  { path: '/module-map-titik', component: ModuleMapTitik },
  { path: '/module-map-polygon', component: ModuleMapPolygon },

  //Admin
  { path: '/admin/dashboard', component: DashboardAdmin },
  { path: '/admin/data-pengguna', component: Pengguna },
  { path: '/admin/survey-cluster', component: SurveyCluster },
  { path: '/admin/faq', component: FAQ },
  { path: '/admin/profile', component: Profile },
  { path: '/admin/lokasi-survey', component: LokasiSurvey },
  { path: '/admin/hasil-survey', component: HasilSurvey },
  { path: '/admin/hasil-survey/:id', component: DetailSurvey },
  { path: '/admin/hasil-survey/BTS/:id', component: DetailSurveyBTS },

  { path: '/admin/hasil-survey/issue/:id', component: DetailIssue },
  { path: '/admin/penugasan', component: Penugasan },
  { path: '/admin/notifikasi', component: NotificationPage },
  { path: '/date', component: ModuleFilter },
  { path: '/admin/compare', component: DetailCompare },
  { path: '/admin/gnettrack/:id', component: DetailGNet },
  { path: '/admin/gnettrack/form/:id', component: DetailGNetForm },
  { path: '/admin/gnettrack', component: Gnettrack },
  { path: '/admin/plannet', component: Plannet },
  { path: '/admin/plannet/:id', component: DetailPlannet },

  // Executive
  { path: '/executive/dashboard', component: DashboardExecutive },

  // Admin Surveyor
  { path: '/adminsurveyor/profile', component: Profile },
  {
    path: '/adminsurveyor/dashboard',
    component: DashboardAdminSurveyor,
  },
  {
    path: '/adminsurveyor/penugasan',
    component: Penugasan,
  },
  { path: '/adminsurveyor/notifikasi', component: NotificationPage },
  { path: '/adminsurveyor/hasil-survey', component: HasilSurvey },
  { path: '/adminsurveyor/hasil-survey/:id', component: DetailSurvey },
  { path: '/adminsurveyor/hasil-survey/issue/:id', component: DetailIssue },
  { path: '/adminsurveyor/hasil-survey/BTS/:id', component: DetailSurveyBTS },

  // Staff Surveyor
  { path: '/staffsurveyor/profile', component: Profile },

  { path: '/staffsurveyor/faq', component: FAQ },
  {
    path: '/staffsurveyor/dashboard',
    component: DashboardStaffSurveyor,
  },
  {
    path: '/staffsurveyor/penugasan',
    component: Penugasan,
  },
  { path: '/staffsurveyor/notifikasi', component: NotificationPage },
  { path: '/staffsurveyor/hasil-survey', component: HasilSurvey },
  { path: '/staffsurveyor/penugasan/bts/:id', component: FormPenugasanStaff },
  { path: '/staffsurveyor/penugasan/ai/:id', component: FormPenugasanStaffAI },

  // this route should be at the end of all other routes
  { path: '/', exact: true, component: () => <Redirect to="/login" /> },
];

const authRoutes = [
  { path: '/logout', component: Logout },
  { path: '/login', component: Login },
  { path: '/register', component: Register },
  { path: '/forgot-password', component: ForgotPassword },

  { path: '/pages-404', component: Pages404 },
  { path: '/pages-500', component: Pages500 },
  {
    path: '/admin/hasil-survey/BTS/PDF/:id',
    component: DetailSurveyBTSDownloadPDF,
  },
  {
    path: '/admin/hasil-survey/PDF/:id',
    component: DetailSurveyDownloadPDF,
  },
  {
    path: '/admin/hasil-survey/issue/PDF/:id',
    component: DetailIssueDownloadPDF,
  },
  {
    path: '/privacy-policy',
    component: PrivacyPolicy,
  },
];

export { userRoutes, authRoutes };
