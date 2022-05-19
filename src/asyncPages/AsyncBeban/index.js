import Loadable from "react-loadable";
import Loading from "../../components/Loading";

const AsyncBeban = Loadable({
  loader: () =>
    import("../../pages/Beban/Beban" /* webpackChunkName: "Home" */),
  loading: Loading,
});

export default AsyncBeban;
