'use strict';
import { getLocalStorage, setLocalStorage } from './localStorage.js';
import { updateCountGoodsCart } from './index.js';

const cartListGoods = document.querySelector('.cart__list-goods');
const cartTotalCost = document.querySelector('.cart__total-cost');

export const renderCart = () => {
    cartListGoods.textContent = '';

    const cartItems = getLocalStorage();

    let totalPrice = 0;

    cartItems.forEach((item, i) => {
        const tr = document.createElement('tr');

        tr.innerHTML = `
            <td>${i + 1}</td>
            <td>${item.brand} ${item.name}</td>
            ${item.color ? `<td>${item.color}</td>` : `<td>-</td>`}
            ${item.size ? `<td>${item.size}</td>` : `<td>-</td>`}
            <td>${item.cost} &#8381;</td>
            <td><button class="btn-delete" data-id="${item.id}">&times;</button></td>
        `;

        totalPrice += item.cost;

        cartListGoods.append(tr);
    });

    cartTotalCost.textContent = totalPrice + ' ₽';
};

export const deleteItemCart = id => {
    const cartItems = getLocalStorage();
    const newCartItems = cartItems.filter(item => item.id !== id);
    setLocalStorage(newCartItems);
    updateCountGoodsCart();
};

cartListGoods.addEventListener('click', e => {
    if (e.target.matches('.btn-delete')) {
        deleteItemCart(e.target.dataset.id);
        renderCart();
    }
});