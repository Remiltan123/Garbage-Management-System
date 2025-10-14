import { useState, useEffect } from "react";
import "./AdminCollectors.css";
import {
  FaUsers,
  FaSearch,
  FaEnvelope,
  FaPhone,
  FaMapMarkerAlt,
  FaTimes,
  FaCheckCircle,
  FaTasks,
} from "react-icons/fa";

interface Collector {
  _id: string;
  name: string;
  email: string;
  phone?: string;
  address?: string;
  role: string;
  activeReports?: number;
  completedReports?: number;
  totalReports?: number;
  createdAt: string;
}

export function AdminCollectors() {
  const [collectors, setCollectors] = useState<Collector[]>([]);
  const [filteredCollectors, setFilteredCollectors] = useState<Collector[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCollector, setSelectedCollector] = useState<Collector | null>(
    null
  );
  const [showModal, setShowModal] = useState(false);

  // Fetch collectors from backend
  const fetchCollectors = async () => {
    setLoading(true);
    setError(null);
    try {
      // Updated endpoint to match backend route
      const response = await fetch(
        "http://localhost:3000/api/admin/collectors"
      );
      if (!response.ok) {
        throw new Error("Failed to fetch collectors");
      }
      const data = await response.json();
      setCollectors(data.data || []);
      setFilteredCollectors(data.data || []);
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
      console.error("Error fetching collectors:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCollectors();
  }, []);

  // Filter collectors based on search query
  useEffect(() => {
    if (searchQuery.trim() === "") {
      setFilteredCollectors(collectors);
    } else {
      const filtered = collectors.filter(
        (collector) =>
          collector.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          collector.email.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredCollectors(filtered);
    }
  }, [searchQuery, collectors]);

  const handleViewDetails = (collector: Collector) => {
    setSelectedCollector(collector);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedCollector(null);
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  return (
    <div className="admin-collectors-container">
      <div className="admin-collectors-header">
        <div className="admin-collectors-header-content">
          <FaUsers className="admin-collectors-header-icon" />
          <h2>Collectors Management</h2>
        </div>
        <p className="admin-collectors-subtitle">
          View and manage all garbage collectors
        </p>
      </div>

      {/* Search Bar */}
      <div className="search-section">
        <div className="search-bar">
          <FaSearch className="search-icon" />
          <input
            type="text"
            placeholder="Search collectors by name or email..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="search-input"
          />
          {searchQuery && (
            <button
              className="clear-search-btn"
              onClick={() => setSearchQuery("")}
              title="Clear search"
            >
              <FaTimes />
            </button>
          )}
        </div>
        <div className="search-results-info">
          <span>
            Showing {filteredCollectors.length} of {collectors.length}{" "}
            collectors
          </span>
        </div>
      </div>

      {/* Loading State */}
      {loading && (
        <div className="loading-container">
          <div className="spinner"></div>
          <p>Loading collectors...</p>
        </div>
      )}

      {/* Error State */}
      {error && (
        <div className="error-container">
          <FaTimes className="error-icon" />
          <p>Error: {error}</p>
          <button onClick={fetchCollectors} className="retry-btn">
            Retry
          </button>
        </div>
      )}

      {/* Collectors Grid */}
      {!loading && !error && filteredCollectors.length > 0 && (
        <div className="collectors-grid">
          {filteredCollectors.map((collector) => (
            <div key={collector._id} className="collector-card">
              <div className="collector-card-header">
                <div className="collector-avatar">
                  <FaUsers />
                </div>
                <div className="collector-name-section">
                  <h3 className="collector-name">{collector.name}</h3>
                  <span className="collector-role">{collector.role}</span>
                </div>
              </div>

              <div className="collector-card-body">
                <div className="collector-info-row">
                  <FaEnvelope className="info-icon" />
                  <span className="info-value">{collector.email}</span>
                </div>

                {collector.phone && (
                  <div className="collector-info-row">
                    <FaPhone className="info-icon" />
                    <span className="info-value">{collector.phone}</span>
                  </div>
                )}

                {collector.address && (
                  <div className="collector-info-row">
                    <FaMapMarkerAlt className="info-icon" />
                    <span className="info-value">{collector.address}</span>
                  </div>
                )}

                <div className="collector-stats">
                  <div className="stat-item">
                    <FaTasks className="stat-icon active" />
                    <div className="stat-content">
                      <span className="stat-value">
                        {collector.activeReports || 0}
                      </span>
                      <span className="stat-label">Active</span>
                    </div>
                  </div>
                  <div className="stat-item">
                    <FaCheckCircle className="stat-icon completed" />
                    <div className="stat-content">
                      <span className="stat-value">
                        {collector.completedReports || 0}
                      </span>
                      <span className="stat-label">Completed</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="collector-card-footer">
                <button
                  className="view-collector-btn"
                  onClick={() => handleViewDetails(collector)}
                >
                  View Details
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Empty State */}
      {!loading && !error && filteredCollectors.length === 0 && (
        <div className="empty-state">
          <FaUsers className="empty-icon" />
          <h3>No Collectors Found</h3>
          <p>
            {searchQuery
              ? `No collectors match "${searchQuery}"`
              : "There are no collectors in the system."}
          </p>
          {searchQuery && (
            <button
              onClick={() => setSearchQuery("")}
              className="clear-filter-btn"
            >
              Clear Search
            </button>
          )}
        </div>
      )}

      {/* Modal for Collector Details */}
      {showModal && selectedCollector && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3>Collector Details</h3>
              <button className="modal-close-btn" onClick={closeModal}>
                <FaTimes />
              </button>
            </div>

            <div className="modal-body">
              <div className="modal-collector-profile">
                <div className="modal-collector-avatar">
                  <FaUsers />
                </div>
                <div className="modal-collector-info">
                  <h2>{selectedCollector.name}</h2>
                  <span className="modal-collector-role">
                    {selectedCollector.role}
                  </span>
                </div>
              </div>

              <div className="modal-section">
                <h4>Contact Information</h4>
                <div className="modal-info-grid">
                  <div className="modal-info-item">
                    <span className="modal-label">Email:</span>
                    <span className="modal-value">
                      {selectedCollector.email}
                    </span>
                  </div>
                  {selectedCollector.phone && (
                    <div className="modal-info-item">
                      <span className="modal-label">Phone:</span>
                      <span className="modal-value">
                        {selectedCollector.phone}
                      </span>
                    </div>
                  )}
                  {selectedCollector.address && (
                    <div className="modal-info-item">
                      <span className="modal-label">Address:</span>
                      <span className="modal-value">
                        {selectedCollector.address}
                      </span>
                    </div>
                  )}
                  <div className="modal-info-item">
                    <span className="modal-label">Member Since:</span>
                    <span className="modal-value">
                      {formatDate(selectedCollector.createdAt)}
                    </span>
                  </div>
                </div>
              </div>

              <div className="modal-section">
                <h4>Performance Statistics</h4>
                <div className="modal-stats-grid">
                  <div className="modal-stat-card">
                    <FaTasks className="modal-stat-icon active" />
                    <div className="modal-stat-info">
                      <span className="modal-stat-value">
                        {selectedCollector.activeReports || 0}
                      </span>
                      <span className="modal-stat-label">Active Reports</span>
                    </div>
                  </div>
                  <div className="modal-stat-card">
                    <FaCheckCircle className="modal-stat-icon completed" />
                    <div className="modal-stat-info">
                      <span className="modal-stat-value">
                        {selectedCollector.completedReports || 0}
                      </span>
                      <span className="modal-stat-label">
                        Completed Reports
                      </span>
                    </div>
                  </div>
                  <div className="modal-stat-card">
                    <FaTasks className="modal-stat-icon total" />
                    <div className="modal-stat-info">
                      <span className="modal-stat-value">
                        {selectedCollector.totalReports || 0}
                      </span>
                      <span className="modal-stat-label">Total Reports</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="modal-footer">
              <button
                className="modal-btn close-modal-btn"
                onClick={closeModal}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default AdminCollectors;
