document.addEventListener('DOMContentLoaded', () => {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    const cartList = document.getElementById('cartList');

    cart.forEach(item => {
        const cartItem = document.createElement('div');
        cartItem.classList.add('cart-item');
        cartItem.innerHTML = `
            <h2>${item.nome}</h2>
            <img src="${item.imagem}" alt="${item.nome}" class="cart-image">
            <p>Preço: R$${item.preco.toFixed(2)}</p>
        `;
        cartList.appendChild(cartItem);
    });
});

function finalizeDonation() {
    alert('Doação finalizada! Muito obrigado!');
    localStorage.removeItem('cart');
    window.location.href = 'index.html';
}
