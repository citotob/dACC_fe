import Loadable from "react-loadable";
import Loading from "../../components/Loading";

const AsyncDeposit = Loadable({
  loader: () =>
    import("../../pages/Deposit/Deposit" /* webpackChunkName: "Home" */),
  loading: Loading,
});

export default AsyncDeposit;
