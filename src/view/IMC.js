import React, { useEffect, useState } from "react";
import { View, StyleSheet, Button } from "react-native";
import { db } from "../database/firebaseConfig";
import { collection, getDocs, doc, deleteDoc } from "firebase/firestore";
import FormularioIMC from "../Components/FormularioIMC";
import TablaIMC from "../Components/TablaIMC";

const IMC = ({ cerrarSesion }) => {
  const [registros, setRegistros] = useState([]);

  const cargarDatos = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "imc"));
      const data = querySnapshot.docs.map((d) => ({ id: d.id, ...d.data() }));
      console.log('[IMC] documentos cargados:', data.length, data[0] || null);
      // ordenar por fecha descendente cuando exista campo fecha
      data.sort((a, b) => {
        if (!a.fecha || !b.fecha) return 0;
        return new Date(b.fecha) - new Date(a.fecha);
      });
      setRegistros(data);
    } catch (error) {
      console.error("Error al cargar registros IMC:", error);
    }
  };

  const eliminarIMC = async (id) => {
    try {
      await deleteDoc(doc(db, "imc", id));
      await cargarDatos();
    } catch (error) {
      console.error("Error al eliminar IMC:", error);
    }
  };

  useEffect(() => {
    cargarDatos();
  }, []);

  return (
    <View style={styles.container}>
      <Button title="Cerrar Sesión" onPress={cerrarSesion} />
      <FormularioIMC cargarDatos={cargarDatos} />
      <TablaIMC registros={registros} eliminarIMC={eliminarIMC} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
});

export default IMC;
