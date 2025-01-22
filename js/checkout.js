document.addEventListener('DOMContentLoaded', () => {
    const stripe = Stripe('pk_test_51QkBuyHH7ykn4D8G4IwqrhbYZEBUF7JYlrn9t3JftQETrrN0DhDmU2dMRGeFsWyfeOTof36GFbKLDlK00B9bbcir00hbXJu7nv');
    const elements = stripe.elements();
    const card = elements.create('card');
    card.mount('#card-element');

    document.getElementById('paymentForm').addEventListener('submit', function(event) {
        event.preventDefault();

        stripe.createToken(card).then(function(result) {
            if (result.error) {
                const errorElement = document.getElementById('card-errors');
                errorElement.textContent = result.error.message;
            } else {
                stripeTokenHandler(result.token);
            }
        });
    });

    function stripeTokenHandler(token) {
        // Prepare the form elements
        const form = document.getElementById('paymentForm');
        const hiddenInput = document.createElement('input');
        hiddenInput.setAttribute('type', 'hidden');
        hiddenInput.setAttribute('name', 'stripeToken');
        hiddenInput.setAttribute('value', token.id);
        form.appendChild(hiddenInput);

        // Submit the form via AJAX
        fetch('/charge', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                token: token.id,
                amount: calcularTotalDoacao()  // Função que calcula o valor total da doação
            })
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                alert('Pagamento realizado com sucesso! Obrigado pela doação.');
                localStorage.removeItem('cart');
                window.location.href = 'index.html';
            } else {
                alert(`Erro: ${data.error}`);
            }
        })
        .catch(error => {
            console.error('Erro:', error);
            alert('Ocorreu um erro ao processar o pagamento.');
        });
    }

    function calcularTotalDoacao() {
        let cart = JSON.parse(localStorage.getItem('cart')) || [];
        // Calcule o total aqui com base nos itens do carrinho
        let total = cart.reduce((sum, item) => sum + item.preco, 0);
        return total * 100; // Retorna o total em centavos para Stripe
    }
});
