import React from "react";

import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

//Simple bar
import SimpleBar from "simplebar-react";

//i18n
import { withNamespaces } from "react-i18next";
// import SidebarContent from "./SidebarContent";
import SidebarContent from "./SidebarContent";

//action
import { toggleLeftmenu, changeSidebarType } from "../../store/actions";

// STYLES
import style from "../style.module.css";

const Sidebar = (props) => {
  return (
    <React.Fragment>
      <div className={`vertical-menu ${style.bgSideColor}`}>
        <div data-simplebar className="h-100">
          {props.type !== "condensed" ? (
            <SimpleBar style={{ maxHeight: "100%" }}>
              <SidebarContent type={props.type} />
            </SimpleBar>
          ) : (
            <SimpleBar style={{ maxHeight: "50%" }}>
              <SidebarContent type={props.type} />
            </SimpleBar>
          )}
        </div>
      </div>
    </React.Fragment>
  );
};

const mapStatetoProps = (state) => {
  const { layout, layoutType, showRightSidebar, leftMenu, leftSideBarType } =
    state.Layout;
  return { layout, layoutType, showRightSidebar, leftMenu, leftSideBarType };
};
export default connect(mapStatetoProps, { toggleLeftmenu, changeSidebarType })(
  withRouter(withNamespaces()(Sidebar))
);
