import { useContext } from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  useLocation,
} from "react-router-dom";
import Header from "./components/Header.jsx";
import Home from "./pages/Home.jsx";
import Join from "./pages/Join.jsx";
import Login from "./pages/Login.jsx";
import MyPage from "./pages/MyPage.jsx";
import Detail from "./pages/Detail.jsx";
import { AuthContext } from "./context/AuthContext.jsx";

const PrivateRoute = ({ element: Element, ...rest }) => {
  const { isAuthenticated } = useContext(AuthContext);
  return isAuthenticated ? <Element {...rest} /> : <Navigate to="/login" />;
};

const PublicRoute = ({ element: Element, ...rest }) => {
  const { isAuthenticated } = useContext(AuthContext);
  return !isAuthenticated ? <Element {...rest} /> : <Navigate to="/" />;
};

const Layout = ({ children }) => {
  const location = useLocation();
  const showHeaderPaths = ["/", "/mypage"];
  const showHeader =
    showHeaderPaths.includes(location.pathname) ||
    location.pathname.startsWith("/detail/");

  return (
    <>
      {showHeader && <Header />}
      {children}
    </>
  );
};

const Router = () => {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<PrivateRoute element={Home} />} />
          <Route path="/join" element={<PublicRoute element={Join} />} />
          <Route path="/login" element={<PublicRoute element={Login} />} />
          <Route path="/mypage" element={<PrivateRoute element={MyPage} />} />
          <Route path="/detail/:id" element={<Detail />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
};

export default Router;
