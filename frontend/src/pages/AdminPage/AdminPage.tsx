import { useState } from "react";
import "./AdminPage.css";
import { AdminSidebar } from "../../Components/AdminSidebar/AdminSidebar";
import { AdminReports } from "../../Components/AdminReports/AdminReports";
import { AdminCollectors } from "../../Components/AdminCollectors/AdminCollectors";

export function AdminPage() {
  const [activeTab, setActiveTab] = useState("reports");

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
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
