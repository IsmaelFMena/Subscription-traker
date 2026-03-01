export const calculateDaysUntilNextPayment = (billingDay) => {
  const today = new Date();
  today.setHours(0, 0, 0, 0); // Normalizamos a la medianoche para evitar decimales

  // Creamos una fecha tentativa para el cobro en el mes actual
  let nextPaymentDate = new Date(
    today.getFullYear(),
    today.getMonth(),
    billingDay,
  );

  // Si el día de cobro ya pasó en este mes, lo movemos al próximo mes
  if (billingDay < today.getDate()) {
    nextPaymentDate = new Date(
      today.getFullYear(),
      today.getMonth() + 1,
      billingDay,
    );
  }

  // Calculamos la diferencia en milisegundos y la pasamos a días
  const diffTime = nextPaymentDate - today;
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

  return diffDays;
};
