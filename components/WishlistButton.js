import React, { useContext } from 'react';
import { Pressable, Text, StyleSheet } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { WishlistContext } from '../context/WishlistContext';

export function WishlistButton({ navigation }) {

  const { getItemCount } = useContext(WishlistContext);

  return (
    <Pressable style={styles.button} onPress={() => navigation.navigate('Wishlist')}>
      <MaterialIcons style={styles.icon} name="favorite" size={20} />
      <Text style={styles.text}>{getItemCount()}</Text>
    </Pressable>
  );

}

const styles = StyleSheet.create({
  button: {
    paddingVertical: 6,
    paddingHorizontal: 8,
    borderRadius: 6,
    flexDirection: 'row',
    backgroundColor: 'orange',
  },
  icon: {
    color: 'white',
  },
  text: {
    color: 'white',
    fontWeight: 'bold',
    marginLeft: 4,
  },
});