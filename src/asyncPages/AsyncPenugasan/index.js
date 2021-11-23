import Loadable from "react-loadable";
import Loading from "../../components/Loading";

const AsyncPenugasan = Loadable({
  loader: () =>
    import("../../pages/Penugasan/Penugasan" /* webpackChunkName: "Home" */),
  loading: Loading,
});

export default AsyncPenugasan;
