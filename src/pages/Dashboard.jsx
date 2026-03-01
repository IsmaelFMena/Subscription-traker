import { useNavigate } from "react-router-dom";
import SubscriptionCard from "@/components/ui/SubscriptionCard";
import { Plus, Loader2, LogOut } from "lucide-react"; // <-- Importamos LogOut aquí
import { useSubscriptions } from "@/hooks/useSubscriptions";
import { useAuth } from "@/context/AuthContext"; // <-- Importamos el contexto

const Dashboard = () => {
  const navigate = useNavigate();
  const { subscriptions, loading, error, deleteSubscription } =
    useSubscriptions();
  const { logout } = useAuth(); // <-- Traemos la función de logout

  // Cálculo del total mensual
  const totalMonthly = subscriptions.reduce((acc, sub) => acc + sub.price, 0);

  // Pantalla de carga
  if (loading)
    return (
      <div className="min-h-screen flex items-center justify-center bg-base">
        <Loader2 className="w-10 h-10 animate-spin text-mauve" />
      </div>
    );

  return (
    <div className="min-h-screen bg-base p-8 relative">
      <div className="max-w-md mx-auto pb-20">
        {/* Cabecera con botón de logout */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-text">
            Mis Suscripciones
          </h1>
          <button
            onClick={logout}
            className="text-subtext1 hover:text-red flex items-center gap-1 text-sm transition-colors"
          >
            <LogOut size={16} /> Salir
          </button>
        </div>

        {/* Tarjeta de Resumen Total */}
        <div className="mb-6 bg-mauve text-base p-6 rounded-2xl shadow-lg">
          <p className="text-sm opacity-80">Gasto Mensual Total</p>
          <p className="text-4xl font-bold mt-1">${totalMonthly.toFixed(2)}</p>
        </div>

        {/* Lista de Suscripciones */}
        <div className="flex flex-col gap-4">
          {subscriptions.length === 0 ? (
            <p className="text-center text-subtext0 py-10">
              No tienes suscripciones aún.
            </p>
          ) : (
            subscriptions.map((sub) => (
              <SubscriptionCard
                key={sub.id}
                id={sub.id}
                name={sub.name}
                price={sub.price}
                date={sub.date}
                onDelete={() => {
                  if (
                    window.confirm(`¿Seguro que deseas eliminar ${sub.name}?`)
                  ) {
                    deleteSubscription(sub.id);
                  }
                }}
                onEdit={() => navigate(`/edit/${sub.id}`, { state: { sub } })}
              />
            ))
          )}
        </div>

        {/* Botón Flotante */}
        <button
          onClick={() => navigate("/add")}
          className="fixed bottom-8 right-8 bg-lavender text-base p-4 rounded-full shadow-xl hover:bg-mauve transition-all z-50 flex items-center justify-center"
        >
          <Plus size={24} />
        </button>
      </div>
    </div>
  );
};

export default Dashboard;
