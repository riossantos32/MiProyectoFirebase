import React, { useEffect, useState } from "react";
import { View, Text, ScrollView, StyleSheet } from "react-native";
import { db } from "./src/database/firebaseConfig.js";
import { collection, getDocs } from "firebase/firestore";

export default function App() {
  const [productos, setProductos] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "productos"));
        const data = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        const productosConSubcoleccion = await Promise.all(
          data.map(async (item) => {
            let subcoleccionSnapshot = [];
            try {
              subcoleccionSnapshot = await getDocs(
                collection(db, "productos", item.id, "sabores")
              );
            } catch (e) {
              console.warn("Error en subcolección sabores:", e);
            }

            const subcoleccionData = subcoleccionSnapshot.docs.map((subDoc) => ({
              id: subDoc.id,
              ...subDoc.data(),
              parentId: item.id,
            }));

            return subcoleccionData.length > 0
              ? { ...item, sabores: subcoleccionData }
              : item;
          })
        );

        setProductos(productosConSubcoleccion);
      } catch (error) {
        console.error("Error al obtener los productos: ", error);
      }
    };

    fetchData();
  }, []);

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>📋 Tabla de Productos</Text>

      {/* Encabezado de la tabla */}
      <View style={styles.tableHeader}>
        <Text style={[styles.cell, styles.headerCell]}>Nombre</Text>
        <Text style={[styles.cell, styles.headerCell]}>Precio</Text>
        <Text style={[styles.cell, styles.headerCell]}>Sabores</Text>
      </View>

      {/* Filas de productos */}
      {productos.map((item) => (
        <View key={item.id} style={styles.tableRow}>
          <Text style={styles.cell}>{item.nombre}</Text>
          <Text style={styles.cell}>${item.precio}</Text>
          <View style={styles.cell}>
            {item.sabores && item.sabores.length > 0 ? (
              item.sabores.map((sabor) => (
                <Text key={sabor.id} style={styles.saborText}>
                  • {sabor.sabor}
                </Text>
              ))
            ) : (
              <Text style={styles.saborText}>—</Text>
            )}
          </View>
        </View>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#e6e2d0ff",
    flex: 1,
    padding: 20,
  },
  title: {
    marginTop: 40,
    fontSize: 24,
    marginBottom: 20,
    textAlign: "center",
    fontWeight: "bold",
  },
  tableHeader: {
    flexDirection: "row",
    borderBottomWidth: 2,
    borderColor: "#333",
    paddingBottom: 8,
    marginBottom: 10,
  },
  tableRow: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderColor: "#ccc",
    paddingVertical: 10,
  },
  cell: {
    flex: 1,
    paddingHorizontal: 5,
  },
  headerCell: {
    fontWeight: "bold",
    fontSize: 16,
  },
  saborText: {
    fontSize: 14,
    color: "#555",
  },
});