import React, { useContext, useEffect, useState } from 'react';
import { Image, Pressable, View, Text, FlatList, StyleSheet } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { WishlistContext } from '../context/WishlistContext';

export function Wishlist({ navigation }) {

  const { items, removeItem, getItemCount } = useContext(WishlistContext);

  function removeWishlist(item) {
    removeItem(item);
  }

  function renderFooter() {
    let [total, setTotal] = useState(0);

    useEffect(() => {
      setTotal(getItemCount());
    });

    return (
      <View style={styles.footer}>
        <Text style={[styles.content, styles.title]}>Total: {total}</Text>
      </View>
    );
  }

  function renderItem({ item }) {
    return (
      <View style={styles.listItem}>
        <Image style={styles.image} source={item.image} />
        <View style={styles.content}>
          <Text style={styles.title}>{item.title}</Text>
          <Text style={styles.price}>Rp {item.price}</Text>
        </View>
        <Pressable style={styles.trailingButton} onPress={() => removeWishlist(item)}>
          <MaterialIcons style={styles.trailingButtonText} name="delete-outline" size={24} />
        </Pressable>
      </View>
    );
  }

  return items.length
    ? (
      <FlatList
        style={styles.list}
        data={items}
        renderItem={renderItem}
        ListFooterComponent={renderFooter}
      />
    )
    : (
      <View style={styles.noContent}>
        <Text style={styles.noContentTitle}>You don't have any wishlist.</Text>
      </View>
    );

}

const styles = StyleSheet.create({
  list: {
    marginBottom: 12,
  },
  listItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  footer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 8,
  },
  image: {
    width: 60,
    height: 60,
    borderRadius: 16,
    marginRight: 6,
  },
  content: {
    flex: 1,
  },
  title: {
    color: '#333',
    fontSize: 16,
    fontWeight: 'bold',
  },
  price: {
    color: '#666',
    fontSize: 14,
    fontWeight: '500',
  },
  trailingButton: {
    color: 'white',
    backgroundColor: 'orange',
    padding: 6,
    borderRadius: 6,
  },
  trailingButtonText: {
    color: 'white',
  },
  noContent: {
    flex: 1,
    alignItems: 'center',
    padding: 16,
  },
  noContentTitle: {
    color: '#999',
    fontSize: 18,
  },
});
