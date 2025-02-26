import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert, Modal, TextInput } from 'react-native';
import useStore from './store';
import SettingsModal from './components/SettingsModal';
import PlayerList from './components/PlayerList';
import { firestore } from './firebaseConfig'

const App = () => {
  const {
    mode,
    language,
    colors,
    correctColor,
    score,
    players,
    setMode,
    setLanguage,
    setColors,
    setCorrectColor,
    incrementScore,
    addPlayer,
  } = useStore();

  const [settingsVisible, setSettingsVisible] = useState(false);
  const [playersVisible, setPlayersVisible] = useState(false);
  const [nameModalVisible, setNameModalVisible] = useState(false);
  const [playerName, setPlayerName] = useState('');

  const generateColors = () => {
    const colorCount = mode === 'easy' ? 3 : 6;
    const newColors = Array.from({ length: colorCount }, () => {
      const r = Math.floor(Math.random() * 256);
      const g = Math.floor(Math.random() * 256);
      const b = Math.floor(Math.random() * 256);
      return `rgb(${r}, ${g}, ${b})`;
    });
    setColors(newColors);
    setCorrectColor(newColors[Math.floor(Math.random() * colorCount)]);
  };

  useEffect(() => {
    generateColors();
  }, [mode]);

  const handleGuess = (color) => {
    if (color === correctColor) {
      incrementScore();
      Alert.alert(
        language === 'english' ? 'Correct!' : language === 'amharic' ? 'ትክክል!' : 'Correct!',
        language === 'english' ? 'You guessed the right color.' : language === 'amharic' ? 'ትክክለኛውን ቀለም ገምተሃል።' : 'Vous avez deviné la bonne couleur.'
      );
      generateColors();
    } else {
      Alert.alert(
        language === 'english' ? 'Wrong!' : language === 'amharic' ? 'ስህተት!' : 'Faux!',
        language === 'english' ? 'Try again.' : language === 'amharic' ? 'እንደገና ይሞክሩ።' : 'Essayez encore.'
      );
    }
  };

  const finishGame = () => {
    setNameModalVisible(true); // Show the name input modal
  };

  const savePlayer = async () => {
    if (playerName.trim()) {
      const player = { name: playerName, score, date: new Date().toISOString() };
      try {
        await firestore().collection('players').add(player); // Use Firestore
        addPlayer(player);
        setNameModalVisible(false);
        setPlayerName('');
      } catch (error) {
        console.error('Error saving player: ', error);
        Alert.alert('Error', 'Failed to save player. Please try again.');
      }
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        {language === 'english' ? 'Color Guessing Game' : language === 'amharic' ? 'የቀለም ጨዋታ' : 'Jeu de Couleurs'}
      </Text>
      <Text style={styles.rgbText}>{correctColor}</Text>
      <View style={styles.colorContainer}>
        {colors.map((color, index) => (
          <TouchableOpacity
            key={index}
            style={[styles.colorBox, { backgroundColor: color }]}
            onPress={() => handleGuess(color)}
          />
        ))}
      </View>
      <TouchableOpacity style={styles.button} onPress={generateColors}>
        <Text style={styles.buttonText}>
          {language === 'english' ? 'New Colors' : language === 'amharic' ? 'አዲስ ቀለሞች' : 'Nouvelles Couleurs'}
        </Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={finishGame}>
        <Text style={styles.buttonText}>
          {language === 'english' ? 'Finish Game' : language === 'amharic' ? 'ጨዋታውን ጨርስ' : 'Terminer le Jeu'}
        </Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={() => setSettingsVisible(true)}>
        <Text style={styles.buttonText}>Settings</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={() => setPlayersVisible(true)}>
        <Text style={styles.buttonText}>View Players</Text>
      </TouchableOpacity>

      {/* Name Input Modal */}
      <Modal visible={nameModalVisible} transparent={true} animationType="slide">
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>
              {language === 'english' ? 'Enter your name' : language === 'amharic' ? 'ስምዎን ያስገቡ' : 'Entrez votre nom'}
            </Text>
            <TextInput
              style={styles.input}
              placeholder="Name"
              value={playerName}
              onChangeText={setPlayerName}
            />
            <TouchableOpacity style={styles.modalButton} onPress={savePlayer}>
              <Text style={styles.modalButtonText}>Save</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.modalButton} onPress={() => setNameModalVisible(false)}>
              <Text style={styles.modalButtonText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      <SettingsModal visible={settingsVisible} onClose={() => setSettingsVisible(false)} />
      <PlayerList visible={playersVisible} onClose={() => setPlayersVisible(false)} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: '#f5f5f5' },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 20, color: '#333' },
  rgbText: { fontSize: 18, marginBottom: 20, color: '#555' },
  colorContainer: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center', marginBottom: 20 },
  colorBox: { width: 100, height: 100, margin: 10, borderRadius: 10 },
  button: { padding: 15, backgroundColor: '#007BFF', borderRadius: 8, margin: 10, width: '80%', alignItems: 'center' },
  buttonText: { color: '#fff', fontSize: 16, fontWeight: '600' },
  modalOverlay: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0, 0, 0, 0.5)' },
  modalContent: { width: '80%', backgroundColor: '#fff', borderRadius: 10, padding: 20, alignItems: 'center' },
  modalTitle: { fontSize: 18, fontWeight: 'bold', marginBottom: 20, color: '#333' },
  input: { width: '100%', padding: 10, borderWidth: 1, borderColor: '#ddd', borderRadius: 8, marginBottom: 20 },
  modalButton: { padding: 10, backgroundColor: '#007BFF', borderRadius: 8, width: '100%', alignItems: 'center', marginBottom: 10 },
  modalButtonText: { color: '#fff', fontSize: 16, fontWeight: '600' },
});

export default App;