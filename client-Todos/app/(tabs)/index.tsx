import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Text, View, StyleSheet } from 'react-native';

// Define the Todo type
type Todo = {
  _id: string;
  title: string;
  todoIndex: number;
  complete: boolean;
};

export default function HomeScreen() {
  const [todo, setTodo] = useState<Todo | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const getTodo = async () => {
    try {
      const response = await fetch('https://cityutodoapi.azurewebsites.net/todos/5');
      const json = await response.json();
      setTodo(json);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getTodo();
  }, []);

  return (
    <View style={styles.container}>
      {isLoading ? (
        <ActivityIndicator color="#000" />
      ) : (
        todo && (
          <View>
            <Text style={styles.item}>ID: {todo._id}</Text>
            <Text style={styles.item}>Title: {todo.title}</Text>
            <Text style={styles.item}>Todo Index: {todo.todoIndex}</Text>
            <Text style={styles.item}>Complete: {todo.complete ? 'Yes' : 'No'}</Text>
          </View>
        )
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
  item: {
    fontSize: 16,
    marginBottom: 10,
    color: '#000000',
  },
});
