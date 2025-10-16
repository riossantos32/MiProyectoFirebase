import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { auth } from './src/database/firebaseConfig';
import Home from './src/Components/Home';
import Clientes from './src/view/Clientes';
import Productos from './src/view/Productos';
import Promedios from './src/view/Promedios';
import Usuarios from './src/view/Usuarios';
import Login from './src/Components/Login';

const Stack = createNativeStackNavigator();

export default function App() {
  const [usuario, setUsuario] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUsuario(user);
    });
    return () => unsubscribe();
  }, []);

  const cerrarSesion = async (navigation) => {
    await signOut(auth);
    setUsuario(null);
    navigation.replace("Login");
  };

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName={usuario ? "Home" : "Login"}>
        {!usuario ? (
          <Stack.Screen name="Login">
            {(props) => (
              <Login {...props} onLoginSuccess={() => setUsuario(auth.currentUser)} />
            )}
          </Stack.Screen>
        ) : (
          <>
            <Stack.Screen name="Home">
            {(props) => (
                <Home {...props} cerrarSesion={() => cerrarSesion(props.navigation)} />
              )}
            </Stack.Screen>
            <Stack.Screen name="Clientes">
            {(props) => (
                <Clientes {...props} cerrarSesion={() => cerrarSesion(props.navigation)} />
              )}
            </Stack.Screen>
            <Stack.Screen name="Productos">
              {(props) => (
                <Productos {...props} cerrarSesion={() => cerrarSesion(props.navigation)} />
              )}
            </Stack.Screen>
            <Stack.Screen name="Promedios" >
               {(props) => (
                <Promedios {...props} cerrarSesion={() => cerrarSesion(props.navigation)} />
              )}
            </Stack.Screen>
            <Stack.Screen name="Usuarios">
               {(props) => (
                <Usuarios {...props} cerrarSesion={() => cerrarSesion(props.navigation)} />
              )}
            </Stack.Screen>
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}