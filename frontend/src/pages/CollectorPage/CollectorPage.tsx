import { useState } from "react";
import "./CollectorPage.css";
import { CollectorSidebar } from "../../Components/CollectorSidebar/CollectorSidebar";
import { CollectorLocations } from "../../Components/CollectorLocations/CollectorLocations";
import { useNavigate } from "react-router-dom";
import { toastSucces } from "../../Model/toast";
import { logout } from "../../utility/api";
import { CollecterGetRequest } from '../../Components/ColectorReportRequest/ColectorReportRequest'

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
    } else if(tab === 'Request report'){
      navigate('/Request report')
    }
    setActiveTab(tab);
  };

  return (
    <div className="collector-page-wrapper">
      <CollectorSidebar activeTab={activeTab} onTabChange={handleTabChange} />
      <div className="collector-content">
        {activeTab === "locations" && <CollectorLocations />}
        {activeTab === "Request report" && <CollecterGetRequest/>}
      </div>
    </div>
  );
};

export default CollectorPage;
