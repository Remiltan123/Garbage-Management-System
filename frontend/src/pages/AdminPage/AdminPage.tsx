import { useState } from "react";
import "./AdminPage.css";
import { AdminSidebar } from "../../Components/AdminSidebar/AdminSidebar";
import { AdminReports } from "../../Components/AdminReports/AdminReports";
import { AdminCollectors } from "../../Components/AdminCollectors/AdminCollectors";
import { useNavigate } from "react-router-dom";

export function AdminPage() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("reports");

  const handleTabChange = (tab: string) => {
    if (tab === "chat") {
      navigate("/chat");
    } else {
      setActiveTab(tab);
    }
  };

  return (
    <div className="admin-page-wrapper">
      <AdminSidebar activeTab={activeTab} onTabChange={handleTabChange} />
      <div className="admin-content">
        {activeTab === "reports" && <AdminReports />}
        {activeTab === "collectors" && <AdminCollectors />}
      </div>
    </div>
  );
}

export default AdminPage;
