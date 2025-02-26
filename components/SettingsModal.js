import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Modal } from 'react-native';
import useStore from '../store';

const SettingsModal = ({ visible, onClose }) => {
  const { mode, language, setMode, setLanguage } = useStore();

  return (
    <Modal visible={visible} animationType="slide" transparent={true}>
      <View style={styles.overlay}>
        <View style={styles.modalContainer}>
          <Text style={styles.title}>Settings</Text>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Select Mode:</Text>
            <TouchableOpacity
              style={[styles.button, mode === 'easy' && styles.selectedButton]}
              onPress={() => setMode('easy')}
            >
              <Text style={styles.buttonText}>Easy</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.button, mode === 'hard' && styles.selectedButton]}
              onPress={() => setMode('hard')}
            >
              <Text style={styles.buttonText}>Hard</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Select Language:</Text>
            <TouchableOpacity
              style={[styles.button, language === 'english' && styles.selectedButton]}
              onPress={() => setLanguage('english')}
            >
              <Text style={styles.buttonText}>English</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.button, language === 'amharic' && styles.selectedButton]}
              onPress={() => setLanguage('amharic')}
            >
              <Text style={styles.buttonText}>Amharic</Text>
            </TouchableOpacity>
           
          </View>

          <TouchableOpacity style={styles.closeButton} onPress={onClose}>
            <Text style={styles.closeButtonText}>Close</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContainer: {
    width: '80%',
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333',
  },
  section: {
    width: '100%',
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 10,
    color: '#555',
  },
  button: {
    width: '100%',
    padding: 15,
    backgroundColor: '#f0f0f0',
    borderRadius: 8,
    marginBottom: 10,
    alignItems: 'center',
  },
  selectedButton: {
    backgroundColor: '#007BFF',
  },
  buttonText: {
    fontSize: 16,
    color: '#333',
  },
  selectedButtonText: {
    color: '#fff',
  },
  closeButton: {
    marginTop: 10,
    padding: 10,
    backgroundColor: '#ff4444',
    borderRadius: 8,
    width: '100%',
    alignItems: 'center',
  },
  closeButtonText: {
    fontSize: 16,
    color: '#fff',
    fontWeight: '600',
  },
});

export default SettingsModal;