import { LoginPage } from "../LoginPage/LoginPage";
import './HomePage.css';

export function HomePage() {
  return (
    <div className="home-page">
      <div className="home-page-bg"></div>
      <div className="login-container">
        <LoginPage />
      </div>
    </div>
  );
}
