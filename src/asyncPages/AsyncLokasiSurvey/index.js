import Loadable from "react-loadable";
import Loading from "../../components/Loading";

const AsyncLokasiSurvey = Loadable({
  loader: () =>
    import(
      "../../pages/LokasiSurvey/LokasiSurvey" /* webpackChunkName: "Home" */
    ),
  loading: Loading,
});

export default AsyncLokasiSurvey;
