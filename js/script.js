document.addEventListener('DOMContentLoaded', () => {
    fetch('products-data.json')
        .then(response => response.json())
        .then(data => {
            const productList = document.getElementById('productList');
            data.forEach(product => {
                const productItem = document.createElement('div');
                productItem.classList.add('product-item');
                productItem.innerHTML = `
                    <h2>${product.nome}</h2>
                    <img src="${product.imagem}" alt="${product.nome}" class="product-image">
                    <p>Preço: R$${product.preco.toFixed(2)}</p>
                    <button onclick="addToCart('${product.nome}', ${product.preco}, '${product.imagem}')">Adicionar ao Carrinho</button>
                `;
                productList.appendChild(productItem);
            });
        });
});

function addToCart(nome, preco, imagem) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    cart.push({ nome, preco, imagem });
    localStorage.setItem('cart', JSON.stringify(cart));
    alert(`Produto ${nome} adicionado ao carrinho a R$${preco.toFixed(2)}`);
}

function goToCart() {
    window.location.href = 'checkout.html';
}
