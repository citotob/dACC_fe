
import Loadable from "react-loadable"
import Loading from "../../components/Loading"

const AsyncGraphicPieChart = Loadable({
    loader: () => import("../../pages/ModuleGraphic/ChartJS/PieChart" /* webpackChunkName: "PieChart" */),
    loading:Loading
})

export default AsyncGraphicPieChart