function handleBay(userId) {
    document.getElementById('popup-form').style.display = 'block';
    document.getElementById('overlay').style.display = 'block';
    
    // Attach event listener to form submit
    document.getElementById('popup-form-content').addEventListener('submit', function(event) {
        event.preventDefault();
        $.ajax({
            url: '/user/create-Order',
            method: 'POST',
            contentType: "application/json",
            data: JSON.stringify({
                userId,
                productList: productsArray(),
                total: calculationTotal()
            }),
            success: function(response) {
                localStorage.removeItem("cart");
                window.location.href = '/home';
            },
            error: function(error) {
                $("#message_error").text(error?.responseJSON?.message);
            }
        });
        closePopup();
    });
}

// Function to close the popup
function closePopup() {
    document.getElementById('popup-form').style.display = 'none';
    document.getElementById('overlay').style.display = 'none';
}

// Functions for calculating total and creating products array
function calculationTotal() {
    let total = 0;
    products.map(product => total += Number(product.price) * Number(product.quantity));
    return total;
}

function productsArray() {
    let array = [];
    products.map(product => {
        item = {product: product._id, quantity: product.quantity};
        array.push(item);
    });
    return array;
}