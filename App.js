import { useState, useEffect } from 'react';
import { Text, FlatList } from 'react-native';

export default function App() {
  const [ selecoes, setSelecoes ] = useState([]);

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
  console.log(selecoes)

  return (
    <FlatList
      data={selecoes}
      keyExtractor={(item) => item.id}
      renderItem={({item}) => (
        <Text style={{color: 'white', fontSize: 20}}>{item.selecao}</Text>
      )}
    />
  );
}
