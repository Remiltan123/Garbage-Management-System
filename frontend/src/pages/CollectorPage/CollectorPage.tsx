import { useState } from "react";
import "./CollectorPage.css";
import { CollectorSidebar } from "../../Components/CollectorSidebar/CollectorSidebar";
import { CollectorLocations } from "../../Components/CollectorLocations/CollectorLocations";

const CollectorPage = () => {
  const [activeTab, setActiveTab] = useState("locations");

  const handleTabChange = (tab: string) => {
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
