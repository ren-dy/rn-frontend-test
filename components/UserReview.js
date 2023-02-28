import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

export function UserReview({ review }) {

  return (
    <View style={styles.listItem}>
      <MaterialIcons style={styles.icon} name="person" size={24}></MaterialIcons>
      <View style={styles.content}>
        <Text style={styles.title}>{review.email}</Text>
        <Text style={styles.text}>{review.name}</Text>
      </View>
    </View>
  );

}

const styles = StyleSheet.create({
  listItem: {
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    paddingVertical: 8,
    paddingHorizontal: 16,
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  content: {
    flex: 1,
    marginLeft: 16,
  },
  title: {
    color: '#666',
    fontSize: 16,
    fontWeight: 'bold',
  },
  text: {
    fontSize: 16,
    color: '#999',
  },
  icon: {
    color: '#666',
  },
});