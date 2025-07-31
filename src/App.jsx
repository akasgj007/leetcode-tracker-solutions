import {
  Link,
  Route,
  HashRouter as Router,
  Routes,
  useLocation,
} from "react-router-dom";
import AdminPage from "./pages/AdminPage";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";

function App() {
  const location = useLocation();
  return (
    <Router>
      <div className="container mt-3">
        {location.pathname !== "/admin" && (
          <Link to="/login" className="btn btn-outline-secondary mb-3">
            Admin Panel
          </Link>
        )}

        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/admin" element={<AdminPage />} />
          <Route path="/login" element={<LoginPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
