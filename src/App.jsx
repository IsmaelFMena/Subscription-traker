import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Dashboard from "@/pages/Dashboard";
import AddSubscription from "@/pages/AddSubscription";
import EditSubscription from "@/pages/EditSubscription";
import Login from "@/pages/Login";
import { useAuth } from "@/context/AuthContext";

function App() {
  const { user } = useAuth(); // Sabemos si hay usuario o no

  // Si NO hay usuario logueado, forzamos a que solo vea el Login
  if (!user) {
    return (
      <BrowserRouter>
        <Routes>
          <Route path="*" element={<Login />} />
        </Routes>
      </BrowserRouter>
    );
  }

  // Si SÍ hay usuario, ve la app normal
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/add" element={<AddSubscription />} />
        <Route path="/edit/:id" element={<EditSubscription />} />
        {/* Redirigir cualquier otra ruta al Dashboard */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
