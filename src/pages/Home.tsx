import React, { useState } from 'react';
import { Alert, StyleSheet, View } from 'react-native';

import { Header } from '../components/Header';
import { Task, TasksList } from '../components/TasksList';
import { TodoInput } from '../components/TodoInput';

export function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);

  function handleAddTask(newTaskTitle: string) {
    const findTitle = tasks.find(task => task.title === newTaskTitle)
    if (findTitle) {
      Alert.alert("Task já cadastrada", "Você não pode cadastrar uma task com o mesmo nome")
    } else {
      setTasks(prev => [...prev, { id: new Date().getTime(), title: newTaskTitle, done: false }])
    }
  }

  function handleToggleTaskDone(id: number) {
    setTasks(prev => prev.map(task => task.id === id ? { ...task, done: !task.done } : task))
  }

  function handleRemoveTask(id: number) {
    Alert.alert("Remover item", "Tem certeza que você deseja remover esse item?", 
    [{text: "Não", onPress: () => null}, {text: "Sim", onPress: () => setTasks(prev => prev.filter(task => task.id !== id))}])
  }

  function handleEditTask(task: { taskId: number, taskNewTitle: string }) {
    const { taskId, taskNewTitle } = task;
    setTasks(prev => prev.map(task => task.id === taskId ? {...task, title: taskNewTitle } : task))
  }

  return (
    <View style={styles.container}>
      <Header tasksCounter={tasks.length} />

      <TodoInput addTask={handleAddTask} />

      <TasksList 
        tasks={tasks} 
        toggleTaskDone={handleToggleTaskDone}
        removeTask={handleRemoveTask} 
        handleEditTask={handleEditTask}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EBEBEB'
  }
})