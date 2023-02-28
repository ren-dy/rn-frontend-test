import { Pressable, StyleSheet, Text, View } from 'react-native';
import Modal from 'react-native-modal';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

export function FilterModal({
  products,
  filters,
  onFiltersChange,
  onClose,
  isVisible,
}) {

  const buttons = {
    'Sort': [
      { id: 'sort-price-asc', name: 'Lowest price' },
      { id: 'sort-price-desc', name: 'Highest price' },
    ],
    'Rating': [
      { id: 'filter-rating-4-above', name: '4 above', icon: 'star' },
    ],
  };

  function getFilters(filterName) {
    let newFilters = parseFilters(filterName);
    onFiltersChange(newFilters);
  }

  function parseFilters(newFilter) {
    let newFilters = [...filters];

    if (newFilters.includes(newFilter)) {
      let removeId = newFilters.indexOf(newFilter);
      if (removeId > -1) newFilters.splice(removeId, 1);
    } else if (newFilter.startsWith('sort-price')) {
      let sortId = newFilters.findIndex(f => f.startsWith('sort-price'));
      if (sortId > -1) {
        newFilters.splice(sortId, 1, newFilter);
      } else {
        newFilters.push(newFilter);
      }
    } else {
      newFilters.push(newFilter);
    }

    return newFilters;
  }

  function isSelected(filter) {
    return filters.includes(filter);
  }

  return (
    <Modal
      style={styles.modal}
      propagateSwipe
      isVisible={isVisible}
      onBackButtonPress={onClose}
      onBackdropPress={onClose}
      onSwipeComplete={onClose}
      swipeDirection={['down']}>
      <View style={styles.modalContent}>
        <Text style={styles.title}>
          Filter ({products?.length})
        </Text>

        {
          Object.keys(buttons).map(key => {
            return (
              <View key={key}>
                <Text style={[styles.title, styles.sectionTitle]}>{key}</Text>
                <View style={styles.section}>
                  {
                    buttons[key].map(btn => {
                      return (
                        <Pressable
                          key={btn.id}
                          style={[
                            styles.button, isSelected(btn.id)
                              ? styles.buttonSelected
                              : undefined
                          ]}
                          onPress={() => getFilters(btn.id)}>
                          {
                            btn.icon
                              ? (
                                <MaterialIcons style={styles.buttonIcon} name={btn.icon} size={20}></MaterialIcons>
                              )
                              : undefined
                          }
                          <Text style={[
                            styles.buttonText, isSelected(btn.id)
                              ? styles.buttonTextSelected
                              : undefined
                          ]}>{btn.name}</Text>
                        </Pressable>
                      );
                    })
                  }
                </View>
              </View>
            );
          })
        }
      </View>
    </Modal>
  );

}

const styles = StyleSheet.create({
  modal: {
    justifyContent: 'flex-end',
    margin: 0,
  },
  modalContent: {
    backgroundColor: '#eee',
    padding: 16,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
  },
  title: {
    color: '#666',
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 12,
  },

  section: {
    // flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 18,
    marginBottom: 0,
  },

  button: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 6,
    borderWidth: 1,
    borderColor: '#666',
    paddingVertical: 6,
    paddingHorizontal: 12,
    marginRight: 4,
  },
  buttonIcon: {
    color: '#ffa000',
  },
  buttonText: {
    color: '#666',
    fontSize: 18,
    fontWeight: '500',
  },

  buttonSelected: {
    borderColor: 'orange',
  },
  buttonTextSelected: {
    color: 'orange',
  },
});
