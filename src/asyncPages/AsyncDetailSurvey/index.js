import Loadable from "react-loadable";
import Loading from "../../components/Loading";

const AsyncDetailSurvey = Loadable({
  loader: () =>
    import("../../pages/DetailSurvey" /* webpackChunkName: "Home" */),
  loading: Loading,
});

export default AsyncDetailSurvey;
