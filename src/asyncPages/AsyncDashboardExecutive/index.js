import Loadable from "react-loadable";
import Loading from "../../components/Loading";

const AsyncDashboardStaffSurveyor = Loadable({
  loader: () =>
    import(
      "../../pages/DashboardExecutive/dashboardExecutive" /* webpackChunkName: "Home" */
    ),
  loading: Loading,
});

export default AsyncDashboardStaffSurveyor;
