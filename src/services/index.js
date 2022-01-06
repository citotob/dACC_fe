// import Get from "./Get";
import Post from "./Post";
import Get from "./Get";

// NOTE : Gunakan true or false, kalau true dia kirim params ke url,
// kalau false tidak kirim params

// ====================== ROLE : ADMIN ======================
// cito
const postAddBank = (data) => Post("datas/addBank", data, true);
const postAddAccBank = (data) => Post("datas/addAccBank", data, true);
const postAddWL = (data) => Post("datas/addWL", data, true);
const postAddDeposit = (data) => Post("depo/add", data, true);
const postAddWD = (data) => Post("withdrawal/add", data, true);

const getDataRoleTable = (query, pageNumber, row) =>
  Get(`user/get/?${query}&page=${pageNumber}&row=${row}`, "", false);
const getDataBankTable = (query, pageNumber, row) =>
  Get(`datas/getBank/?${query}&page=${pageNumber}&row=${row}`, "", false);
const getDataAccBankTable = (query, pageNumber, row) =>
  Get(`datas/getAccBank/?${query}&page=${pageNumber}&row=${row}`, "", false);
const getDataWLTable = (query, pageNumber, row) =>
  Get(`datas/getWL/?${query}&page=${pageNumber}&row=${row}`, "", false);
const getDataDepositTable = (query, userId, pageNumber, row) =>
  Get(`depo/get/?${query}&userid=${userId}&page=${pageNumber}&row=${row}`, "", false);
const getAccBank = (query, pageNumber, row) =>
  Get(`datas/getAccBank/?${query}&page=${pageNumber}&row=${row}`, "", false);
const getWL = (query, pageNumber, row) =>
  Get(`datas/getWL/?${query}&page=${pageNumber}&row=${row}`, "", false);

const getDataWDTable = (query, userId, pageNumber, row) =>
  Get(`withdrawal/get/?${query}&userid=${userId}&page=${pageNumber}&row=${row}`, "", false);

const getDashboard = () => Get("dashboard/getAdmin/", "", false);
const getBank = () => Get("datas/getBank", "", false);
// 
// ============== LOGIN REGISTER
const postLogin = (data) => Post("user/login", data, true);
const postRegis = (data) => Post("user/regist", data, true);

// ============== GENERAL
const getVPAll = () => Get("vendorperformance/all/", "", false);
const getNotif = (data) => Post("user/getnotif", data, true); // NOTIFICATION
const searchNotif = (data) => Post("user/searchNotif", data, true); // SEARCH NOTIFICATION
const getNotifPerPage = (data) => Post("user/getnotifPerPage", data, true);
const getRole = () => Get("user/getRole", "", false); // ROLE LIST
const getSurveyor = (data) => Post("survey/getsurveyor", data, true); // ORGANISATION LIST
const getLokasiProvinsi = () => Get("location/provinsi/", "", false);
const getLokasiKabKota = (data) =>
  Get(`location/kabupatenkota/?provinsi=${data}`, "", false);
const getLokasiKecamatan = (data) =>
  Get(`location/kecamatan/?kabupaten_kota=${data}`, "", false);
const getLokasiDesa = (data) =>
  Get(`location/desa/?kecamatan=${data}`, "", false);
const getStaffSurveyor = (id_surveyor) =>
  Get(
    `user/getstaffsurvey/?role=staffs&organization=${id_surveyor}`,
    "",
    false
  ); // NAMA STAFF LISTS

// ============== PAGE : PROFILE
const changePassword = (data) => Post("user/changepassword", data, true);

// ============== PAGE : DASHBOARD
// const getDashboard = () => Get("survey/getpenugasan/count/", "", false);
const getPenugasanCountProvinsi = () =>
  Get("survey/getpenugasan/count/provinsi", "", false); // DASHBOARD CARD MAP
const getSurveyByDateBTS = (data) =>
  Post("survey/getsurveybydatebts", data, true); // DASHBOARD CARD CHART
const getSurveyByDateAI = (data) =>
  Post("survey/getsurveybydateai", data, true); // DASHBOARD CARD CHART

// ============== PAGE : PENGGUNA
const getDataPenggunaTable = (query, pageNumber, row) =>
  Get(`user/get/?${query}&page=${pageNumber}&row=${row}`, "", false);
const postUserVerify = (data) => Post("user/verify", data, true);
const postUserDecline = (data) => Post("user/decline", data, true);
// ********** PENGUNA SEARCH
const getUserSearch = (status, field, value, row, page) =>
  Get(
    `user/search/?${status}&field=${field}&value=${value}&row=${row}&page=${page}`,
    "",
    false
  );

// ============== PAGE : LOKASI SURVEY
const getLokasiSurveyTable = (data) =>
  Post("survey/getlokasisurvey", data, true);
const postAddPenugasan = (data) => Post("survey/addpenugasan", data, true);
const postUploadLokasi = (data) => Post("survey/uploadlokasi", data, true);
// ********** LOKASI SURVEY SEARCH
const searchLokasiAI = (data) => Post(`survey/searchLokasiAI`, data, true);
const searchLokasiBTS = (data) => Post(`survey/searchLokasiBts`, data, true);

// ============== PAGE : PENUGASAN
const getPenugasanTable = (data) => Post("survey/getpenugasan", data, true); // PENUGASAN TABLE
const postAssignPenugasan = (data) =>
  Post("survey/assignpenugasan", data, true);
const postChangeStatusPenugasan = (data) =>
  Post("survey/changestatuspenugasan", data, true); // ada double di hasil survey
// ********** PENUGASAN SEARCH
const searchPenugasan = (data) => Post(`survey/searchPenugasan`, data, true);

// ============== PAGE : HASIL SURVEY
const getSurveyStatusAI = (data) =>
  Post("survey/getsurveystatusai", data, true);
const getSurveyStatusBTS = (data) =>
  Post("survey/getsurveystatusbts", data, true);
const getSurveyIssue = (data) => Post("survey/getsurveyissue", data, true);
const getSurveyLogAI = (data) => Post("survey/getsurveylogai", data, true);
// const getSurveyLogBTS = (data) => Post("survey/getsurveylogbts", data, true);
const getSurveyLogBTS = (page, row) =>
  Get(`survey/getLogBTS?page=${page}&row=${row}`, "", false); // new log table
const setujuiSurvey = (data) => Post("survey/setujuisurvey", data, true);
const approveSurveyBTSAdmin = (data) =>
  Post("survey/approvesurveibtsadmin", data, true);
const getHasilBTS = (page, row) =>
  Get(`survey/getHasilBTS/?page=${page}&row=${row}`, "", false);
const getHasilBTSAll = (page, row) => Get(`survey/getHasilBTS/`, "", false);

// ********** HASIL SURVEY SEARCH
const searchHasilAI = (data) => Post(`survey/searchHasilAI`, data, true);
const searchHasilBTS = (data) => Post(`survey/searchHasilBTS`, data, true);
const searchIssueAI = (data) => Post(`survey/searchIssueAI`, data, true);
const searchIssueBTS = (data) => Post(`survey/searchIssueBTS`, data, true);
const searchLogAI = (data) => Post(`survey/searchLogAI`, data, true);
const searchLogBTS = (data) => Post(`survey/searchLogBTS`, data, true);

// ============== PAGE : SURVEY CLUSTER
const getFilterAi = (data) => Post("util/filterAi", data, true);
const getProvinsi = () => Get("location/provinsi", "", false);
// ============== PAGE : FAQ

// ====================== ROLE : ADMIN SURVEYOR ======================
// ============== PAGE : DASHBOARD
const getDashboardSurveyor = (data) =>
  Post("survey/getpenugasan/count/surveyor", data, true);

// ============== PAGE : PENUGASAN
const getPenugasanSurveyorTable = (data) =>
  Post("survey/getpenugasansurveyor", data, true); // penugasan untuk role surveyor
const getPenugasanSurveyor = (data) =>
  Post("survey/getpenugasansurveyor", data, true);
const searchPenugasanSurveyor = (data) =>
  Post("survey/searchPenugasanSurveyor", data, true);

// ============== PAGE : HASIL SURVEY
const getSurveyorSubmitAI = (data) =>
  Post("survey/getsurveyorsubmitai", data, true);
const getSurveyorSubmitBTS = (data) =>
  Post("survey/getsurveyorsubmitbts", data, true);
const getSurveyBTSNew = (data) => Post("survey/getSurveyBTSNew", data, true);
const getIssueBySurveyor = (data) =>
  Post("survey/getissuebysurveyor", data, true);
const getSurveyorLogAI = (data) => Post("survey/getsurveyorlogai", data, true);
// const getSurveyorLogBTS = (data) =>
//   Post("survey/getsurveyorlogbts", data, true);
const getSurveyorLogBTS = (page, row, surveyor) =>
  Get(
    `survey/surveyor/getLogBTS/?page=${page}&row=${row}&surveyor=${surveyor}`,
    "",
    false
  ); // new log table
// const getSurveyorLogBTSNew = (data) => Post("survey/getLogBtsNew", data, true);
const approveSurvey = (data) => Post("survey/approvesurvey", data, true);
const approveSurveyBTS = (data) => Post("survey/approvesurveibts", data, true);
const changeStatusPenugasan = (data) =>
  Post("survey/changestatuspenugasan", data, true);
const changeStatusAI = (data) => Post("survey/changestatusai", data, true); //
const changeStatusBTS = (data) => Post("survey/changestatusbtsnew", data, true); //
const getSurveyBTSbyKode = (data) =>
  Post("survey/getSurveyBTSbyKode", data, true);
const tandaiSurvey = (data) => Post("survey/tandaisurvey", data, true); // Pindahin data dari tab Hasil Survey Ke Tab Issue
const tolakSurvey = (data) => Post("survey/tolaksurveibts", data, true); // Tolak Hasil Survey di page Detail BTS
const getHasilBTSSurveyor = (surveyor, page, row) =>
  Get(
    `survey/surveyor/getHasilBTS/?surveyor=${surveyor}&page=${page}&row=${row}`,
    "",
    false
  );
const getLogStaffSurveyorBTS = (data) =>
  Post("survey/getsurveybyuser/bts", data, true);
const getLogStaffSurveyorAI = (data) =>
  Post("survey/getsurveybyuser/ai", data, true);
// ********** HASIL SURVEY SEARCH
const searchHasilAISurveryor = (data) =>
  Post(`survey/surveyor/searchHasilAI`, data, true);
const searchHasilBTSSurveryor = (data) =>
  Post(`survey/surveyor/searchHasilBTS`, data, true);
const searchIssueAISurveryor = (data) =>
  Post(`survey/surveyor/searchIssueAI`, data, true);
const searchIssueBTSSurveryor = (data) =>
  Post(`survey/surveyor/searchIssueBTS`, data, true);
const searchLogAISurveryor = (data) =>
  Post(`survey/surveyor/searchLogAI`, data, true);
const searchLogBTSSurveryor = (data) =>
  Post(`survey/surveyor/searchLogBTS`, data, true);

// ====================== ROLE : STAFF SURVEYOR ======================
const addHasilSurvey = (data) => Post(`survey/addHasilSurvey`, data, true);
const getsurveybyuserai = (data) =>
  Post(`survey/getsurveybyuser/ai`, data, true);
const getsurveybyuserbts = (data) =>
  Post(`survey/getsurveybyuser/bts`, data, true);
const createSurveyBTSPart1 = (data) =>
  Post(`survey/createSurveyBTSPart1`, data, true);
const createSurveyBTSPart2 = (data) =>
  Post(`survey/createSurveyBTSPart2`, data, true);
const createSurveyBTSPart3 = (data) =>
  Post(`survey/createSurveyBTSPart3`, data, true);
const createSurveyBTSPart4 = (data) =>
  Post(`survey/createSurveyBTSPart4`, data, true);
const createSurveyBTSPart5 = (data) =>
  Post(`survey/createSurveyBTSPart5`, data, true);
const createSurveyBTSPart6 = (data) =>
  Post(`survey/createSurveyBTSPart6`, data, true);
const createSurveyBTSPart7 = (data) =>
  Post(`survey/createSurveyBTSPart7`, data, true);
const createSurveyBTSPart8 = (data) =>
  Post(`survey/createSurveyBTSPart8`, data, true);
const createSurveyBTSPart9 = (data) =>
  Post(`survey/createSurveyBTSPart9`, data, true);
const createSurveyBTSPart10 = (data) =>
  Post(`survey/createSurveyBTSPart10`, data, true);

// ====
// ====
// ====
// =============================
// =============================
// =============================
// ====
// ====
// ====
const API = {
  // cito
  getDataBankTable,
  getDataAccBankTable,
  getDataWLTable,
  getDataDepositTable,
  getAccBank,
  getWL,
  getDataWDTable,

  postAddBank,
  postAddAccBank,
  postAddWL,
  postAddDeposit,
  postAddWD,
  // 
  getBank,
  getRole,
  getVPAll,
  searchNotif,
  getStaffSurveyor,
  getSurveyor,
  postLogin,
  postRegis,
  getDashboard,
  getDashboardSurveyor,
  getDataPenggunaTable,
  getSurveyStatusAI,
  getSurveyStatusBTS,
  getSurveyIssue,
  getSurveyLogAI,
  getSurveyLogBTS,
  postUserVerify,
  postUserDecline,
  getLokasiSurveyTable,
  getPenugasanTable,
  getPenugasanSurveyorTable,
  approveSurvey,
  getPenugasanCountProvinsi,
  postUploadLokasi,
  postAddPenugasan,
  postChangeStatusPenugasan,
  postAssignPenugasan,
  getSurveyByDateBTS,
  getSurveyByDateAI,
  getFilterAi,
  getProvinsi,
  getNotif,
  getNotifPerPage,
  getPenugasanSurveyor,
  getSurveyorSubmitAI,
  getSurveyorSubmitBTS,
  getSurveyBTSNew,
  getIssueBySurveyor,
  getSurveyorLogAI,
  getSurveyorLogBTS,
  setujuiSurvey,
  tandaiSurvey,
  tolakSurvey,
  changeStatusPenugasan,
  changeStatusAI,
  getSurveyBTSbyKode,
  getUserSearch,
  getLokasiProvinsi,
  getLokasiKabKota,
  getLokasiKecamatan,
  getLokasiDesa,
  searchLokasiAI,
  searchLokasiBTS,
  searchPenugasan,
  searchHasilAI,
  searchIssueAI,
  searchIssueBTS,
  searchLogBTS,
  searchHasilBTS,
  searchLogAI,
  searchHasilAISurveryor,
  searchIssueAISurveryor,
  searchIssueBTSSurveryor,
  searchLogAISurveryor,
  searchPenugasanSurveyor,
  searchHasilBTSSurveryor,
  searchLogBTSSurveryor,
  getHasilBTS,
  getHasilBTSSurveyor,
  changePassword,
  approveSurveyBTS,
  approveSurveyBTSAdmin,
  changeStatusBTS,
  getHasilBTSAll, // pakai reeact query untuk dropdown select
  createSurveyBTSPart1,
  createSurveyBTSPart2,
  createSurveyBTSPart3,
  createSurveyBTSPart4,
  createSurveyBTSPart5,
  createSurveyBTSPart6,
  createSurveyBTSPart7,
  createSurveyBTSPart8,
  createSurveyBTSPart9,
  createSurveyBTSPart10,
  addHasilSurvey,
  getLogStaffSurveyorBTS,
  getLogStaffSurveyorAI,
  getsurveybyuserai,
  getsurveybyuserbts,
};

export default API;
