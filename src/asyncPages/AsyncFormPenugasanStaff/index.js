import Loadable from "react-loadable";
import Loading from "../../components/Loading";

const AsyncDetailSurveyStaff = Loadable({
  loader: () =>
    import("../../pages/FormPenugasanStaff" /* webpackChunkName: "Home" */),
  loading: Loading,
});

export default AsyncDetailSurveyStaff;
