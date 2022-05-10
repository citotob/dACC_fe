import Loadable from "react-loadable";
import Loading from "../../components/Loading";

const AsyncReportBeban = Loadable({
  loader: () =>
    import("../../pages/ReportBeban/ReportBeban" /* webpackChunkName: "Home" */),
  loading: Loading,
});

export default AsyncReportBeban;
