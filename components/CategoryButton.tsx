import { useRouter } from 'expo-router';
import { Image, Pressable, StyleSheet, Text, View } from 'react-native';

interface Props {
  label: string;
}

// Define icon mappings for known folders
const iconMap: Record<string, any> = {
  You: require('../assets/images/you.png'),
  Home: require('../assets/images/home.png'),
  Love: require('../assets/images/love.png'),
  Family: require('../assets/images/family.png'),
  Friends: require('../assets/images/friends.png'),
  School: require('../assets/images/school.png'),
};

// Fallback to default folder icon
const defaultIcon = require('../assets/images/folder-icon.png');

export default function CategoryButton({ label }: Props) {
  const router = useRouter();

  const icon = iconMap[label] || defaultIcon;

  return (
    <Pressable style={styles.shadow} onPress={() => router.push('/' + encodeURIComponent(label))}>
      <View style={styles.button}>
        <Image source={icon} style={styles.icon} resizeMode="contain" />
        <Text style={styles.text}>{label}</Text>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  shadow: {
    margin: 10,
    borderRadius: 20,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  button: {
    width: 120,
    height: 120,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
  },
  icon: {
    width: 50,
    height: 50,
    marginBottom: 10,
  },
  text: {
    color: '#000',
    fontWeight: '600',
    fontSize: 14,
    textAlign: 'center',
  },
});
