import Loadable from "react-loadable";
import Loading from "../../components/Loading";

const AsyncDetailGNet = Loadable({
  loader: () => import("../../pages/DetailGNet" /* webpackChunkName: "Home" */),
  loading: Loading,
});

export default AsyncDetailGNet;
