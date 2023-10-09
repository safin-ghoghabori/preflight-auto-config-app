import React from "react";
import { Rules } from "./features/Rules";
import FrontPage from "./features/front-page";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<FrontPage />}></Route>
        <Route path="/rules/:id" element={<Rules />} />
      </Routes>
    </Router>
  );
}

export default App;
