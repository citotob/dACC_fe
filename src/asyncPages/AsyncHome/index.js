import Loadable from "react-loadable";
import Loading from "../../components/Loading";

const AsyncHomePage = Loadable({
  loader: () => import("../../pages/Utility/pages-404" /* webpackChunkName: "Home" */),
  loading: Loading
});

export default AsyncHomePage;