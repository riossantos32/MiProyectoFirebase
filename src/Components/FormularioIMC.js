import React, { useState } from "react";
import { View, TextInput, Button, StyleSheet, Text } from "react-native";
import { db } from "../database/firebaseConfig";
import { collection, addDoc } from "firebase/firestore";

const FormularioIMC = ({ cargarDatos }) => {
  const [nombre, setNombre] = useState("");
  const [edad, setEdad] = useState("");
  const [peso, setPeso] = useState("");
  const [altura, setAltura] = useState("");
  const [imc, setImc] = useState(null);
  const [categoria, setCategoria] = useState("");

  const calcularCategoria = (imc) => {
    if (imc < 18.5) return "Bajo peso";
    if (imc >= 18.5 && imc < 25) return "Normal";
    if (imc >= 25 && imc < 30) return "Sobrepeso";
    return "Obesidad";
  };

  const calcularIMC = () => {
    const pesoNum = Number(peso);
    const alturaNum = Number(altura);

    if (isNaN(pesoNum) || isNaN(alturaNum) || alturaNum <= 0) {
      alert("Ingrese valores numéricos válidos. Altura debe ser mayor que 0.");
      return;
    }

    const imcRaw = pesoNum / (alturaNum * alturaNum);
    const imcCalculado = Math.round(imcRaw * 100) / 100;
    const categoriaCalculada = calcularCategoria(imcCalculado);

    setImc(imcCalculado);
    setCategoria(categoriaCalculada);
  };

  const guardarIMC = async () => {
    if (!nombre || !edad || !peso || !altura) {
      alert("Por favor complete todos los campos.");
      return;
    }

    const pesoNum = Number(peso);
    const alturaNum = Number(altura);
    const edadNum = Number(edad);

    if (isNaN(pesoNum) || isNaN(alturaNum) || isNaN(edadNum) || alturaNum <= 0) {
      alert("Ingrese valores numéricos válidos. Altura debe ser mayor que 0.");
      return;
    }

    const imcRaw = pesoNum / (alturaNum * alturaNum);
    const imcCalculado = Math.round(imcRaw * 100) / 100;
    const categoriaCalculada = calcularCategoria(imcCalculado);

    try {
      await addDoc(collection(db, "imc"), {
        nombre: nombre,
        edad: edadNum,
        peso: pesoNum,
        altura: alturaNum,
        imc: imcCalculado,
        categoria: categoriaCalculada,
        fecha: new Date().toISOString(),
      });

      setNombre("");
      setEdad("");
      setPeso("");
      setAltura("");
      setImc(null);
      setCategoria("");
      if (typeof cargarDatos === "function") cargarDatos();
    } catch (error) {
      console.error("Error al guardar IMC:", error);
      alert("Ocurrió un error al guardar. Revise la consola.");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Registro IMC</Text>
      <TextInput
        style={styles.input}
        placeholder="Nombre"
        value={nombre}
        onChangeText={setNombre}
        autoCapitalize="words"
      />
      <TextInput
        style={styles.input}
        placeholder="Edad"
        value={edad}
        onChangeText={setEdad}
        keyboardType="numeric"
      />
      <TextInput
        style={styles.input}
        placeholder="Peso (kg)"
        value={peso}
        onChangeText={setPeso}
        keyboardType="decimal-pad"
      />
      <TextInput
        style={styles.input}
        placeholder="Altura (m) ej. 1.75"
        value={altura}
        onChangeText={setAltura}
        keyboardType="decimal-pad"
      />
      {imc !== null && (
        <Text style={styles.resultado}>
          Tu IMC es {imc} ({categoria})
        </Text>
      )}
      <Button
        title="Calcular y Guardar"
        onPress={() => {
          calcularIMC();
          guardarIMC();
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { padding: 20 },
  titulo: { fontSize: 22, fontWeight: "bold", marginBottom: 10 },
  input: {
    borderWidth: 1,
    borderColor: "#25c510ff",
    padding: 10,
    marginBottom: 10,
  },
  resultado: {
    fontSize: 16,
    marginBottom: 10,
    color: "#333",
  },
});

export default FormularioIMC;