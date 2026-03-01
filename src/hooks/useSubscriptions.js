import { useState, useEffect } from "react";
import { db } from "@/services/firebase";
import { useAuth } from "@/context/AuthContext"; // <--- 1. Importamos al usuario
import {
  collection,
  addDoc,
  onSnapshot,
  query,
  serverTimestamp,
  doc,
  deleteDoc,
  updateDoc,
  where, // <--- 2. Importamos 'where'
} from "firebase/firestore";

export const useSubscriptions = () => {
  const [subscriptions, setSubscriptions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { user } = useAuth(); // <--- 3. Obtenemos al usuario logueado

  const collectionRef = collection(db, "subscriptions");

  // LEER (Solo las del usuario logueado)
  useEffect(() => {
    if (!user) return; // Si no hay usuario, no hace nada

    // Consultamos SOLO los documentos donde userId sea igual al ID del usuario
    const q = query(collectionRef, where("userId", "==", user.uid));

    const unsubscribe = onSnapshot(
      q,
      (snapshot) => {
        const subsData = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        // Ordenamos localmente por fecha de creación para evitar errores de índices en Firebase
        subsData.sort(
          (a, b) => b.createdAt?.toMillis() - a.createdAt?.toMillis(),
        );

        setSubscriptions(subsData);
        setLoading(false);
      },
      (err) => {
        console.error(err);
        setError("Error al cargar suscripciones");
        setLoading(false);
      },
    );
    return () => unsubscribe();
  }, [user]); // <--- Se vuelve a ejecutar si el usuario cambia

  // CREAR (Le asignamos el dueño)
  const addSubscription = async (data) => {
    try {
      await addDoc(collectionRef, {
        ...data,
        price: parseFloat(data.price),
        date: parseInt(data.date),
        createdAt: serverTimestamp(),
        userId: user.uid, // <--- GUARDAMOS QUIÉN LO CREÓ
      });
      return true;
    } catch (err) {
      console.error("Error al agregar:", err);
      throw err;
    }
  };

  const deleteSubscription = async (id) => {
    const docRef = doc(db, "subscriptions", id);
    await deleteDoc(docRef);
  };

  const updateSubscription = async (id, data) => {
    const docRef = doc(db, "subscriptions", id);
    await updateDoc(docRef, {
      ...data,
      price: parseFloat(data.price),
      date: parseInt(data.date),
    });
  };

  return {
    subscriptions,
    loading,
    error,
    addSubscription,
    deleteSubscription,
    updateSubscription,
  };
};
