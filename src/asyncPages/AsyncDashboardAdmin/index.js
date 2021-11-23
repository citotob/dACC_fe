import Loadable from "react-loadable";
import Loading from "../../components/Loading";

const AsyncDashboardAdmin = Loadable({
  loader: () =>
    import(
      "../../pages/DashboardAdmin/dashboardAdmin.js" /* webpackChunkName: "Home" */
    ),
  loading: Loading,
});

export default AsyncDashboardAdmin;
