

import { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup, Polyline } from "react-leaflet";
import { getReportForCollector } from "../../utility/api";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import "./CollectorLocations.css";

// Fix default marker issue
delete (L.Icon.Default.prototype as unknown as { _getIconUrl?: unknown })._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png",
  iconUrl:
    "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-red.png",
  shadowUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
});

export function CollectorLocations() {
  const [reports, setReports] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [userPosition, setUserPosition] = useState<[number, number] | null>(null);
  const [selectedRoute, setSelectedRoute] = useState<[number, number][]>([]);

  useEffect(() => {
    const fetchReports = async () => {
      try {
        const collectorId: string = localStorage.getItem("collecter_id") as string;
        const response = await getReportForCollector(collectorId);

        if (response.success) {
          setReports(response.report_data);
        } else {
          setError("Failed to fetch reports");
        }
      } catch (err) {
        setError("Error fetching garbage reports");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchReports();
  }, []);

  useEffect(() => {
    if (navigator.geolocation) {
      const watchId = navigator.geolocation.watchPosition(
        (position) => { 
          setUserPosition([position.coords.latitude, position.coords.longitude]);
        },
        (error) => console.error("Geolocation error:", error),
        { enableHighAccuracy: true, timeout: 5000, maximumAge: 0 }
      );
      return () => navigator.geolocation.clearWatch(watchId);
    } else {
      console.log("Geolocation not supported");
    }
  }, []);

  if (loading) return <div className="collector-locations-loading">Loading garbage locations...</div>;
  if (error) return <div className="collector-locations-error">Error: {error}</div>;

  const defaultCenter: [number, number] =
    reports.length > 0
      ? [reports[0].report.location.latitude, reports[0].report.location.longitude]
      : [6.9271, 79.8612]; // Colombo fallback

  const userIcon = new L.Icon({
    iconUrl:
      "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-blue.png",
    shadowUrl:
      "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41],
  });

  return (
    <div className="collector-locations">
      <h2>Garbage Collection Locations</h2>
      <div className="map-container">
        <MapContainer center={defaultCenter} zoom={13} style={{ height: "600px", width: "100%" }}>
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; OpenStreetMap contributors'
          />

          {reports.map((item) => {
            const r = item.report;
            return (
              <Marker
                key={r._id}
                position={[r.location.latitude, r.location.longitude]}
                eventHandlers={{
                  click: () => {
                    if (userPosition) {
                      setSelectedRoute([
                        userPosition,
                        [r.location.latitude, r.location.longitude],
                      ]);
                    }
                  },
                }}
              >
                <Popup>
                  <div className="popup-content">
                    <h3>Reporter: {r.reporterName}</h3>
                    <p><strong>Address:</strong> {r.location.address}</p>
                    <p><strong>Weight:</strong> {r.weight} kg</p>
                    <p><strong>Status:</strong> {r.status}</p>
                    <p><strong>Deadline:</strong> {new Date(r.collectionDeadline).toLocaleDateString()}</p>
                    <p><strong>Details:</strong> {r.additionalDetails}</p>
                    <p><strong>Points:</strong> {r.points}</p>
                    <p><strong>Distance:</strong> {(item.distance / 1000).toFixed(2)} Km from {item.nearestPoint} of your trip</p>
                    <p><strong>Duration:</strong> {Math.round(item.duration / 60)} mins</p>
                  </div>
                </Popup>
              </Marker>
            );
          })}

          {userPosition && (
            <Marker position={userPosition} icon={userIcon}>
              <Popup>You are here</Popup>
            </Marker>
          )}

          {selectedRoute.length > 0 && <Polyline positions={selectedRoute} />}
        </MapContainer>
      </div>
    </div>
  );
}
