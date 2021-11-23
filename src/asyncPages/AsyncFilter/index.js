import Loadable from "react-loadable"
import Loading from "../../components/Loading"

const AsyncFilter = Loadable({
    loader:() => import("./../../pages/ModuleFilter" /* webpackChunkName: "ModuleFilter" */),
    loading:Loading
})

export default AsyncFilter