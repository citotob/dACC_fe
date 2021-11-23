import Loadable from "react-loadable";
import Loading from "../../components/Loading";

const AsyncNotificationPage = Loadable({
  loader: () =>
    import(
      "../../pages/NotificationPage/NotificationPage" /* webpackChunkName: "Home" */
    ),
  loading: Loading,
});

export default AsyncNotificationPage;
