import Loadable from "react-loadable";
import Loading from "../../components/Loading";

const AsyncSurveyCluser = Loadable({
  loader: () =>
    import("../../pages/SurveyCluster" /* webpackChunkName: "Home" */),
  loading: Loading,
});

export default AsyncSurveyCluser;
