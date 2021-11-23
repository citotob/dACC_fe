import Loadable from "react-loadable";
import Loading from "../../components/Loading";

const AsyncMapPolygon = Loadable({
  loader: () => import("../../pages/ModuleMap/MapPolygon" /* webpackChunkName: "MapPolyGon" */),
  loading: Loading
});

export default AsyncMapPolygon;