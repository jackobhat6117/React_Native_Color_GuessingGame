import React, { useEffect } from 'react';
import { View, Text, StyleSheet, Modal, FlatList, TouchableOpacity } from 'react-native';
import useStore from '../store';
import { firestore, firebase} from '../firebaseConfig'

const PlayerList = ({ visible, onClose }) => {
  const { players, addPlayer } = useStore();

  useEffect(() => {
    const fetchPlayers = async () => {
      try {
        // Check if Firebase is initialized before accessing firestore
        if (!firebase.apps.length) {
          console.error("Firebase is not initialized!");
          return;
        }

        const snapshot = await firestore().collection('players').get();
        const players = snapshot.docs.map((doc) => doc.data());
        useStore.setState({ players });
      } catch (error) {
        console.error("Error fetching players:", error);
      }
    };

    fetchPlayers();
  }, []);

  return (
    <Modal visible={visible} animationType="slide">
      <View style={styles.modalContainer}>
        <Text>Player List</Text>
        <FlatList
          data={players}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            <View style={styles.playerItem}>
              <Text>{item.name}</Text>
              <Text>Score: {item.score}</Text>
              <Text>Date: {new Date(item.date).toLocaleDateString()}</Text>
            </View>
          )}
        />
        <TouchableOpacity onPress={onClose} style={styles.closeButton}>
          <Text style={styles.closeText}>Close</Text>
        </TouchableOpacity>
      </View>
    </Modal>
  );
};

// PlayerList styles
const styles = StyleSheet.create({
  modalContainer: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  playerItem: { padding: 10, borderBottomWidth: 1, borderBottomColor: '#ccc' },
  closeButton: { padding: 10, backgroundColor: '#007BFF', marginTop: 10, borderRadius: 5 },
  closeText: { color: 'white', fontWeight: 'bold' },
});

export default PlayerList;
