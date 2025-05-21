import { AntDesign } from '@expo/vector-icons';
import { useState } from 'react';
import {
    Dimensions,
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
import CategoryButton from '../components/CategoryButton';

const defaultCategories = ['You', 'Home', 'Love','Family', 'Friends', 'School'];

export default function Home() {
  const [categories, setCategories] = useState<string[]>(defaultCategories);
  const [modalVisible, setModalVisible] = useState(false);
  const [newCategory, setNewCategory] = useState('');

  const handleAddCategory = () => {
    const trimmed = newCategory.trim();
    if (trimmed && !categories.includes(trimmed)) {
      setCategories([...categories, trimmed]);
    }
    setNewCategory('');
    setModalVisible(false);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Message Categories</Text>

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.grid}>
          {categories.map((label, index) => (
            <CategoryButton key={index} label={label} />
          ))}
        </View>
      </ScrollView>

      {/* Floating Button */}
      <Pressable style={styles.fab} onPress={() => setModalVisible(true)}>
        <AntDesign name="plus" size={28} color="white" />
      </Pressable>

      {/* Modal for New Folder */}
      <Modal
        transparent
        visible={modalVisible}
        animationType="fade"
        onRequestClose={() => setModalVisible(false)}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={styles.modalOverlay}>
            <TouchableWithoutFeedback onPress={() => setModalVisible(false)}>
              <View style={styles.outsideModal} />
            </TouchableWithoutFeedback>

            <View style={styles.modal}>
              <Text style={styles.modalTitle}>Add New Folder</Text>
              <TextInput
                placeholder="Folder name"
                value={newCategory}
                onChangeText={setNewCategory}
                style={styles.input}
              />
              <Pressable style={styles.modalButton} onPress={handleAddCategory}>
                <Text style={styles.modalButtonText}>Create</Text>
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

const screenWidth = Dimensions.get('window').width;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 50,
    paddingHorizontal: 20,
    backgroundColor: '#f4f9ff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  scrollContent: {
    paddingBottom: 120,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: 20,
  },
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
