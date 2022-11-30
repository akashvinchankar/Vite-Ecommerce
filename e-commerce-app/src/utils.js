export function getItemsCount(cartItems) {
  return cartItems.reduce((count, cartItem) => cartItem.quantity + count, 0);
}
