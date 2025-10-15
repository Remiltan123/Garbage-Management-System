import { NavLink } from "react-router-dom";
import "./Sidebar.css";
import awarenessImage from "../../assets/images/awareness_of_waste_recycling.png";
import { FaRecycle, FaSignOutAlt, FaUserAlt, FaTrash } from "react-icons/fa";
import { toastSucces } from "../../Model/toast";

export function Sidebar() {
  return (
    <div className="sidebar">
      <div className="sidebar-img">
        <img src={awarenessImage} alt="awarenessImage" />
      </div>
      <nav>
        <ul>
          <li>
            <NavLink
              to="wastage-classifier"
              className={({ isActive }) => (isActive ? "active-link" : "")}
            >
              <FaRecycle /> <span>Wastage Classifier</span>
            </NavLink>
          </li>
          <li>
            <NavLink
              to="report-garbage"
              className={({ isActive }) => (isActive ? "active-link" : "")}
            >
              <FaTrash /> <span>Report Garbage</span>
            </NavLink>
          </li>
          <li>
            <NavLink
              to="profile"
              className={({ isActive }) => (isActive ? "active-link" : "")}
            >
              <FaUserAlt /> <span>Profile</span>
            </NavLink>
          </li>
          <li onClick={ () => toastSucces("Logout Successfully")}>
            <NavLink
              to="/"
              className={({ isActive }) => (isActive ? "active-link" : "")}
            >
              <FaSignOutAlt /> <span>Logout</span>
            </NavLink>
          </li>
        </ul>
      </nav>
    </div>
  );
}
