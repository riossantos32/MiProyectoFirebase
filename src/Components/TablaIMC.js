import React from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import BotonEliminarPromedio from './BotonEliminarPromedio';

const TablaIMC = ({ registros, eliminarIMC }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Registros IMC</Text>

      <ScrollView horizontal>
        <View style={styles.tabla}>
          <View style={[styles.fila, styles.encabezado]}>
            <Text style={[styles.celda, styles.textoEncabezado]}>Nombre</Text>
            <Text style={[styles.celda, styles.textoEncabezado]}>Edad</Text>
            <Text style={[styles.celda, styles.textoEncabezado]}>Peso</Text>
            <Text style={[styles.celda, styles.textoEncabezado]}>Altura</Text>
            <Text style={[styles.celda, styles.textoEncabezado]}>IMC</Text>
            <Text style={[styles.celda, styles.textoEncabezado]}>Categoria</Text>
            <Text style={[styles.celda, styles.textoEncabezado]}>Acciones</Text>
          </View>

          <ScrollView>
            {(!registros || registros.length === 0) ? (
              <View style={styles.fila}>
                <Text style={styles.celda}>No hay registros</Text>
              </View>
            ) : (
              registros.map((item) => (
                <View key={item.id} style={styles.fila}>
                  <Text style={styles.celda}>{item.nombre}</Text>
                  <Text style={styles.celda}>{item.edad}</Text>
                  <Text style={styles.celda}>{item.peso}</Text>
                  <Text style={styles.celda}>{item.altura}</Text>
                  <Text style={styles.celda}>
                    {(item.imc !== undefined && item.imc !== null)
                      ? (typeof item.imc === 'number' ? item.imc.toFixed(2) : String(item.imc))
                      : '—'}
                  </Text>
                  <Text style={styles.celda}>{item.categoria || '—'}</Text>
                  <View style={styles.celdaAcciones}>
                    <BotonEliminarPromedio id={item.id} eliminarPromedio={eliminarIMC} />
                  </View>
                </View>
              ))
            )}
          </ScrollView>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    alignSelf: "stretch"
  },
  titulo: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 10
  },
  tabla: {
    minWidth: 700 // Ajusta según el número de columnas
  },
  fila: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderColor: "#ccc",
    paddingVertical: 6,
    alignItems: "center"
  },
  encabezado: {
    backgroundColor: "#d48d7bff"
  },
  celda: {
    flex: 1,
    fontSize: 14,
    textAlign: "center"
  },
  celdaAcciones: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 8,
  },
  textoEncabezado: {
    fontWeight: "bold",
    fontSize: 14,
    textAlign: "center"
  }
});

export default TablaIMC;