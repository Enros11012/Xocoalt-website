document.addEventListener('DOMContentLoaded', () => {
    // Ejemplo: efecto de scroll suave para los enlaces de navegación
    document.querySelectorAll('nav a').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // Funcionalidad del carrito de compras
    let cart = [];

    const cartCountElement = document.getElementById('cart-count');
    const cartItemsElement = document.getElementById('cart-items');
    const totalPriceElement = document.getElementById('total-price');

    document.querySelectorAll('.add-to-cart').forEach(button => {
        button.addEventListener('click', (event) => {
            const productItem = event.target.closest('.producto-item');
            const productName = productItem.querySelector('h3').textContent;
            const productPrice = parseFloat(productItem.querySelector('.price').textContent.replace('$', ''));

            // Añadir el producto al carrito
            cart.push({ name: productName, price: productPrice });

            // Actualizar el conteo y los elementos del carrito
            updateCart();
        });
    });

    function updateCart() {
        cartCountElement.innerText = cart.length;
        cartItemsElement.innerHTML = '';
        let totalPrice = 0;

        cart.forEach(item => {
            totalPrice += item.price;
            const li = document.createElement('li');
            li.textContent = `${item.name} - $${item.price.toFixed(2)}`;
            cartItemsElement.appendChild(li);
        });

        totalPriceElement.textContent = `Total: $${totalPrice.toFixed(2)}`;
    }

    // Funcionalidad de búsqueda de productos
    const searchBar = document.getElementById('search-bar');
    const productItems = document.querySelectorAll('.producto-item');

    searchBar.addEventListener('input', () => {
        const query = searchBar.value.toLowerCase();

        productItems.forEach(item => {
            const productName = item.querySelector('h3').textContent.toLowerCase();
            if (productName.includes(query)) {
                item.style.display = '';
            } else {
                item.style.display = 'none';
            }
        });
    });
});

// Función para mostrar u ocultar el carrito
function toggleCart() {
    const cart = document.getElementById('cart');
    cart.classList.toggle('active');
}
