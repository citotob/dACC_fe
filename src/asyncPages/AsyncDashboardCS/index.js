import Loadable from "react-loadable";
import Loading from "../../components/Loading";

const AsyncDashboardCS = Loadable({
  loader: () =>
    import(
      "../../pages/DashboardCS/dashboardCS" /* webpackChunkName: "Home" */
    ),
  loading: Loading,
});

export default AsyncDashboardCS;
