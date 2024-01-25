import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, FlatList, ScrollView, TextInput, Modal } from 'react-native';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import Logo from '../../../assets/images/logo.jpg';

const Home = () => {
  const navigation = useNavigation();
  const [isSettingsModalVisible, setSettingsModalVisible] = useState(false);
  const [task, setTask] = useState('');
  const [tasks, setTasks] = useState([
    {
      id: '01',
      title: 'Planting',
    },
    {
      id: '02',
      title: 'Shopping',
    },
  ]);
  const [editTaskId, setEditTaskId] = useState(null);

  const settingsOptions = [
    { id: '1', title: 'Personal Information' },
    { id: '2', title: 'Language' },
    { id: '3', title: 'Activity Log' },
    { id: '4', title: 'Logout' },
  ];

  const onPressSignOut = () => {
    navigation.navigate('Login');
  };

  const renderTask = ({ item }) => (
    <View style={styles.taskItem}>
      <TextInput
        style={styles.taskTitle}
        value={editTaskId === item.id ? task : item.title}
        editable={editTaskId === item.id}
        onChangeText={(text) => setTask(text)}
      />
      {editTaskId === item.id ? (
        <TouchableOpacity onPress={handleSaveEdit}>
          <Ionicons name="save" size={20} color="white" />
        </TouchableOpacity>
      ) : (
        <>
          <TouchableOpacity onPress={() => handleEditTask(item)}>
            <Ionicons name="create" size={20} color="white" />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => handleDeleteTask(item.id)}>
            <Ionicons name="trash" size={20} color="white" />
          </TouchableOpacity>
        </>
      )}
    </View>
  );

  const handleSettingsItemClick = (item) => {
    if (item.id === '4') {
      navigation.navigate('Login');
    } else {
      console.log('Selected setting:', item.title);
    }

    setSettingsModalVisible(false);
  };

  const handleAddTask = () => {
    if (task.trim() !== '') {
      const newTask = {
        id: (tasks.length + 1).toString(),
        title: task,
      };

      setTasks([newTask, ...tasks]);
      setTask('');
    }
  };

  const handleEditTask = (selectedTask) => {
    setEditTaskId(selectedTask.id);
    setTask(selectedTask.title);
  };

  const handleSaveEdit = () => {
    if (editTaskId) {
      const updatedTasks = tasks.map((t) =>
        t.id === editTaskId ? { ...t, title: task } : t
      );

      setTasks(updatedTasks);
      setEditTaskId(null);
      setTask('');
    }
  };

  const handleDeleteTask = (taskId) => {
    const updatedTasks = tasks.filter((task) => task.id !== taskId);
    setTasks(updatedTasks);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.logoContainer}>
          <Image style={styles.logo} source={Logo} resizeMode="contain" />
          <Text style={styles.logoText}>TO-DO-LIST</Text>
        </View>
        <TouchableOpacity onPress={() => setSettingsModalVisible(true)}>
          <MaterialCommunityIcons name="menu" size={24} color="white" />
        </TouchableOpacity>
      </View>

      <ScrollView style={{ flexGrow: 1 }} contentContainerStyle={{ flexGrow: 1 }}>
        <View style={{ marginHorizontal: 16, flex: 1, marginTop: 10 }}>
          <FlatList data={tasks} renderItem={renderTask} keyExtractor={(item) => item.id} />

          <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 12, marginTop: 10 }}>
            <TextInput
              style={{
                flex: 1,
                borderWidth: 2,
                backgroundColor: '#FFFFFF',
                borderRadius: 6,
                paddingVertical: 6,
                paddingHorizontal: 16,
                marginRight: 12,
              }}
              placeholder="Add a Task"
              value={task}
              onChangeText={(text) => setTask(text)}
            />
            <TouchableOpacity
              style={{
                backgroundColor: '#FFFFFF',
                borderRadius: 6,
                paddingHorizontal: 12,
                paddingVertical: 12,
              }}
              onPress={handleAddTask}
            >
              <Text style={{ fontWeight: 'bold', fontSize: 20 }}>Add</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>

      <Modal
        animationType="slide"
        transparent={true}
        visible={isSettingsModalVisible}
        onRequestClose={() => setSettingsModalVisible(false)}
      >
        <View style={styles.settingsModal}>
          <FlatList
            data={settingsOptions}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={styles.settingsItem}
                onPress={() => handleSettingsItemClick(item)}
              >
                <Text style={styles.settingsItemText}>{item.title}</Text>
              </TouchableOpacity>
            )}
          />
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212',
    padding: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  logoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  logo: {
    width: 60,
    height: 60,
    marginRight: 8,
  },
  logoText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
  },
  settingsModal: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
  },
  settingsItem: {
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: 'white',
  },
  settingsItemText: {
    fontSize: 18,
    color: 'white',
  },
  taskItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#282828',
    padding: 16,
    marginBottom: 8,
    borderRadius: 8,
  },
  taskTitle: {
    flex: 1,
    fontSize: 16,
    fontWeight: 'bold',
    color: 'white',
    marginRight: 12,
  },
});

export default Home;