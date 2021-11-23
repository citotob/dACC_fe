import Loadable from "react-loadable"
import Loading from "../../components/Loading"

const AsyncForm = Loadable({
    loader:() => import("./../../pages/ModuleForm" /* webpackChunkName: "ModuleForm" */),
    loading:Loading
})

export default AsyncForm