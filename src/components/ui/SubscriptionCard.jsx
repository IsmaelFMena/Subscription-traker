import { Calendar, Trash2, Edit2, AlertCircle } from "lucide-react";
import { calculateDaysUntilNextPayment } from "@/utils/dates";

const SubscriptionCard = ({ id, name, price, date, onDelete, onEdit }) => {
  const daysLeft = calculateDaysUntilNextPayment(date);

  // Lógica de colores dinámicos con Tailwind
  let statusColor = "bg-green/20 text-green";
  let statusText = `Faltan ${daysLeft} días`;

  if (daysLeft === 0) {
    statusColor = "bg-red text-base font-bold animate-pulse";
    statusText = "¡Se cobra hoy!";
  } else if (daysLeft <= 3) {
    statusColor = "bg-red/20 text-red font-semibold";
  } else if (daysLeft <= 7) {
    statusColor = "bg-yellow/20 text-yellow";
  }

  return (
    <div className="bg-surface0 p-4 rounded-xl shadow-sm border border-surface1 flex items-center justify-between hover:shadow-md transition-all group relative overflow-hidden">
      {/* Pequeña barra lateral de color */}
      <div
        className={`absolute left-0 top-0 bottom-0 w-1 ${daysLeft <= 3 ? "bg-red" : daysLeft <= 7 ? "bg-yellow" : "bg-transparent"}`}
      ></div>

      <div className="flex items-center gap-4 pl-2">
        <div className="w-12 h-12 bg-surface1 border border-surface2 rounded-full flex items-center justify-center text-xl font-bold text-text shadow-sm">
          {name.charAt(0).toUpperCase()}
        </div>
        <div>
          <h3 className="font-bold text-text">{name}</h3>

          <div
            className={`flex items-center text-xs gap-1 mt-1 px-2 py-1 rounded-md w-fit ${statusColor}`}
          >
            {daysLeft <= 3 ? <AlertCircle size={12} /> : <Calendar size={12} />}
            <span>{statusText}</span>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-4">
        <div className="text-right">
          <p className="font-bold text-lg text-text">
            ${Number(price).toFixed(2)}
          </p>
          <p className="text-xs text-subtext0">Día {date}</p>
        </div>

        {/* Botones de acción */}
        <div className="flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
          <button
            onClick={() => onEdit()}
            className="text-subtext1 hover:text-blue transition-colors p-1 bg-blue/10 hover:bg-blue/20 rounded-md"
          >
            <Edit2 size={16} />
          </button>
          <button
            onClick={() => onDelete()}
            className="text-subtext1 hover:text-red transition-colors p-1 bg-red/10 hover:bg-red/20 rounded-md"
          >
            <Trash2 size={16} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default SubscriptionCard;
