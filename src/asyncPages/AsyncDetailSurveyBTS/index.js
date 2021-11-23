import Loadable from "react-loadable";
import Loading from "../../components/Loading";

const AsyncDetailSurveyBTS = Loadable({
  loader: () =>
    import("../../pages/DetailSurveyBTS" /* webpackChunkName: "Home" */),
  loading: Loading,
});

export default AsyncDetailSurveyBTS;
