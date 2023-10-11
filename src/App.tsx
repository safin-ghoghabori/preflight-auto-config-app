import { Rules } from "./features/Rules";
import FrontPage from "./features/front-page";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/preflight-auto-config-app" Component={FrontPage}></Route>
        <Route
          path="/preflight-auto-config-app/rules/:id"
          element={<Rules />}
        />
      </Routes>
    </Router>
  );
}
export default App;
