import Loadable from "react-loadable";
import Loading from "../../components/Loading";

const AsyncProfile = Loadable({
  loader: () =>
    import("../../pages/Profile/Profile" /* webpackChunkName: "Home" */),
  loading: Loading,
});

export default AsyncProfile;
