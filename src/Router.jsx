import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login.jsx";
import Join from "./pages/Join.jsx";
import Home from "./pages/Home.jsx";
import Detail from "./pages/Detail.jsx";

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/join" element={<Join />} />
        <Route path="/" element={<Home />} />
        <Route path="/detail/:id" element={<Detail />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
