import Loadable from "react-loadable";
import Loading from "../../components/Loading";

const AsyncWL = Loadable({
  loader: () =>
    import("../../pages/WL/WL" /* webpackChunkName: "Home" */),
  loading: Loading,
});

export default AsyncWL;
