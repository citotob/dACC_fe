import Loadable from "react-loadable";
import Loading from "../../components/Loading";

const AsyncDetailIssue = Loadable({
  loader: () =>
    import("../../pages/DetailIssue" /* webpackChunkName: "Home" */),
  loading: Loading,
});

export default AsyncDetailIssue;
