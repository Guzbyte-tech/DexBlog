import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import Header from "./components/Header/Header.jsx";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import BlogDetail from "./components/Blog/BlogDetail.jsx";
import CreateNews from "./pages/CreateNews/CreateNews.jsx";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import "./connection.js";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ToastContainer />
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/blog" element={<App />} />
        <Route path="/blog/:id" element={<BlogDetail />} />
        <Route path="/create-news" element={<CreateNews />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>
);
