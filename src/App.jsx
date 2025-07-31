import { Link, Route, HashRouter as Router, Routes } from "react-router-dom";
import AdminPage from "./pages/AdminPage";
import HomePage from "./pages/HomePage";

function App() {
  return (
    <Router>
      <div className="container mt-3">
        <Link to="/admin" className="btn btn-outline-secondary mb-3">
          Admin Panel
        </Link>

        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/admin" element={<AdminPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
