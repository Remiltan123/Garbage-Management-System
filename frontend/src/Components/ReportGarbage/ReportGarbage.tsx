import "./ReportGarbage.css";
import { FaSpinner } from "react-icons/fa";
import { useState } from "react";

type LocationData = {
  latitude: number;
  longitude: number;
  address: string;
};

export function ReportGarbage() {
  const [reporterName, setReporterName] = useState("");
  const [weight, setWeight] = useState("");
  const [collectionDeadline, setCollectionDeadline] = useState("");
  const [additionalDetails, setAdditionalDetails] = useState("");
  const [garbageImage, setGarbageImage] = useState<string | null>(null);
  const [location, setLocation] = useState<LocationData | null>(null);
  const [loadingLocation, setLoadingLocation] = useState(false);
  const [locationError, setLocationError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const toBase64 = (file: File): Promise<string> =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = reject;
    });

  const handleImageUpload = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        // 5MB limit
        alert("Image size should be less than 5MB.");
        return;
      }
      const base64 = await toBase64(file);
      setGarbageImage(base64);
    }
  };

  const getLocation = () => {
    if (!navigator.geolocation) {
      setLocationError("Geolocation is not supported by your browser");
      return;
    }

    setLoadingLocation(true);
    setLocationError("");

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;
        try {
          const response = await fetch(
            `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}&zoom=18&addressdetails=1`
          );
          if (!response.ok) throw new Error("Failed to fetch address");
          const data = await response.json();

          setLocation({
            latitude,
            longitude,
            address:
              data.display_name ||
              `${latitude.toFixed(6)}, ${longitude.toFixed(6)}`,
          });
        } catch (error) {
          console.error("Error fetching address:", error);
          setLocation({
            latitude,
            longitude,
            address: `${latitude.toFixed(6)}, ${longitude.toFixed(6)}`,
          });
        }
        setLoadingLocation(false);
      },
      (error) => {
        setLoadingLocation(false);
        setLocationError(
          `Error getting location: ${error.message}. Please enable location services.`
        );
      },
      { enableHighAccuracy: true, timeout: 10000, maximumAge: 60000 }
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!reporterName.trim() || !weight || !collectionDeadline || !location) {
      alert(
        "Please fill in all required fields (*) and get your location before submitting."
      );
      return;
    }

    if (parseFloat(weight) <= 0) {
      alert("Weight must be greater than 0.");
      return;
    }

    setSubmitting(true);

    // Simulate API call delay
    await new Promise((resolve) => setTimeout(resolve, 1500));

    const reportData = {
      reporterName: reporterName.trim(),
      weight: parseFloat(weight),
      collectionDeadline,
      additionalDetails: additionalDetails.trim(),
      garbageImage,
      location,
      timestamp: new Date().toISOString(),
    };

    console.log("Report Data:", reportData);
    // Here you can add actual API call: await submitGarbageReport(reportData);

    alert(
      "Garbage report submitted successfully! Thank you for helping keep our city clean."
    );

    // Reset form
    setReporterName("");
    setWeight("");
    setCollectionDeadline("");
    setAdditionalDetails("");
    setGarbageImage(null);
    setLocation(null);
    setLocationError("");
    setSubmitting(false);
  };

  return (
    <div className="report-garbage-container">
      <div className="report-header">
        <h2>Report Garbage</h2>
      </div>

      <div className="report-form-wrapper">
        <form className="report-form" onSubmit={handleSubmit}>
          {/* Reporter Name */}
          <div className="form-group">
            <label htmlFor="reporterName">
              Reporter Name <span style={{ color: "#ff6b6b" }}>*</span>
            </label>
            <input
              id="reporterName"
              type="text"
              value={reporterName}
              onChange={(e) => setReporterName(e.target.value)}
              placeholder="Enter your full name"
              required
              aria-required="true"
            />
          </div>

          {/* Garbage Image */}
          <div className="form-group">
            <label htmlFor="garbageImage">Garbage Image (Optional)</label>
            <div className="image-upload-wrapper">
              <input
                id="garbageImage"
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                style={{ display: "none" }}
              />
              <label
                htmlFor="garbageImage"
                className="upload-label"
                role="button"
                tabIndex={0}
              >
                Choose Image
              </label>
              {garbageImage && (
                <div className="image-preview">
                  <img src={garbageImage} alt="Uploaded garbage preview" />
                </div>
              )}
            </div>
          </div>

          {/* Weight */}
          <div className="form-group">
            <label htmlFor="weight">
              Estimated Weight (kg) <span style={{ color: "#ff6b6b" }}>*</span>
            </label>
            <input
              id="weight"
              type="number"
              value={weight}
              onChange={(e) => setWeight(e.target.value)}
              placeholder="e.g., 15.5"
              step="0.1"
              min="0.1"
              required
              aria-required="true"
            />
            <small style={{ color: "#888", fontSize: "12px" }}>
              Provide an accurate estimate for better scheduling
            </small>
          </div>

          {/* Deadline */}
          <div className="form-group">
            <label htmlFor="deadline">
              Preferred Collection Deadline{" "}
              <span style={{ color: "#ff6b6b" }}>*</span>
            </label>
            <input
              id="deadline"
              type="date"
              value={collectionDeadline}
              onChange={(e) => setCollectionDeadline(e.target.value)}
              min={
                new Date(Date.now() + 24 * 60 * 60 * 1000)
                  .toISOString()
                  .split("T")[0]
              } // Min 1 day from now
              required
              aria-required="true"
            />
            <small style={{ color: "#888", fontSize: "12px" }}>
              Select a date at least 24 hours from now
            </small>
          </div>

          {/* Location */}
          <div className="form-group">
            <label>
              Location <span style={{ color: "#ff6b6b" }}>*</span>
            </label>
            <button
              type="button"
              className="get-location-btn"
              onClick={getLocation}
              disabled={loadingLocation}
              aria-disabled={loadingLocation}
            >
              {loadingLocation ? (
                <>
                  <FaSpinner style={{ animation: "spin 1s linear infinite" }} />
                  Getting Location...
                </>
              ) : (
                "Get Current Location"
              )}
            </button>

            {locationError && (
              <div
                className="location-error"
                role="alert"
                aria-live="assertive"
              >
                {locationError}
              </div>
            )}

            {location && (
              <div
                className="location-display"
                role="status"
                aria-live="polite"
              >
                <p>
                  <strong>Latitude:</strong> {location.latitude.toFixed(6)}
                </p>
                <p>
                  <strong>Longitude:</strong> {location.longitude.toFixed(6)}
                </p>
                <p>
                  <strong>Address:</strong> {location.address}
                </p>
              </div>
            )}
          </div>

          {/* Additional Details */}
          <div className="form-group">
            <label htmlFor="details">Additional Details (Optional)</label>
            <textarea
              id="details"
              value={additionalDetails}
              onChange={(e) => setAdditionalDetails(e.target.value)}
              placeholder="e.g., Type of waste (plastic, organic), condition, accessibility issues..."
              rows={4}
              aria-describedby="details-help"
            />
            <small
              id="details-help"
              style={{ color: "#888", fontSize: "12px" }}
            >
              Help us understand the situation better
            </small>
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="submit-btn"
            disabled={submitting}
            aria-disabled={submitting}
          >
            {submitting ? (
              <>
                <FaSpinner style={{ animation: "spin 1s linear infinite" }} />
                Submitting...
              </>
            ) : (
              "Submit Report"
            )}
          </button>
        </form>
      </div>

      <div className="info-box">
        <h3>Reporting Guidelines</h3>
        <ul>
          <li>Provide your full name for follow-up if needed</li>
          <li>Upload a clear, well-lit image of the garbage site</li>
          <li>Estimate weight as accurately as possible</li>
          <li>Choose a realistic deadline (at least 24 hours ahead)</li>
          <li>Ensure location services are enabled and accurate</li>
          <li>Describe waste type, hazards, or special instructions</li>
          <li>Report as soon as possible for faster response</li>
        </ul>
      </div>
    </div>
  );
}
