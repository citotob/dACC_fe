import Loadable from "react-loadable";
import Loading from "../../components/Loading";

const AsyncReportTransaksi = Loadable({
  loader: () =>
    import("../../pages/ReportTransaksi/ReportTransaksi" /* webpackChunkName: "Home" */),
  loading: Loading,
});

export default AsyncReportTransaksi;
