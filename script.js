let cart = [];
let total = 0;

// Add to Cart functionality
document.querySelectorAll('.add-to-cart').forEach(button => {
    button.addEventListener('click', (e) => {
        const bookPrice = parseInt(e.target.parentElement.querySelector('p').innerText.replace('Price: ₹', ''));
        const bookName = e.target.parentElement.querySelector('h3').innerText;
        cart.push({ name: bookName, price: bookPrice });
        updateCart();
    });
});

// Update Cart
function updateCart() {
    const cartItems = document.getElementById('cart-items');
    cartItems.innerHTML = '';
    total = 0;
    cart.forEach(book => {
        cartItems.innerHTML += `<p>${book.name}: ₹${book.price}</p>`;
        total += book.price;
    });
    document.getElementById('total-price').innerText = total;
}

// Checkout with Rojapay
document.getElementById('checkout-button').addEventListener('click', () => {
    if (total > 0) {
        var options = {
            "key": "YOUR_ROJAPAY_API_KEY", // Replace with your Rojapay API key
            "amount": total * 100, // Convert amount to paisa for Rojapay (1 INR = 100 paisa)
            "currency": "INR",
            "name": "E-Commerce Store",
            "description": "Purchase of Products",
            "handler": function (response) {
                alert("Payment successful! Payment ID: " + response.razorpay_payment_id);
                // Optionally clear the cart here
                cart = [];
                total = 0;
                updateCart();
            },
            "prefill": {
                "name": "Customer Name",
                "email": "customer.email@example.com",
                "contact": "9999999999"
            },
            "theme": {
                "color": "#28a745"
            }
        };

        // Create the Rojapay payment handler
        var rzp1 = new Rojapay(options);
        rzp1.open();
    } else {
        alert("Your cart is empty!");
    }
});

// Contact form submission
document.getElementById('contact-form').addEventListener('submit', function(e) {
    e.preventDefault(); // Prevent default form submission
    alert('Thank you for your message! We will get back to you soon.');
});

// Search Functionality
document.getElementById('search-button').addEventListener('click', () => {
    const searchQuery = document.getElementById('search-input').value.toLowerCase();
    const products = document.querySelectorAll('.product');

    products.forEach(product => {
        const productName = product.getAttribute('data-name').toLowerCase();
        if (productName.includes(searchQuery)) {
            product.style.display = 'block'; // Show matching products
        } else {
            product.style.display = 'none'; // Hide non-matching products
        }
    });
});
