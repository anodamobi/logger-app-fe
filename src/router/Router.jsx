import { Route, Routes } from "react-router-dom";
import Environment from "../pages/Environment";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Project from "../pages/Project";
import ProtectedRoute from "./ProtectedRoute";

const Router = () => {
  return (
    <Routes>
      <Route path="/login" element={<Login />}></Route>
      <Route path="/" element={<ProtectedRoute />}>
        <Route path="/" element={<Home />} />
      </Route>
      <Route path="/projects/:projectName" element={<ProtectedRoute />}>
        <Route path="/projects/:projectName" element={<Environment />} />
      </Route>
      <Route path="/projects/:projectName/:env" element={<ProtectedRoute />}>
        <Route path="/projects/:projectName/:env" element={<Project />} />
      </Route>
    </Routes>
  );
};

export default Router;
