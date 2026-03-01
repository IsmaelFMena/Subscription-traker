import { useState } from "react";
import { useNavigate, useLocation, useParams } from "react-router-dom";
import {
  ArrowLeft,
  Save,
  DollarSign,
  Calendar,
  Tag,
  Loader2,
} from "lucide-react";
import { useSubscriptions } from "@/hooks/useSubscriptions";

const EditSubscription = () => {
  const navigate = useNavigate();
  const location = useLocation(); // Aquí recibimos los datos que pasamos desde el Dashboard
  const { id } = useParams(); // Obtenemos el ID de la URL
  const { updateSubscription } = useSubscriptions();

  // Si recargan la página directamente, location.state podría estar vacío
  const subData = location.state?.sub || {
    name: "",
    price: "",
    date: "",
    category: "streaming",
  };

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: subData.name,
    price: subData.price,
    date: subData.date,
    category: subData.category || "streaming",
  });

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await updateSubscription(id, formData);
      navigate("/");
    } catch (error) {
      alert("Error al actualizar");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-base p-6 flex flex-col items-center">
      <div className="w-full max-w-md bg-surface0 rounded-2xl shadow-xl overflow-hidden border border-surface1">
        <div className="bg-blue p-6 text-base flex items-center gap-4">
          <button
            onClick={() => navigate("/")}
            className="hover:bg-blue/80 p-2 rounded-full transition-colors"
          >
            <ArrowLeft size={24} />
          </button>
          <h2 className="text-xl font-bold">Editar Suscripción</h2>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Nombre */}
          <div>
            <label className="block text-sm font-medium text-subtext1 mb-2">
              Nombre del Servicio
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full p-3 bg-surface1 border border-surface2 rounded-lg text-text focus:ring-2 focus:ring-blue outline-none transition-all"
            />
          </div>

          <div className="flex gap-4">
            {/* Precio */}
            <div className="flex-1">
              <label className="block text-sm font-medium text-subtext1 mb-2">
                Precio
              </label>
              <div className="relative">
                <DollarSign
                  size={18}
                  className="absolute left-3 top-3.5 text-subtext0"
                />
                <input
                  type="number"
                  step="0.01"
                  name="price"
                  value={formData.price}
                  onChange={handleChange}
                  required
                  className="w-full pl-10 p-3 bg-surface1 border border-surface2 rounded-lg text-text focus:ring-2 focus:ring-blue outline-none"
                />
              </div>
            </div>
            {/* Fecha */}
            <div className="flex-1">
              <label className="block text-sm font-medium text-subtext1 mb-2">
                Día de Cobro
              </label>
              <div className="relative">
                <Calendar
                  size={18}
                  className="absolute left-3 top-3.5 text-subtext0"
                />
                <input
                  type="number"
                  min="1"
                  max="31"
                  name="date"
                  value={formData.date}
                  onChange={handleChange}
                  required
                  className="w-full pl-10 p-3 bg-surface1 border border-surface2 rounded-lg text-text focus:ring-2 focus:ring-blue outline-none"
                />
              </div>
            </div>
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-blue text-base font-bold p-4 rounded-xl shadow-lg hover:bg-blue/90 transition-all flex items-center justify-center gap-2 mt-4"
          >
            {isSubmitting ? (
              <>
                <Loader2 size={20} className="animate-spin" /> Guardando...
              </>
            ) : (
              <>
                <Save size={20} /> Actualizar
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditSubscription;
