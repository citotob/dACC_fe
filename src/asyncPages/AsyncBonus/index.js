import Loadable from "react-loadable";
import Loading from "../../components/Loading";

const AsyncBonus = Loadable({
  loader: () =>
    import("../../pages/Bonus/Bonus" /* webpackChunkName: "Home" */),
  loading: Loading,
});

export default AsyncBonus;
