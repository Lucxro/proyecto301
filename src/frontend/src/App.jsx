import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/home";
import Login from "./pages/Login";
import LoginSuccess from "./pages/LoginSuccess";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/LoginSuccess" element={<LoginSuccess />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
