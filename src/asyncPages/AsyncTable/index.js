import Loadable from "react-loadable"
import Loading from "../../components/Loading"

const AsyncTable = Loadable({
    loader:() => import("./../../pages/ModuleTable" /* webpackChunkName: "ModuleTable" */),
    loading:Loading
})

export default AsyncTable