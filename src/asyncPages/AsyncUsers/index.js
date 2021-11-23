import Loadable from "react-loadable"
import Loading from "../../components/Loading"

const AsyncUsers = Loadable({
    loader:() => import("./../../pages/ModuleUsers" /* webpackChunkName: "ModuleUsers" */),
    loading:Loading
})

export default AsyncUsers