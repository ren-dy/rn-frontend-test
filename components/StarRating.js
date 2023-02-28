import { StyleSheet, Text, View } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

export function StarRating({ rating, totalReview, size = 20 }) {

  const total = 5;

  function getFullCount() {
    let floor = Math.floor(rating);
    let decimal = rating - floor;
    return decimal >.75 ? floor + 1 : floor;
  }

  function getHalfCount() {
    let decimal = rating - Math.floor(rating);
    return decimal > .25 && decimal < .75 ? 1 : 0;
  }

  function getEmptyCount() {
    return total - getFullCount() - getHalfCount();
  }

  return (
    <View style={styles.container}>
      {
        Array.from({length: getFullCount()}, (v, i) => {
          return (
            <MaterialIcons key={i} name="star" size={size} color="#ffa000"/>
          );
        })
      }
      {
        Array.from({length: getHalfCount()}, (v, i) => {
          return (
            <MaterialIcons key={i} name="star-half" size={size} color="#ffa000"/>
          );
        })
      }
      {
        Array.from({length: getEmptyCount()}, (v, i) => {
          return (
            <MaterialIcons key={i} name="star-border" size={size} color="#ffa000"/>
          );
        })
      }
      <Text style={styles.text}>{rating}</Text>
      <Text style={styles.text}>({totalReview})</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginVertical: 2,
  },
  text: {
    color: '#666',
    marginLeft: 4,
    fontWeight: 'bold',
  }
});