import { StatusBar } from 'expo-status-bar';
import React , { useEffect, useState } from "react";
import { 
  StyleSheet, 
  Text, 
  View,
  FlatList,
  ActivityIndicator,
  TextInput,
  Button
} from 'react-native';

export default function App() {
  const [usuarios, setUsuarios] = useState([])
  const [cargando, setCargando] = useState(true)
  const [error, setError] = useState(null)
  const [busqueda, setBusqueda] = useState("")

  const cargarUsuarios = () => {
    setCargando(true)

    fetch("https://jsonplaceholder.typicode.com/users")
      .then((res) => {
        if (!res.ok) {
          throw new Error("Error al consultar la API")
        }
        return res.json()
      })
      .then((data) => {
        setUsuarios(data)
        setCargando(false)
      })
      .catch((err) => {
        setError(err.message)
        setCargando(false)
      })
  }

  useEffect(() => {
    cargarUsuarios()
  }, [])

  const renderItem = ({item}) => (
    <View style={styles.card}>
      <Text style={styles.nombre}>Name: {item.name}</Text>
      <Text>Email: {item.email}</Text>
      <Text>Company: {item.company.name}</Text>
      <Text>Website: {item.website}</Text>
      <Text>Phone: {item.phone}</Text>
      <Text>City: {item.address.city}</Text>
    </View>
  )

  const usuariosFiltrados = usuarios.filter((u) =>
    u.name.toLowerCase().includes(busqueda.toLowerCase())
  )

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Consumo de API en React Native</Text>
      <TextInput
        placeholder='Buscar usuario...'
        value={busqueda}
        onChangeText={setBusqueda}
        style={{
          borderWidth: 1,
          padding: 10,
          marginBottom: 10
        }}
      />
      <Button title='Recargar usuarios' onPress={cargarUsuarios}/>

      {/* Cargando */}
      {cargando && <ActivityIndicator size="large"/>}

      {/* Error */}
      {error && <Text style={styles.error}>Error: {error}</Text>}

      {/* Lista */}
      {!cargando && !error && (
        <FlatList
          data={usuariosFiltrados}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderItem}
        />
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    marginTop: 40
  },
  titulo: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 15
  },
  card: {
    backgroundColor: "#f2f2f2",
    padding: 15,
    marginBottom: 10,
    borderRadius: 10
  },
  nombre: {
    fontWeight: "bold",
    fontSize: 16
  },
  error: {
    color: "red"
  }
})