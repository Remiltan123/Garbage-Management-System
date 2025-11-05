import { useEffect, useState } from "react";
import { getReportForCollector } from "../../utility/api";
import './ColectorReportRequest.css'

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

  console.log(collectorReports)
  return (
    <div className="collector-container">
      <h2 className="collector-title">Assigned Garbage Reports</h2>

      {loading ? (
        <p>Loading...</p>
      ) : collectorReports.length === 0 ? (
        <p>No reports assigned.</p>
      ) : (
        <div className="reports-wrapper">
          {collectorReports.map((item) => {
            const { report, status, assignedAt, distance, duration, assignmentId } = item;

            return (
              <div className="report-card" key={assignmentId}>
                <h3 className="reporter-name"><strong>Reporter Name:</strong> {report.reporterName}</h3>
                {report.garbageImage && (
                  <img
                    src={`http://localhost:3000/${report.garbageImage.trim()}`}
                    alt="Garbage"
                    className="garbage-image"
                  />
                )}

                <p><strong>Weight:</strong> {report.weight} kg</p>
                <p><strong>Address:</strong> {report.location.address}</p>
                <p><strong>Status:</strong> {status}</p>

                <p className="distance-duration">
                  <strong>Distance:</strong> {(item.distance / 1000).toFixed(2)} Km from {item.nearestPoint} of your trip
                </p>
                <p>
                <strong> Duration:</strong> {Math.round(duration / 60)} mins
                </p>

                <p className="assigned-time">
                  Assigned At: {new Date(assignedAt).toLocaleString()}
                </p>



                <div className="button-group">
                  {status === "assigned" ? (
                    <>
                      <button className="accept-btn">Accept</button>
                      <button className="cancel-btn">Cancel</button>
                    </>
                  ) : status === "accepted" ? (
                    <button className="complete-btn">Complete</button>
                  ) : status === "completed" ? (
                    <p className="completed-text">Task Completed</p>
                  ) : null}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
