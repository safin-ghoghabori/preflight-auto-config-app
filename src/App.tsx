import { Rules } from "./features/Rules";
import FrontPage from "./features/front-page";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/" Component={FrontPage}></Route>
        <Route path="/rules/:id" element={<Rules />} />
      </Routes>
    </Router>
  );
}
export default App;