import React, { useEffect, useState, useContext } from 'react';
import {
  ActivityIndicator,
  FlatList,
  Text,
  Image,
  Pressable,
  View,
  ScrollView,
  SafeAreaView,
  Button,
  StyleSheet
} from 'react-native';
import moment from 'moment';
import { getProduct, getReviews } from '../services/ProductService';
import { StarRating } from '../components/StarRating';
import { WishlistToggle } from '../components/WishlistToggle';
import { UserReview } from '../components/UserReview';

export function ProductDetail({ route }) {

  const { productId } = route.params;

  const [product, setProduct] = useState({});

  const [reviews, setReviews] = useState([]);

  const [reviewPerPage, setReviewPerPage] = useState(0);

  const [loading, setLoading] = useState('product');

  useEffect(() => {
    loadProduct();
  }, []);

  async function loadProduct() {
    let count = 5;
    setReviewPerPage(count);

    setLoading('getting-product');
    try {
      let res = await Promise.all([
        getProduct(productId),
        getReviews(productId, count),
      ]);

      setLoading(undefined);
      setProduct(res[0]);
      setReviews(res[1].data);
    } catch (error) {
      setLoading(undefined);
      console.log('Error while getting product.', error);
    }
  }

  async function loadReviews(limit) {
    setLoading('getting-reviews');
    try {
      let res = await getReviews(productId, limit);
      setLoading(undefined);
      setReviews(res.data);
    } catch (error) {
      setLoading(undefined);
      console.log('Error while getting reviews.', error);
    }
  }

  function loadMoreReviews() {
    let reviewCount = reviewPerPage + 5;
    setReviewPerPage(reviewCount);
    loadReviews(reviewCount);
  }

  function renderHeader() {
    return (
      <View>
        {
          product.image
            ? <Image style={styles.image} source={product.image} />
            : undefined
        }
        <View style={styles.content}>
          <View style={styles.favorite}>
            <WishlistToggle product={product} />
          </View>
          <Text style={styles.price}>Rp {product.price}</Text>
          <Text style={styles.title}>{product.title}</Text>

          <View style={styles.badgeContainer}>
            {
              moment(product.createdAt).isAfter(moment().subtract(1, 'week'))
                ? (
                  <View style={[styles.badge, styles.badgeNew]}>
                    <Text style={styles.badgeText}>NEW</Text>
                  </View>
                )
                : undefined
            }
            {
              product.reviewCount > 20 && product.rating > 4
                ? (
                  <View style={[styles.badge, styles.badgeBestSeller]}>
                    <Text style={styles.badgeText}>BEST SELLER</Text>
                  </View>
                )
                : undefined
            }
            {
              (
                moment(product.createdAt).isAfter(moment().subtract(1, 'week'))
                && product.reviewCount > 20
                && product.rating > 4
              )
                ? (
                  <View style={[styles.badge, styles.badgeHot]}>
                    <Text style={styles.badgeText}>HOT</Text>
                  </View>
                )
                : undefined
            }
          </View>

          {
            product.rating
              ? <StarRating rating={product.rating} totalReview={product.reviewCount} />
              : undefined
          }

          <Text style={styles.text}>{product.desc}</Text>

          <View>
            <Text style={styles.title}>
              {
                product?.reviewCount
                  ? `Reviews (${product.reviewCount})`
                  : 'No review yet.'
              }
            </Text>
          </View>
        </View>
      </View>
    );
  }

  function renderFooter() {
    return loading == 'getting-reviews'
      ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator />
        </View>
      )
      : (
        reviewPerPage < product.reviewCount
          ? (
            <Pressable style={styles.loadMoreButton} onPress={loadMoreReviews}>
              <Text style={styles.loadMoreButtonText}>LOAD MORE REVIEWS</Text>
            </Pressable>
          )
          : undefined
      );
  }

  function renderReview({ item: review }) {
    return (
      <UserReview review={review} />
    );
  }

  return loading == 'getting-product'
    ? (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" />
      </View>
    )
    : (
      <SafeAreaView>
        <FlatList
          // contentContainerStyle={styles.productsListContainer}
          keyExtractor={(item) => item.id.toString()}
          ListHeaderComponent={renderHeader}
          ListFooterComponent={renderFooter}
          data={reviews}
          renderItem={renderReview}
        />
      </SafeAreaView>
    );
}

const styles = StyleSheet.create({
  content: {
    padding: 12,
  },
  image: {
    height: 300,
    width: '100%'
  },
  title: {
    color: '#666',
    fontSize: 18,
    fontWeight: '500',
    marginBottom: 6,
  },
  text: {
    color: '#999',
    fontSize: 16,
    marginBottom: 24,
  },
  price: {
    color: '#666',
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  favorite: {
    position: 'absolute',
    transform: [{ translateY: -24 }],
    top: 0,
    right: 10,
    zIndex: 2,
  },
  badgeContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  badge: {
    marginRight: 4,
    marginBottom: 4,
    borderRadius: 6,
    paddingVertical: 2,
    paddingHorizontal: 8,
    backgroundColor: 'grey',
  },
  badgeNew: {
    backgroundColor: '#77f',
  },
  badgeBestSeller: {
    backgroundColor: '#6a6',
  },
  badgeHot: {
    backgroundColor: '#f55',
  },
  badgeText: {
    color: 'white',
    fontSize: 12,
    fontWeight: 'bold',
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