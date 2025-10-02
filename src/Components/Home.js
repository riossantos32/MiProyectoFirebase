import React from 'react';
import { View, Button, StyleSheet } from 'react-native';

export default function Home({ navigation }) {
  return (
    <View style={styles.container}>
      <View style={styles.botones}>
        <Button title="Ir a Clientes" onPress={() => navigation.navigate('Clientes')} />
      </View>
      <View style={styles.botones}>
        <Button title="Ir a Productos" onPress={() => navigation.navigate('Productos')} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  botones: {
    marginBottom: 20,
    borderRadius:20
  },
});