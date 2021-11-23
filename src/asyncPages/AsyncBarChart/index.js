import Loadable from "react-loadable";
import Loading from "../../components/Loading";

const AsyncBarChart = Loadable({
  loader: () => import("../../pages/ModuleGraphic/ChartJS/BarChart" /* webpackChunkName: "BarChart" */),
  loading: Loading
});

export default AsyncBarChart;