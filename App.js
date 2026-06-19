import { useState, useEffect } from 'react';
import { Text, FlatList, View, StyleSheet, SafeAreaView, StatusBar, Image } from 'react-native';

export default function App() {
  const [selecoes, setSelecoes] = useState([]);

  useEffect(() => {
    async function carregarDados() {
      try {
        const response = await fetch(
          "https://raw.githubusercontent.com/gabiyamamoto/hackathon-copa/main/db.json"
        );

        const data = await response.json();

        setSelecoes(data);

        console.log("Dados recebidos:");
        console.log(data);

      } catch (error) {
        console.log(error);
      }
    }

    carregarDados();
  }, []);

  const coresGrupo = {
    'A': '#FF6B6B',
    'B': '#4ECDC4',
    'C': '#45B7D1',
    'D': '#96CEB4',
    'E': '#FFEAA7',
    'F': '#DDA0DD',
    'G': '#FF8A5C',
    'H': '#A29BFE'
  };

  const getCorGrupo = (grupo) => {
    return coresGrupo[grupo] || '#6C5CE7';
  };

  console.log(selecoes)

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#2C3E50" />

      <View style={styles.header}>
        <Text style={styles.headerTitle}>🏆 Copa do Mundo</Text>
        <Text style={styles.headerSubtitle}>Grupos e Seleções</Text>
      </View>

      <FlatList
        data={selecoes}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.lista}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <View style={styles.imageContainer}>
              <Image 
                source={{uri: item.bandeira}}
                style={styles.bandeira}
                resizeMode='contain'
              />
            </View>

            <View style={[styles.grupoContainer, { backgroundColor: getCorGrupo(item.grupo) }]}>
              <Text style={styles.grupo}>Grupo: {item.grupo}</Text>
            </View>

            <View style={styles.selecaoContainer}>
              <Text style={styles.selecao}>{item.selecao}</Text>
            </View>
          </View>
        )}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F0F2F5',
  },

  header: {
    backgroundColor: '#2C3E50',
    paddingVertical: 25,
    paddingHorizontal: 20,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
    elevation: 8,
  },

  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#FFF',
    textAlign: 'center',
  },

  headerSubtitle: {
    fontSize: 16,
    color: '#BDC3C7',
    textAlign: 'center',
    marginTop: 4,
  },

  lista: {
    padding: 16,
    paddingTop: 8,
  },

  card: {
    backgroundColor: '#ffff',
    padding: 16,
    borderRadius: 16,
    marginBottom: 14,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.12,
    shadowRadius: 3.84,
    elevation: 5,
    overflow: 'hidden' 
  },

  imageContainer: {
    backgroundColor: '#F8F9FA',
    padding: 12,
    margin: 5,
    alignItems: 'center',
    justifyContent: 'center',
    height: 100,
  },

  bandeira: {
    width: 80,
    height: 90,
    borderRadius: 8,
  },

  grupoContainer: {
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: 14,
    minWidth: 80,
    alignItems: 'center',
  },

  grupo: {
    color: '#fff',
    fontSize: 13,
    fontWeight: 'bold',
    textTransform: 'uppercase',
    letterSpacing: 0.8,
  },

  selecaoContainer: {
    flex: 1,
    marginLeft: 14,
  },

  selecao: {
    fontSize: 18,
    fontWeight: '600',
    color: '#2C3E50',
  },
});