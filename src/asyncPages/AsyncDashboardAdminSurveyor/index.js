import Loadable from "react-loadable";
import Loading from "../../components/Loading";

const AsyncDashboardAdminSurveyor = Loadable({
  loader: () =>
    import(
      "../../pages/DashboardAdminSurveyor/dashboardAdminSurveyor" /* webpackChunkName: "Home" */
    ),
  loading: Loading,
});

export default AsyncDashboardAdminSurveyor;
