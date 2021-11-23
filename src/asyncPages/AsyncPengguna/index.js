import Loadable from "react-loadable";
import Loading from "../../components/Loading";

const AsyncPengguna = Loadable({
  loader: () =>
    import("../../pages/Pengguna/Pengguna" /* webpackChunkName: "Home" */),
  loading: Loading,
});

export default AsyncPengguna;
