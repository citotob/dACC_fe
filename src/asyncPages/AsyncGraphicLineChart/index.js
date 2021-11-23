import Loadable from "react-loadable";
import Loading from "../../components/Loading";

const AsyncGraphicLineChart = Loadable({
  loader: () => import("../../pages/ModuleGraphic/ChartJS/LineChart" /* webpackChunkName: "LineChart" */),
  loading: Loading
});

export default AsyncGraphicLineChart;