import GlobalStyle from "./GlobalStyle";
import Router from "./Router";
import { AuthProvider } from "./context/AuthContext";

function App() {
  return (
    <>
      <AuthProvider>
        <GlobalStyle />
        <Router />
      </AuthProvider>
    </>
  );
}

export default App;
