import Loadable from "react-loadable";
import Loading from "../../components/Loading";

const AsyncDetailGNetForm = Loadable({
  loader: () =>
    import("../../pages/DetailGNetForm" /* webpackChunkName: "Home" */),
  loading: Loading,
});

export default AsyncDetailGNetForm;
