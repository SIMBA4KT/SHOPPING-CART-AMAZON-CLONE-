const cart = [];
// storing the timeout IDs here to stop old timers from hiding new messages
const addedMessageTimeouts = {};

document.querySelectorAll('.js-add-to-cart-button').forEach((button) => {
  button.addEventListener('click', () => {
    // Get Data
    const { productId } = button.dataset; // Clean destructuring
    const quantitySelector = document.querySelector(`.js-quantity-selector-${productId}`);
    const quantity = Number(quantitySelector.value);

    // Update Cart Logic 
    let matchingItem = cart.find(item => item.productId === productId);

    if (matchingItem) {
      matchingItem.quantity += quantity;
    } else {
      cart.push({ productId, quantity });
    }

    // Updating Header Quantity
    let cartQuantity = 0;
    cart.forEach(item => cartQuantity += item.quantity);
    document.querySelector('.js-cart-quantity').innerHTML = cartQuantity;

    //  Handling "Added" Message Visibility
    const addedMessage = document.querySelector(`.js-added-to-cart-${productId}`);
    addedMessage.classList.add('added-to-cart-visible');

    // Checking a previous timeout running for this product
    const previousTimeoutId = addedMessageTimeouts[productId];
    if (previousTimeoutId) {
      clearTimeout(previousTimeoutId);
    }

    const timeoutId = setTimeout(() => {
      addedMessage.classList.remove('added-to-cart-visible');
    }, 2000);

    // Save the timeout ID so we can clear it if needed
    addedMessageTimeouts[productId] = timeoutId;
  });
});