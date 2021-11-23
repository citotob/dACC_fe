import Loadable from "react-loadable";
import Loading from "../../components/Loading";

const AsyncGnettack = Loadable({
  loader: () =>
    import("../../pages/Gnettrack/Gnettrack" /* webpackChunkName: "Home" */),
  loading: Loading,
});

export default AsyncGnettack;
