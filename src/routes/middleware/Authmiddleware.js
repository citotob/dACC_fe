import React from "react";
import { Route, withRouter, Redirect } from "react-router-dom";
import AppAdmin from "../../App/Admin";
import AppVendor from "../../App/Vendor";
import AppExecutive from "../../App/Executive";
import AppSurveyor from "../../App/Surveyor";
import AppStaffSurveyor from "../../App/StaffSurveyor";

const Authmiddleware = ({ component: Component, layout: Layout }) => (
  <Route
    render={(props) => {
      // here you can apply condition
      let role = window.localStorage.getItem("roleName");
      console.log("Current role : ", role);
      if (!role) {
        if (props.location.pathname !== "/login") {
          return (
            <Redirect
              to={{ pathname: "/login", state: { from: props.location } }}
            />
          );
        } else {
          return <Component {...props} />;
        }
      } else {
        if (role) {
          switch (role) {
            case "admin":
              return (
                <Layout>
                  <AppAdmin {...props} />
                </Layout>
              );
            case "adminsurveyor":
              return (
                <Layout>
                  <AppSurveyor {...props} />
                </Layout>
              );
            case "staffsurveyor":
              return (
                <Layout>
                  <AppStaffSurveyor {...props} />
                </Layout>
              );
            case "Penyedia":
              return (
                <Layout>
                  <AppVendor {...props} />
                </Layout>
              );
            case "executive":
              return (
                <Layout>
                  <AppExecutive {...props} />
                </Layout>
              );
            default:
              break;
          }
        }
      }
    }}
  />
);

export default withRouter(Authmiddleware);
