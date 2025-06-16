import React, { useEffect, useState } from 'react';
import { ActivityIndicator, FlatList, Text, View, StyleSheet } from 'react-native';

// Define Superhero type
type Superhero = {
  name: string;
  age: number;
  secretIdentity: string;
  powers: string[];
};

export default function HomeScreen() {
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState<Superhero[]>([]);

  const getHeroes = async () => {
    try {
      const response = await fetch('https://mdn.github.io/learning-area/javascript/oojs/json/superheroes.json');
      const json = await response.json();
      setData(json.members);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getHeroes();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Superheroes</Text>
      {isLoading ? (
        <ActivityIndicator color="#000" />
      ) : (
        <FlatList
          data={data}
          keyExtractor={(item) => item.name}
          renderItem={({ item }) => (
            <View style={styles.card}>
              <Text style={styles.name}>{item.name}</Text>
              <Text style={styles.details}>Secret Identity: {item.secretIdentity}</Text>
              <Text style={styles.details}>Powers: {item.powers.join(', ')}</Text>
            </View>
          )}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: '#FFFFFF',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    color: '#000000',
  },
  card: {
    marginBottom: 16,
    padding: 12,
    backgroundColor: '#f2f2f2',
    borderRadius: 8,
  },
  name: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#000',
  },
  details: {
    fontSize: 16,
    color: '#333',
    marginTop: 4,
  },
});
