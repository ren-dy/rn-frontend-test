import React from 'react';
import { StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { ProductList } from './screens/ProductList';
import { ProductDetail } from './screens/ProductDetail';
import { Wishlist } from './screens/Wishlist';
import { WishlistButton } from './components/WishlistButton';
import { WishlistProvider } from './context/WishlistContext';

const Stack = createNativeStackNavigator();

function App() {
  return (
    <WishlistProvider>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name='Products' component={ProductList}
            options={({ navigation }) => ({
              title: 'Products',
              headerTitleStyle: styles.headerTitle,
              headerRight: () => <WishlistButton navigation={navigation} />
            })} />
          <Stack.Screen name='ProductDetail' component={ProductDetail}
            options={({ navigation }) => ({
              title: 'Product detail',
              headerTitleStyle: styles.headerTitle,
              headerRight: () => <WishlistButton navigation={navigation} />,
            })} />
          <Stack.Screen name='Wishlist' component={Wishlist}
            options={({ navigation }) => ({
              title: 'My Wishlist',
              headerTitleStyle: styles.headerTitle,
            })} />
        </Stack.Navigator>
      </NavigationContainer>
    </WishlistProvider>
  );
}
const styles = StyleSheet.create({
  headerTitle: {
    fontSize: 20
  }
});
export default App;