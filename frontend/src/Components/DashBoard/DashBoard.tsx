
import { Sidebar } from "../Sidebar/Sidebar";
import { Outlet } from "react-router-dom";
import './DashBoard.css';

export function DashBoard() {
  return (
    <div className="dash-board">
      <Sidebar />
      <div className="dashboard-content">
        <Outlet />
      </div>
    </div>
  );
}
