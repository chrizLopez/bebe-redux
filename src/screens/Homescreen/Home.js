// Home.js

import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, FlatList, Modal } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import Logo from '../../../assets/images/logo.jpg';

const Home = () => {
  const navigation = useNavigation();
  const [isSettingsModalVisible, setSettingsModalVisible] = useState(false);

  const onPressSignOut = () => {
    navigation.navigate('Login');
  };

  const albumsData = [
    { id: '1', title: 'Album 1', artist: 'Artist A' },
    { id: '2', title: 'Album 2', artist: 'Artist B' },
    // Add more album items here
  ];

  const playlistsData = [
    { id: '1', title: 'Playlist 1', description: 'Description for Playlist 1' },
    { id: '2', title: 'Playlist 2', description: 'Description for Playlist 2' },
    // Add more playlist items here
  ];

  const settingsOptions = [
    { id: '1', title: 'Personal Information' },
    { id: '2', title: 'Language' },
    { id: '3', title: 'Activity Log' },
    { id: '4', title: 'Logout' },
  ];

  const renderItem = ({ item }) => (
    <TouchableOpacity style={styles.settingsItem} onPress={() => handleSettingsItemClick(item)}>
      <Text style={styles.settingsItemText}>{item.title}</Text>
    </TouchableOpacity>
  );

  const handleSettingsItemClick = (item) => {
    // Handle different settings options here
    if (item.id === '4') {
      // Logout logic
      navigation.navigate('Login');
    } else {
      // Handle other options accordingly
      console.log('Selected setting:', item.title);
    }

    // Close the settings modal
    setSettingsModalVisible(false);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image style={styles.logo} source={Logo} resizeMode="contain" />
        <TouchableOpacity onPress={() => setSettingsModalVisible(true)}>
          <Ionicons name="settings" size={24} color="white" />
        </TouchableOpacity>
      </View>
      <Text style={styles.title}>Featured Playlists</Text>
      <View style={styles.albums}>
        <Text style={styles.sectionTitle}>Albums</Text>
        <FlatList
          data={albumsData}
          keyExtractor={(item) => item.id}
          renderItem={renderItem}
        />
      </View>
      <View style={styles.playlists}>
        <Text style={styles.sectionTitle}>Playlists</Text>
        <FlatList
          data={playlistsData}
          keyExtractor={(item) => item.id}
          renderItem={renderItem}
        />
      </View>
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
            renderItem={renderItem}
          />
        </View>
      </Modal>
      <View style={styles.bottomNavigation}>
        <TouchableOpacity
          style={styles.bottomNavItem}
          onPress={() => navigation.navigate('Home')}
        >
          <Ionicons name="home" size={24} color="white" />
          <Text style={styles.bottomNavText}>Home</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.bottomNavItem}
          onPress={() => navigation.navigate('Search')}
        >
          <Ionicons name="search" size={24} color="white" />
          <Text style={styles.bottomNavText}>Search</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.bottomNavItem}
          onPress={() => navigation.navigate('Profile')}
        >
          <Ionicons name="person" size={24} color="white" />
          <Text style={styles.bottomNavText}>Profile</Text>
        </TouchableOpacity>
      </View>
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
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    color: 'white',
    marginTop: 20,
  },
  logo: {
    width: 100,
    height: 100,
  },
  albums: {
    marginTop: 20,
  },
  playlists: {
    marginTop: 20,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 10,
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
  item: {
    backgroundColor: '#282828',
    padding: 16,
    marginBottom: 8,
    borderRadius: 8,
    flexDirection: 'row',
    alignItems: 'center',
  },
  itemLogo: {
    width: 50,
    height: 50,
    borderRadius: 4,
    marginRight: 16,
  },
  itemDetails: {
    flex: 1,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'white',
  },
  description: {
    fontSize: 14,
    color: '#b3b3b3',
  },
  bottomNavigation: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingVertical: 70,
    borderTopWidth: 1,
    borderTopColor: '#282828',
  },
  bottomNavItem: {
    alignItems: 'center',
  },
  bottomNavText: {
    color: 'white',
    marginTop: 5,
  },
});

export default Home;
