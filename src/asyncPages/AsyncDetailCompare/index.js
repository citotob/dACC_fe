import Loadable from "react-loadable";
import Loading from "../../components/Loading";

const AsyncDetailCompare = Loadable({
  loader: () =>
    import("../../pages/DetailCompare" /* webpackChunkName: "Home" */),
  loading: Loading,
});

export default AsyncDetailCompare;
