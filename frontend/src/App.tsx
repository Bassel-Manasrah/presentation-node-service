import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { HomeScreen } from "./screens/homeScreen";
import { SlideScreen } from "./screens/slideScreen";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomeScreen />} />
        <Route path="/presentation/:title/slides" element={<SlideScreen />} />
      </Routes>
    </Router>
  );
}

export default App;
