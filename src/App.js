import { BrowserRouter as Router, Redirect, Route, Switch } from "react-router-dom";
import React from "react";
import Login from "./pages/Login";
import Register from "./pages/SignUp";
import AdminApp from "./app/Admin";
import StaffAdminApp from "./app/StaffAdmin";
import AdminSurveyorApp from "./app/AdminSurveyor";
import { GlobalProvider } from "./context/GlobalState";
import ExecutiveApp from "./app/Executive";
import Error from "./pages/Error";
import ForgotPassPages from "./pages/ForgotPass";
import resetPasswordPages from "./pages/ResetPass";

const Entry = () => <Redirect to="/app" />;
const NotFound = () => <Error />;

function PublicRoute({ component: Component, ...rest }) {
  const role = window.localStorage.getItem("role"); // comment to disable auth
  const { path } = { ...rest };

  return (
    <Route
      {...rest}
      render={(props) => {
        if (role) {
          return <Redirect to={"/app"} />;
        } else {
          return <Component {...props} />;
        }
      }}
    />
  );
}

function EntryRoute({ component: Component, ...rest }) {
  let role = window.localStorage.getItem("role"); // comment to disable auth
  return (
    <Route
      {...rest}
      render={(props) => {
        let role = window.localStorage.getItem("role");
        if (role) {
          role = role.replace(/\s+/g, "").toString();
          switch (role) {
            case "admin":
              return <AdminApp {...props} />;
              break;
            case "adminsurveyor":
              return <AdminSurveyorApp {...props} />;
              break;
            case "staffadmin":
              return <StaffAdminApp {...props} />;
              break;
            case "executive":
            console.log("executive")
              return <ExecutiveApp {...props} />;
              break;
            default:
            // code block
          }
        } else {
          return (
            <Redirect
              to={{
                pathname: "/login",
                state: { from: props.location },
              }}
            />
          );
        }
      }}
    />
  );
}

function App() {
  return (
    <Router>
      <GlobalProvider>
        <Switch>
          <EntryRoute path="/app" />
          <PublicRoute path="/login" exact component={Login} />
          <PublicRoute path="/register" exact component={Register} />
          <PublicRoute path="/forgotpassword" exact component={ForgotPassPages} />
          <PublicRoute path="/resetpassword/:token" exact component={resetPasswordPages} />
          <Route path="/error" exact component={NotFound} />
          <Route exact path="/" component={Entry} />
          <Redirect to="/error" />
        </Switch>
      </GlobalProvider>
    </Router>
  );
}

export default App;
