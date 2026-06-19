import { useState, useEffect } from 'react';
import { Text, View } from 'react-native';

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

  return (
    <View>
      <Text>DashBoard da Copa</Text>
    </View>
  );
}
