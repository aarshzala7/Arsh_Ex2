import { useLocalSearchParams } from 'expo-router';
import { useEffect, useState } from 'react';
import {
    Keyboard,
    Modal,
    Pressable,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableWithoutFeedback,
    View,
} from 'react-native';
import { messages as staticMessages } from '../constants/messages';

export default function CategoryScreen() {
  const params = useLocalSearchParams();
  const category = typeof params.category === 'string' ? params.category : '';

  const [categoryMessages, setCategoryMessages] = useState<string[]>([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [newMessage, setNewMessage] = useState('');

  useEffect(() => {
    setCategoryMessages(staticMessages[category] || []);
  }, [category]);

  const handleAddMessage = () => {
    const trimmed = newMessage.trim();
    if (trimmed) {
      setCategoryMessages(prev => [...prev, trimmed]);
    }
    setNewMessage('');
    setModalVisible(false);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{category} Messages</Text>

      <ScrollView style={{ marginBottom: 80 }}>
        {categoryMessages.length > 0 ? (
          categoryMessages.map((msg, index) => (
            <Text key={index} style={styles.message}>{msg}</Text>
          ))
        ) : (
          <Text>No messages found.</Text>
        )}
      </ScrollView>

      <Pressable style={styles.fab} onPress={() => setModalVisible(true)}>
        <Text style={styles.fabText}>+</Text>
      </Pressable>

      <Modal transparent visible={modalVisible} animationType="fade">
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={styles.modalOverlay}>
            <TouchableWithoutFeedback onPress={() => setModalVisible(false)}>
              <View style={styles.outsideModal} />
            </TouchableWithoutFeedback>

            <View style={styles.modal}>
              <Text style={styles.modalTitle}>Add New Message</Text>
              <TextInput
                placeholder="Type your message..."
                value={newMessage}
                onChangeText={setNewMessage}
                style={styles.input}
              />
              <Pressable style={styles.modalButton} onPress={handleAddMessage}>
                <Text style={styles.modalButtonText}>Add</Text>
              </Pressable>
            </View>

            <TouchableWithoutFeedback onPress={() => setModalVisible(false)}>
              <View style={styles.outsideModal} />
            </TouchableWithoutFeedback>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#f4f9ff' },
  title: { fontSize: 22, marginBottom: 10, fontWeight: 'bold' },
  message: { fontSize: 16, marginVertical: 5 },
  fab: {
    position: 'absolute',
    right: 30,
    bottom: 30,
    backgroundColor: '#2575fc',
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5,
  },
  fabText: {
    fontSize: 30,
    color: 'white',
    fontWeight: 'bold',
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'rgba(0,0,0,0.3)',
  },
  modal: {
    marginHorizontal: 40,
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 20,
    elevation: 6,
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 10,
  },
  input: {
    width: '100%',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    padding: 10,
    marginBottom: 15,
    fontSize: 16,
  },
  modalButton: {
    backgroundColor: '#2575fc',
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 25,
  },
  modalButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  outsideModal: {
    flex: 1,
  },
});
