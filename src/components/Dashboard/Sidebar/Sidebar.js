import React, { useContext } from "react";
import { Link, useHistory } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faList,
  faPlus,
  faShoppingCart,
  faSignOutAlt,
  faStickyNote,
  faUserPlus,
} from "@fortawesome/free-solid-svg-icons";
import "./Sidebar.css";
import { UserContext } from "../../../App";
import { handleSignOut } from "../../Login/loginManager";

const Sidebar = () => {
  const { loggedInUser, setLoggedInUser } = useContext(UserContext);
  let history = useHistory();

  const signOut = () => {
    handleSignOut().then((res) => {
      setLoggedInUser(res);
      history.replace("/");
    });
  };

  return (
    <div className="sidebar-container ">
      <img
        onClick={() => history.push("/")}
        className="w-lg-75 w-100 h-100 mt-4"
        src="https://i.imgur.com/UMV8bTj.png"
        alt=""
      />
      <div style={{ height: "650" }} className="mt-5 pb-sm-5">
        {loggedInUser.isAdmin ? (
          <>
            <Link to="/adminServicesList">
              <FontAwesomeIcon
                title="Services Admin"
                icon={faList}
              ></FontAwesomeIcon>
              &nbsp;&nbsp;
              <span className="d-md-inline-block d-none">Services Admin</span>
            </Link>
            <Link to="/addService">
              <FontAwesomeIcon
                title="Services Admin"
                icon={faPlus}
              ></FontAwesomeIcon>
              &nbsp;&nbsp;
              <span className="d-md-inline-block d-none">AddServices</span>
            </Link>
            <Link to="/makeAdmin">
              <FontAwesomeIcon
                title="MakeAdmin"
                icon={faUserPlus}
              ></FontAwesomeIcon>
              &nbsp;&nbsp;
              <span className="d-md-inline-block d-none">MakeAdmin</span>
            </Link>
          </>
        ) : (
          <>
            <Link to="/order">
              <FontAwesomeIcon
                title="Order"
                icon={faShoppingCart}
              ></FontAwesomeIcon>
              &nbsp;&nbsp;
              <span className="d-md-inline-block d-none">Order</span>
            </Link>
            <br />
            <Link to="/serviceList">
              <FontAwesomeIcon
                title="ServiceList"
                icon={faList}
              ></FontAwesomeIcon>
              &nbsp;&nbsp;
              <span className="d-md-inline-block d-none">ServiceList</span>
            </Link>
            <br />
            <Link to="/addReview">
              <FontAwesomeIcon
                title="Review"
                icon={faStickyNote}
              ></FontAwesomeIcon>
              &nbsp;&nbsp;
              <span className="d-md-inline-block d-none">Review</span>
            </Link>
          </>
        )}

        <div className="my-5"></div>
        <Link
          to=""
          onClick={signOut}
          style={{ color: "red", marginTop: "50px" }}
        >
          <FontAwesomeIcon title="LogOut" icon={faSignOutAlt}></FontAwesomeIcon>
          &nbsp;&nbsp;<span className="d-md-inline-block d-none">LogOut</span>
        </Link>

        <br />
      </div>
    </div>
  );
};

export default Sidebar;
