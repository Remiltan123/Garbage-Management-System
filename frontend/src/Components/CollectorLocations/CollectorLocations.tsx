import { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { getCollectorGarbageReports } from "../../utility/api";
import { GarbageReport } from "../../Model/model";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import "./CollectorLocations.css";

// Fix for default markers in react-leaflet
delete (L.Icon.Default.prototype as unknown as { _getIconUrl?: unknown })
  ._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png",
  iconUrl:
    "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-red.png",
  shadowUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
});

export function CollectorLocations() {
  const [reports, setReports] = useState<GarbageReport[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [userPosition, setUserPosition] = useState<[number, number] | null>(
    null
  );

  useEffect(() => {
    const fetchReports = async () => {
      try {
        const collectorId = "68ef765253e2a08a96e88aa7";
        const response = await getCollectorGarbageReports(collectorId);
        if (response.success) {
          setReports(response.data);
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
          setUserPosition([
            position.coords.latitude,
            position.coords.longitude,
          ]);
        },
        (error) => {
          console.error("Geolocation error:", error);
        },
        { enableHighAccuracy: true, timeout: 5000, maximumAge: 0 }
      );
      return () => {
        navigator.geolocation.clearWatch(watchId);
      };
    } else {
      console.log("Geolocation not supported");
    }
  }, []);

  if (loading) {
    return (
      <div className="collector-locations-loading">
        Loading garbage locations...
      </div>
    );
  }

  if (error) {
    return <div className="collector-locations-error">Error: {error}</div>;
  }

  // Default center (can be adjusted based on locations)
  const defaultCenter: [number, number] =
    reports.length > 0
      ? [reports[0].location.latitude, reports[0].location.longitude]
      : [6.9271, 79.8612]; // Colombo coordinates as fallback

  // Custom icon for user location
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
        <MapContainer
          center={defaultCenter}
          zoom={13}
          style={{ height: "600px", width: "100%" }}
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          />
          {reports.map((report) => (
            <Marker
              key={report._id}
              position={[report.location.latitude, report.location.longitude]}
            >
              <Popup>
                <div className="popup-content">
                  <h3>Reporter: {report.reporterName}</h3>
                  <p>
                    <strong>Address:</strong> {report.location.address}
                  </p>
                  <p>
                    <strong>Weight:</strong> {report.weight} kg
                  </p>
                  <p>
                    <strong>Status:</strong> {report.status}
                  </p>
                  <p>
                    <strong>Deadline:</strong>{" "}
                    {new Date(report.collectionDeadline).toLocaleDateString()}
                  </p>
                  <p>
                    <strong>Details:</strong> {report.additionalDetails}
                  </p>
                  <p>
                    <strong>Points:</strong> {report.points}
                  </p>
                </div>
              </Popup>
            </Marker>
          ))}
          {userPosition && (
            <Marker position={userPosition} icon={userIcon}>
              <Popup>You are here</Popup>
            </Marker>
          )}
        </MapContainer>
      </div>
    </div>
  );
}
