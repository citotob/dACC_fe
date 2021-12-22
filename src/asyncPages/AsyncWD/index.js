import Loadable from "react-loadable";
import Loading from "../../components/Loading";

const AsyncWD = Loadable({
  loader: () =>
    import("../../pages/WD/WD" /* webpackChunkName: "Home" */),
  loading: Loading,
});

export default AsyncWD;
