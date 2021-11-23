import Loadable from "react-loadable";
import Loading from "../../components/Loading";

const AsyncHasilSurvey = Loadable({
  loader: () =>
    import(
      "../../pages/HasilSurvey/HasilSurvey" /* webpackChunkName: "Home" */
    ),
  loading: Loading,
});

export default AsyncHasilSurvey;
