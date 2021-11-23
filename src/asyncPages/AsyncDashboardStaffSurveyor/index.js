import Loadable from "react-loadable";
import Loading from "../../components/Loading";

const AsyncDashboardExecutive = Loadable({
  loader: () =>
    import(
      "../../pages/DashboardStaffSurveyor/dashboardStaffSurveyor" /* webpackChunkName: "Home" */
    ),
  loading: Loading,
});

export default AsyncDashboardExecutive;
