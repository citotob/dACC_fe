import Loadable from "react-loadable";
import Loading from "../../components/Loading";

const AsyncDetailSurveyStaffAI = Loadable({
  loader: () =>
    import("../../pages/FormPenugasanStaffAI" /* webpackChunkName: "Home" */),
  loading: Loading,
});

export default AsyncDetailSurveyStaffAI;
