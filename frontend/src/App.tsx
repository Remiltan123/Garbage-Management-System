import { BrowserRouter, Routes, Route } from "react-router-dom";
import { DashBoard } from "./Components/DashBoard/DashBoard";
import { WasteageClassifier } from "./Components/WasteageClassifier/WasteageClassifier";
import { ReportGarbage } from "./Components/ReportGarbage/ReportGarbage";
import { HomePage } from "./pages/HomePage/HomePage";
import AdminPage from "./pages/AdminPage/AdminPage";
import CollectorPage from "./pages/CollectorPage/CollectorPage";
import ProtectedRoute from "./Components/ProtectedRoute/ProtectedRoute";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <>
      <ToastContainer />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route
            path="/admin"
            element={
              <ProtectedRoute allowedRoles={["admin"]}>
                <AdminPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/collector"
            element={
              <ProtectedRoute allowedRoles={["collector"]}>
                <CollectorPage />
              </ProtectedRoute>
            }
          />

          <Route
            path="/reporter"
            element={
              <ProtectedRoute allowedRoles={["reporter"]}>
                <DashBoard />
              </ProtectedRoute>
            }
          >
            <Route path="wastage-classifier" element={<WasteageClassifier />} />
            <Route path="report-garbage" element={<ReportGarbage />} />
            <Route path="profile" element={<div>Profile content here</div>} />
            <Route path="settings" element={<div>settings content here</div>} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
