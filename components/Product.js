import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { StarRating } from './StarRating';

export function Product({ title, subDesc, price, rating, reviewCount, image, onPress }) {

  return (
    <TouchableOpacity style={styles.card} onPress={onPress}>
      <Image style={styles.image} source={image} />
      <View style={styles.cardBody}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.text}>{subDesc}</Text>
        <Text style={[styles.text, styles.price]}>Rp {price}</Text>
        {
          rating
            ? <StarRating rating={rating} totalReview={reviewCount} />
            : undefined
        }
      </View>
    </TouchableOpacity>
  );

}

// type Props = {
//   name: string,
//   price: number,
//   image: string,
//   onPress: () => void,
// };

const styles = StyleSheet.create({
  card: {
    backgroundColor: 'white',
    borderRadius: 16,
    shadowOpacity: 0.2,
    shadowRadius: 4,
    shadowColor: 'black',
    shadowOffset: {
      height: 0,
      width: 0,
    },
    elevation: 1,
    marginVertical: 8,
    marginHorizontal: 8,
  },
  image: {
    height: 260,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    width: '100%',
  },
  cardBody: {
    padding: 16,
  },
  title: {
    color: '#666',
    fontSize: 20,
    fontWeight: 'bold',
  },
  text: {
    fontSize: 16,
    color: '#999',
    // fontWeight: '500',
  },
  price: {
    color: '#666',
    fontWeight: 'bold',
    fontSize: 16,
  }
});