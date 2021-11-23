import Loadable from "react-loadable";
import Loading from "../../components/Loading";

const AsyncFAQ = Loadable({
  loader: () => import("./../../pages/FAQ" /* webpackChunkName: "ModuleFAQ" */),
  loading: Loading,
});

export default AsyncFAQ;
