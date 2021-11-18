// import Get from "./Get";
import Post from "./Post";
import Get from "./Get";
import Put from "./Put";

// GET
// NOTE : Gunakan true or false, kalau true dia kirim paramas ke url,
// kalau false tidak kirim params
const getVPAll = (data) =>
	Get(`vendorperformance/all/${data ?? ""}`, "", false);
const getAllBatch = () => Get("site/getallbatch", "", false);
const getUserMene = () => Get("user/get", "", false);
const getNotification = (userId) => Get(`notif/${userId}`, "", false);

// GET USER PROFILE
const getUserProfile = (user_id) =>
	Get(`user/profile?user_id=${user_id}`, "", false);

// DASHBOARD //
// Admin & Executive
const getDashboard = () => Get("site/dashboard", "", false);
const getProvinsi = () => Get("location/provinsi", "", false);
const getKabupatenKota = (prov) =>
	Get(`location/kabupatenkota/?provinsi=${prov}`, "", false);
const getKecamatan = (kabkot) =>
	Get(`location/kecamatan?kabupaten_kota=${kabkot}`, "", false);
const getDesa = (kec) => Get(`location/desa/?kecamatan=${kec}`, "", false);
// Vendor
const getDashboardVendor = (param) => Post("vendor/dashboard", param);
const getVendorApp = (vendor, batch) =>
	Get(`vendor/getvendorapp/?vendor=${vendor}&batch=${batch}`, "", false);

const getRecommendedVendor = (data) =>
	Get(`site/getrecommendvendor/?${data}`, "", false);
const postDataUnikID = (data) => Post("site/getoffairbyid", data);
// EXPLORE DATA
const getTitikInternet = () => Get("odp/get", "", false);
const getDataTableLokasiExplore = () => Get("site/getoffair", "", false);

// AREA POTENSIAL
const getDataKepadatanPenduduk = () => Get("util/clusterpenduduk", "", false);
const getDataAI = () => Get("util/clusterai/onair", "", false);
const getDataBTS = () => Get("util/clusterbts/onair", "", false);

//SMM Check if download excel Available
const getGeneratedExcel = (batchid) =>
	Get(`site/generateNilaiExcel/?batchid=${batchid}`, "", false);

//SMM Check if download excel Available
const getSMMSiteSummaryDetail = (smm_id) =>
	Get(`site/getsitesummary/?smm_id=${smm_id}`, "", false);

// SMM CHECK NEAR OFFAIR
const getCheckNearOffAir = (data) => Post("site/checknearoffair", data);
const GetClustering = (data, tipe) =>
	Get(`site/getoffaircluster/?${data}&tipe=${tipe}`, "", false);

// GET VENDOR RECOMMENDATION SMM
const getRecommendVendor = (data) =>
	Get(`site/getrecommendvendor/?${data}`, "", false);

// DELETE

// PUT
const putStatusNotif = (data) => Put("notif", data);

// POST
const postSentNotifPenawaran = (data) => Post("vendor/sentnotif", data);
const postInviteVendor = (data) => Post("vendorperformance/inviteVendor", data);
const postVendorSMAll = (data) => Post("vendor/getallbatch", data);
const postVendorSM = (data) => Post("vendor/getbatch", data);
const postVendorSMSummary = (data) => Post("vendor/getbatchsummary", data);
const postInVendor = (data) => Post("site/sendinvitation", data);
const postAdminSM = (data) => Post("site/getbatch", data);
const postLogin = (data) => Post("user/login", data);
const postRegist = (data) => Post("user/regist", data);
const postChangePassword = (data) => Post("user/changepassword", data);
const postVendorRespon = (data) => Post("vendor/respon", data);
const postCreateVPAdmin = (data) => Post("vendorperformance/create", data);
const postUpdateVPAdmin = (data) => Post("vendorperformance/update", data);
const postForgotPass = (data) => Post("user/forgotpassword", data);
const postNewBatch = (data) => Post("site/addbatch", data);
const postNewSite = (data) => Post("site/addsite", data);
const postEditBatch = (data) => Post("site/editbatch", data);
const postVendorPenawaran = (data) => Post("vendor/penawaran", data);
const postVerif = (data) => Post("user/verify", data);
const postDecline = (data) => Post("user/decline", data);
const postDelete = (data) => Post("user/remove", data);
const postReset = (data) => Post("user/resetpassword", data);
const postChangeAvatar = (data) => Post("user/changeimage", data);
const postVerifikasiTeknologi = (data) =>
	Post("user/teknologi-vendor/verifikasi", data);

//smm
const postCheckRFIVendor = (data) => Post("vendor/checkrfivendor", data);
const postCheckRFIBatch = (data) => Post("vendor/checkrfibatch", data);

const postCheckJudul = (data) => Post("vendor/checkjudul", data);

//postValidationSites
const postValidationSites = (data) => Post("site/validatebatchsites", data);

// GET LIST OFFAIR
const getListUnikID = (tech) => Get(`site/getlistoffair?tech_type=`, "", false);

// CLUSTERING
const postClustering = (data) => Post("site/getoffaircluster", data);

//Explore Data
const postDummySite = (data) => Post("odp/getodp", data);

//Tambah Teknologi Vendor Baru
const postTeknologiVendorBaru = (data) =>
	Post("user/teknologi-vendor/baru", data);

// Silahkan isi function yg akan digunakan
const API = {
	postSentNotifPenawaran,
	postInviteVendor,
	postVendorSMAll,
	postVendorSM,
	postVendorSMSummary,
	getVPAll,
	postLogin,
	postRegist,
	postVendorRespon,
	postCreateVPAdmin,
	postUpdateVPAdmin,
	postChangePassword,
	postForgotPass,
	postDummySite,
	getAllBatch,
	postNewBatch,
	postNewSite,
	postEditBatch,
	postVendorPenawaran,
	getVendorApp,
	postAdminSM,
	postChangeAvatar,
	postClustering,
	GetClustering,
	getRecommendVendor,
	postVerifikasiTeknologi,

	postVerif,
	postDecline,
	postDelete,

	// Dashboard
	// Admin
	getDashboard,
	postInVendor,
	getDashboardVendor,
	getUserMene,
	getProvinsi,
	getKabupatenKota,
	getKecamatan,
	getDesa,
	getListUnikID,
	getNotification,
	postDataUnikID,
	postReset,
	getCheckNearOffAir,
	getRecommendedVendor,

	// SMM SUMMARY DETAIL
	getSMMSiteSummaryDetail,

	// Get Titik ODP Explore Data
	getTitikInternet,
	getDataTableLokasiExplore,

	// AREA POTENSIAL
	getDataKepadatanPenduduk,
	getDataAI,
	getDataBTS,

	//postCheckInput
	postCheckRFIBatch,
	postCheckRFIVendor,
	postCheckJudul,

	//postValidationSites
	postValidationSites,

	//putNotif
	putStatusNotif,

	//smm download excel
	getGeneratedExcel,

	// GET USER PROFILE
	getUserProfile,

	// VENDOR
	postTeknologiVendorBaru,
};

export default API;
