import { useEffect, useState } from "react";
import { getReportForCollector } from "../../utility/api";

export const CollecterGetRequest = () => {
  const [collectorReports, setCollectorReports] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchReports = async () => {  
      try {
        const collector_id = localStorage.getItem("collecter_id");
        if (!collector_id) {
          console.log("No collector ID found in localStorage");
          setLoading(false);
          return;
        }

        const response = await getReportForCollector(collector_id);
        if (response?.success) {
          setCollectorReports(response.report_data);
        } else {
          console.log(response?.message || "No reports found");
        }
      } catch (error) {
        console.error("Error fetching collector reports:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchReports();
  }, []);

  console.log("reports:", collectorReports);

  return (
    <div style={{ padding: "20px" }}>
      <h2>Collector Assigned Reports</h2>

      {loading ? (
        <p>Loading...</p>
      ) : collectorReports.length === 0 ? (
        <p>No reports assigned.</p>
      ) : (
        <ul>
          {collectorReports.map((report, index) => (
            <li key={index}>{report.reportName || "Unnamed Report"}</li>
          ))}
        </ul>
      )}
    </div>
  );
};
