import { useEffect, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import axios from "axios";
import Home from "../Pages/Home";
import Login from "../Pages/Login";

export default function ProtectedRoute({ children }) {
  const navigate=useNavigate();
  const token=localStorage.getItem("token");
  return token ?children:<Login/>;
}
