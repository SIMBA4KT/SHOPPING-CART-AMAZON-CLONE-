const cart = [];
const addedMessageTimeouts = {};

// Helper to format currency for the button text
const formatCurrency = (value) => {
  return new Intl.NumberFormat('en-KE', {
    style: 'currency',
    currency: 'KES',
  }).format(value);
};

document.querySelectorAll('.js-add-to-cart-button').forEach((button) => {
  button.addEventListener('click', () => {
    const { productId } = button.dataset;

    // 1. Get the quantity from the specific selector
    const quantitySelector = document.querySelector(`.js-quantity-selector-${productId}`);
    const quantity = Number(quantitySelector.value);

    // 2. Update Cart Data
    let matchingItem = cart.find(item => item.productId === productId);
    if (matchingItem) {
      matchingItem.quantity += quantity;
    } else {
      cart.push({ productId, quantity });
    }

    // 3. Calculate Total Quantity
    let cartQuantity = 0;
    cart.forEach(item => cartQuantity += item.quantity);

    // 4. Update Header and Button Text
    document.querySelector('.cart-quantity').innerHTML = cartQuantity;
    button.innerHTML = `Add to Cart (${formatCurrency(cartQuantity)})`;

    // 5. Handling "Added" Message Visibility
    const addedMessage = document.querySelector(`.js-added-to-cart-${productId}`);
    if (addedMessage) {
      addedMessage.classList.add('added-to-cart-visible');

      // Clear existing timeout if user clicks rapidly
      if (addedMessageTimeouts[productId]) {
        clearTimeout(addedMessageTimeouts[productId]);
      }

      const timeoutId = setTimeout(() => {
        addedMessage.classList.remove('added-to-cart-visible');
      }, 2000);

      addedMessageTimeouts[productId] = timeoutId;
    }
  });
});