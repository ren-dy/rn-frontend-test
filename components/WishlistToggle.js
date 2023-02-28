import React, { useContext } from 'react';
import { Pressable, TouchableOpacity, StyleSheet } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { WishlistContext } from '../context/WishlistContext';

export function WishlistToggle({ product, onPress }) {

  const { isItemExist, addItem, removeItem } = useContext(WishlistContext);

  function toggleWishlist() {
    isItemExist(product) ? removeItem(product) : addItem(product);
  }

  return (
    <Pressable style={styles.roundButton} onPress={onPress ?? toggleWishlist}>
      <MaterialIcons
        style={styles.icon}
        name={isItemExist(product) ? 'favorite' : 'favorite-outline'}
        size={24} />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  roundButton: {
    width: 48,
    height: 48,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 0,
    borderRadius: 100,
    backgroundColor: 'white',
  },
  icon: {
    color: '#f66',
  },
});