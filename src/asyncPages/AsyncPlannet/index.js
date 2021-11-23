import Loadable from "react-loadable";
import Loading from "../../components/Loading";

const AsyncPlannet = Loadable({
  loader: () =>
    import("../../pages/Plannet/Plannet" /* webpackChunkName: "Home" */),
  loading: Loading,
});

export default AsyncPlannet;
