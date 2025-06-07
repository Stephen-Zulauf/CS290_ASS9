import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navigation from "./components/Navigation";
import HomePage from "./pages/HomePage.jsx";
import CreatePage from "./pages/Create.jsx";
import EditPage from "./pages/Edit.jsx";
import { useState } from "react";

function App() {
  const [item, editItem] = useState();
  return (
    <div className="app">
      <Router>
        <Navigation />
        <Routes>
          <Route path="/" element={<HomePage editItem={editItem} />}></Route>
          <Route path="/Create" element={<CreatePage />}></Route>
          <Route path="/Edit" element={<EditPage item={item} />}></Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
