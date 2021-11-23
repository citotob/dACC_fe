import Loadable from "react-loadable"
import Loading from "../../components/Loading"

const AsyncNotif = Loadable({
    loader:() => import("./../../pages/ModuleNotif" /* webpackChunkName: "ModuleNotif" */),
    loading:Loading
})

export default AsyncNotif