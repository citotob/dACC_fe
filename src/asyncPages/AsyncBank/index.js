import Loadable from "react-loadable";
import Loading from "../../components/Loading";

const AsyncBank = Loadable({
  loader: () =>
    import("../../pages/Bank/Bank" /* webpackChunkName: "Home" */),
  loading: Loading,
});

export default AsyncBank;
