import Loadable from "react-loadable";
import Loading from "../../components/Loading";

const AsyncAccBank = Loadable({
  loader: () =>
    import("../../pages/AccBank/AccBank" /* webpackChunkName: "Home" */),
  loading: Loading,
});

export default AsyncAccBank;
