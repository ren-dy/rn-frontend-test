import { createContext, useState } from 'react';

export const WishlistContext = createContext();

export function WishlistProvider(props) {

  const [items, setItems] = useState([]);

  async function addItem(product) {
    setItems(items => {
      const itemFound = items.find(i => i.id == product.id);

      if (!itemFound) {
        return [
          ...items,
          product,
        ];
      } else {
        return items;
      }
    });
  }

  function removeItem(product) {
    setItems(prevItems => {
      let removedId = items.findIndex(i => i.id == product.id);
      return prevItems.filter((i, id) => id != removedId);
    });
  }

  function isItemExist(product) {
    const itemFound = items.find(i => i.id == product.id);

    return Boolean(itemFound);
  }

  function getItemCount() {
    return items.length;
  }

  return (
    <WishlistContext.Provider
      value={{ items, setItems, addItem, removeItem, isItemExist, getItemCount }}>
      {props.children}
    </WishlistContext.Provider>
  );

}