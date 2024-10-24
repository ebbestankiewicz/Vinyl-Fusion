document.addEventListener('DOMContentLoaded', function() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const cartItemsContainer = document.getElementById('cart-items');
    const proceedButton = document.getElementById('proceed-to-checkout');

    // Function to update the cart display
    function updateCartDisplay() {
        cartItemsContainer.innerHTML = ""; // Clear existing items

        if (cart.length === 0) {
            cartItemsContainer.innerHTML = "<p>Your shopping bag is empty.</p>";
            return;
        }

        let totalAmount = 0;

        cart.forEach((item, index) => {
            const itemTotal = parseFloat(item.price);

            // Create an HTML structure for each cart item
            const cartItemDiv = document.createElement('div');
            cartItemDiv.classList.add('cart-item');
            cartItemDiv.innerHTML = `
                <div class="cart-product">
                    <img src="${item.image}" alt="${item.title}" style="width: 100px; height: auto;">
                    <div>
                        <h2>${item.title}</h2>
                        <p>Price: ${item.price} NOK</p>
                    </div>
                </div>
                <div class="cart-total">
                    <p>${itemTotal} NOK</p>
                    <button class="remove-item">Remove</button>
                </div>
            `;

            totalAmount += itemTotal; // Add item price to total amount
            cartItemsContainer.appendChild(cartItemDiv); // Append the item to the cart container

            // Add event listener for the remove button
            const removeButton = cartItemDiv.querySelector('.remove-item');
            removeButton.addEventListener('click', function() {
                cart.splice(index, 1); // Remove item from cart
                localStorage.setItem('cart', JSON.stringify(cart)); // Update localStorage
                updateCartDisplay(); // Rebuild cart display
            });
        });

        // Display the total amount
        const totalDiv = document.createElement('div');
        totalDiv.classList.add('cart-total-amount');
        totalDiv.innerHTML = `
            <h2>Total:</h2>
            <p>${totalAmount} NOK</p>
        `;
        cartItemsContainer.appendChild(totalDiv);
    }

    // Event listener for the proceed to checkout button
    if (proceedButton) {
        proceedButton.addEventListener('click', function() {
            // Save the current cart to localStorage for confirmation page
            localStorage.setItem('cart', JSON.stringify(cart));
            
            // Redirect to confirmation page
            window.location.href = 'confirmation.html';
        });
    }

    // Display the cart items on page load (for checkout page)
    if (cartItemsContainer) {
        updateCartDisplay();
    }

    // Confirmation page handling
    if (window.location.pathname.includes('confirmation.html')) {
        const orderSummaryContainer = document.getElementById('order-summary');
        orderSummaryContainer.innerHTML = ""; // Clear previous content

        if (cart.length === 0) {
            orderSummaryContainer.innerHTML = "<p>No items found in your order.</p>";
            return;
        }

        let totalAmount = 0;

        cart.forEach(item => {
            totalAmount += parseFloat(item.price);
            
            const itemDiv = document.createElement('div');
            itemDiv.classList.add('order-item');
            itemDiv.innerHTML = `
                <h3>${item.title}</h3>
                <p>Price: ${item.price} NOK</p>
            `;
            orderSummaryContainer.appendChild(itemDiv);
        });

        // Display total amount
        const totalDiv = document.createElement('div');
        totalDiv.classList.add('order-total');
        totalDiv.innerHTML = `<h2>Total Amount: ${totalAmount} NOK</h2>`;
        orderSummaryContainer.appendChild(totalDiv);
    }
});








