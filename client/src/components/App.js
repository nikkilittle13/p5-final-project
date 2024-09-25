import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NavBar from "./NavBar";
import Home from "../pages/Home";
import Recipes from "../pages/Recipes"
import NewRecipe from "../pages/NewRecipe";
import EditRecipe from "../pages/EditRecipe";
import Profile from "../pages/Profile";
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <Router>
      <NavBar />
      <Routes>
        <Route
        path="/home"
        element={<Home />}
        />
        <Route
          path="/recipes"
          element={
            <Recipes
            />}
        />
        <Route
          path="/newrecipe"
          element={
            <NewRecipe
            />}
        />
        <Route
          path="/editrecipe"
          element={
            <EditRecipe
            />}
        />
        <Route 
        path="/profile"
        element={
          <Profile
          />}
          />
      </Routes>
    </Router>
  )
}

export default App;