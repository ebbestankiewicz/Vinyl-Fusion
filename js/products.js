document.getElementById('add-to-cart').addEventListener('click', function() {
    const product = {
        title: document.getElementById('product-title').textContent,
        price: document.getElementById('product-price').textContent,
        image: document.querySelector('#product-details img').src,
    };

    // Retrieve existing cart data or create a new array if it doesn't exist
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    cart.push(product);

    // Save the updated cart back to localStorage
    localStorage.setItem('cart', JSON.stringify(cart));

    alert(`${product.title} has been added to your cart!`);
});


