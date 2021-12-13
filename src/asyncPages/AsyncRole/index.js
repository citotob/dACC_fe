import Loadable from "react-loadable";
import Loading from "../../components/Loading";

const AsyncPengguna = Loadable({
  loader: () =>
    import("../../pages/Role/Role" /* webpackChunkName: "Home" */),
  loading: Loading,
});

export default AsyncPengguna;
