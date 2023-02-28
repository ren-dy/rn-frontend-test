import React, { useContext, useEffect, useState } from 'react';
import { ActivityIndicator, FlatList, Pressable, StyleSheet, Text, View } from 'react-native';
import { Product } from '../components/Product.js';
import { FilterModal } from '../components/FilterModal';
import { getProducts } from '../services/ProductService.js';
import { FilterButton } from '../components/FilterButton';

export function ProductList({ navigation }) {

  const [oriProducts, setOriProducts] = useState([]);

  const [products, setProducts] = useState([]);

  const [itemsPerPage, setItemsPerPage] = useState(5);

  const [filters, setFilters] = useState([]);

  const [isModalVisible, setModalVisible] = useState(false);

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setItemsPerPage(5);
    getItems(5);
  }, []);

  function getFilteredProducts(products, filters, isProductsFromFetch = false) {
    let filteredProducts = [...products];

    if (
      oriProducts.length
      && !isProductsFromFetch
      // && (!filters?.length || !filters.filter(f => f.startsWith('filter')).length)
    ) {
      filteredProducts = [...oriProducts];
    }

    for (let f of filters) {
      switch (f) {
        case 'sort-price-asc':
          filteredProducts.sort((a, b) => a.price - b.price);
          break;

        case 'sort-price-desc':
          filteredProducts.sort((a, b) => b.price - a.price);
          break;

        case 'filter-rating-4-above':
          filteredProducts = filteredProducts.filter(p => p.rating >= 4);
          break;
      }
    }

    return filteredProducts;
  }

  function toggleModal() {
    setModalVisible(!isModalVisible);
  }

  async function getItems(limit) {
    setLoading(true);
    try {
      let res = await getProducts(limit);
      setLoading(false);

      setOriProducts(res);
      setProducts(getFilteredProducts(res, filters, true));
    } catch (error) {
      setLoading(false);
      console.log('Error while getting products.', error);
    }
  }

  function loadMoreItems() {
    let count = itemsPerPage + 5;
    setItemsPerPage(count);
    getItems(count);
  }

  function applyFilters(filters) {
    setProducts(getFilteredProducts(products, filters));
    setFilters(filters);
  }

  function renderFooter() {
    return loading
      ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator />
        </View>
      )
      : (
        itemsPerPage <= oriProducts?.length
          ? (
            <Pressable style={styles.loadMoreButton} onPress={loadMoreItems}>
              <Text style={styles.loadMoreButtonText}>LOAD MORE PRODUCTS</Text>
            </Pressable>
          )
          : undefined
      );
  }

  function renderProduct({ item: product }) {
    return (
      <Product
        {...product}
        onPress={() => {
          navigation.navigate('ProductDetail', {
            productId: product.id,
          });
        }}
      />
    );
  }

  return (
    <View>
      <View style={styles.listControl}>
        <FilterButton text="Filter" onPress={toggleModal} />
      </View>

      <FlatList
        style={styles.list}
        contentContainerStyle={styles.productsListContainer}
        keyExtractor={(item) => item.id.toString()}
        ListFooterComponent={renderFooter}
        data={products}
        renderItem={renderProduct}
      />

      <FilterModal
        isVisible={isModalVisible}
        onClose={toggleModal}
        products={products}
        filters={filters}
        onFiltersChange={f => applyFilters(f)}
      />
    </View>
  );

}
const styles = StyleSheet.create({
  list: {
    backgroundColor: '#eee',
    marginTop: 48,
  },
  listControl: {
    position: 'absolute',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 8,
    width: '100%',
    height: 48,
    backgroundColor: 'white',
    zIndex: 2,
  },
  loadMoreButton: {
    backgroundColor: 'orange',
    height: 48,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadMoreButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  loadingContainer: {
    height: 48,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});