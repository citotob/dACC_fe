import Loadable from "react-loadable";
import Loading from "../../components/Loading";

const AsyncDetailPlannet = Loadable({
  loader: () =>
    import("../../pages/DetailPlannet" /* webpackChunkName: "Home" */),
  loading: Loading,
});

export default AsyncDetailPlannet;
