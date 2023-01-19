import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import TeamList from "./pages/team/team-list";
import UserList from "./pages/user/user-list";
import "./App.css";
import UserDetail from "./pages/user/user-detail";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route key="teams-route" path="/teams" element={<TeamList />} />
          <Route
            key="team-users-route"
            path="teams/:teamId/users"
            element={<UserList />}
          />
        </Routes>
        <Routes>
          <Route key="user-route" path="/users/:userId" element={<UserDetail />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
