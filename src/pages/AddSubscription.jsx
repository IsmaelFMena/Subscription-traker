import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  Check,
  DollarSign,
  Calendar,
  Tag,
  Loader2,
} from "lucide-react";
import { useSubscriptions } from "@/hooks/useSubscriptions";

const AddSubscription = () => {
  const navigate = useNavigate();
  const { addSubscription } = useSubscriptions();
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Estado inicial del formulario
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    date: "", // Día del mes (1-31)
    category: "streaming",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Usamos la función del hook
      await addSubscription(formData);
      navigate("/"); // Volver al inicio automáticamente si todo sale bien
    } catch (error) {
      alert("Hubo un error al guardar. Revisa la consola.");
    } finally {
      setIsSubmitting(false);
    }
  };
  return (
    <div className="min-h-screen bg-base p-6 flex flex-col items-center">
      <div className="w-full max-w-md bg-surface0 rounded-2xl shadow-xl overflow-hidden border border-surface1">
        {/* Header del Formulario */}
        <div className="bg-mauve p-6 text-base flex items-center gap-4">
          <button
            onClick={() => navigate("/")}
            className="hover:bg-mauve/80 p-2 rounded-full transition-colors"
          >
            <ArrowLeft size={24} />
          </button>
          <h2 className="text-xl font-bold">Nueva Suscripción</h2>
        </div>

        {/* Campos del Formulario */}
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Nombre del Servicio */}
          <div>
            <label className="block text-sm font-medium text-subtext1 mb-2">
              Nombre del Servicio
            </label>
            <input
              type="text"
              name="name"
              placeholder="Ej. Netflix, Gimnasio..."
              className="w-full p-3 bg-surface1 border border-surface2 rounded-lg text-text focus:ring-2 focus:ring-mauve focus:outline-none transition-all placeholder:text-overlay0"
              required
              onChange={handleChange}
            />
          </div>

          {/* Precio y Fecha (En una fila) */}
          <div className="flex gap-4">
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
                  name="price"
                  step="0.01"
                  placeholder="0.00"
                  className="w-full pl-10 p-3 bg-surface1 border border-surface2 rounded-lg text-text focus:ring-2 focus:ring-mauve outline-none placeholder:text-overlay0"
                  required
                  onChange={handleChange}
                />
              </div>
            </div>

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
                  name="date"
                  min="1"
                  max="31"
                  placeholder="Ej. 15"
                  className="w-full pl-10 p-3 bg-surface1 border border-surface2 rounded-lg text-text focus:ring-2 focus:ring-mauve outline-none placeholder:text-overlay0"
                  required
                  onChange={handleChange}
                />
              </div>
            </div>
          </div>

          {/* Categoría */}
          <div>
            <label className="block text-sm font-medium text-subtext1 mb-2">
              Categoría
            </label>
            <div className="relative">
              <Tag
                size={18}
                className="absolute left-3 top-3.5 text-subtext0"
              />
              <select
                name="category"
                className="w-full pl-10 p-3 bg-surface1 border border-surface2 rounded-lg text-text focus:ring-2 focus:ring-mauve outline-none"
                onChange={handleChange}
              >
                <option value="streaming">Entretenimiento / Streaming</option>
                <option value="software">Software / Apps</option>
                <option value="health">Salud / Gimnasio</option>
                <option value="bills">Servicios Básicos</option>
              </select>
            </div>
          </div>

          {/* Botón Guardar */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-mauve text-base font-bold p-4 rounded-xl shadow-lg hover:bg-mauve/90 transition-all flex items-center justify-center gap-2 mt-4 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? (
              <>
                <Loader2 size={20} className="animate-spin" />
                Guardando...
              </>
            ) : (
              <>
                <Check size={20} />
                Guardar Suscripción
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddSubscription;
