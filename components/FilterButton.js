import { Pressable, StyleSheet, Text } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

export function FilterButton({ text, onPress }) {

  return (
    <Pressable style={styles.button} onPress={onPress}>
      <MaterialIcons style={styles.icon} name="tune" size={20} />
      <Text style={styles.text}>{text}</Text>
    </Pressable>
  );

}

const styles = StyleSheet.create({
  button: {
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: '#666',
    flexDirection: 'row',
  },
  icon: {
    color: '#666',
  },
  text: {
    color: '#666',
    fontWeight: 'bold',
    marginLeft: 4,
  },
});