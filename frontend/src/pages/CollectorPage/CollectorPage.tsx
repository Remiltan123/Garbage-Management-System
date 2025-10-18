import { useState } from "react";
import "./CollectorPage.css";
import { CollectorSidebar } from "../../Components/CollectorSidebar/CollectorSidebar";
import { CollectorLocations } from "../../Components/CollectorLocations/CollectorLocations";
import { useNavigate } from "react-router-dom";
import { toastSucces } from "../../Model/toast";
import { logout } from "../../utility/api";

const CollectorPage = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("locations");

  const handleTabChange = (tab: string) => {
    if (tab === "Logout") {
      logout();
      navigate("/");
      toastSucces("Logout Successfully");
    } else if (tab === "chat") {
      navigate("/chat");
    }
    setActiveTab(tab);
  };

  return (
    <div className="collector-page-wrapper">
      <CollectorSidebar activeTab={activeTab} onTabChange={handleTabChange} />
      <div className="collector-content">
        {activeTab === "locations" && <CollectorLocations />}
      </div>
    </div>
  );
};

export default CollectorPage;
