'use strict';
import { cartModalOpen, cartModalClose } from './modal.js';
import pageCategory from './pageCategory.js';
import pageCardGood from './pageCardGood.js';
import { getLocalStorage } from "./localStorage.js";

let hash = location.hash.substring(1);

pageCategory(hash);
pageCardGood(hash);

const headerCityButton = document.querySelector('.header__city-button');

const subheaderCart = document.querySelector('.subheader__cart');
const cartOverlay = document.querySelector('.cart-overlay');

const updateLocation = () => {
    const lsLocation = localStorage.getItem('lomoda-location');
    headerCityButton.textContent =
        lsLocation && lsLocation !== 'null'
            ? lsLocation
            : 'Ваш город?';
};
updateLocation();

const declOfNum = (n, titles) => {
    return n + ' ' + titles[n % 10 === 1 && n % 100 !== 11 ?
        0 : n % 10 >= 2 && n % 10 <= 4 && (n % 100 < 10 || n % 100 >= 20) ? 1 : 2];
}

export const updateCountGoodsCart = () => {
    if (getLocalStorage().length) {
        subheaderCart.textContent = declOfNum(getLocalStorage().length, ['товар', 'товара', 'товара']);
    } else {
        subheaderCart.textContent = 'Корзина';
    }
};
updateCountGoodsCart();

// закрытие окна по ESC
document.body.addEventListener('keydown', event => {
    if (event.code === 'Escape') {
        cartModalClose(cartOverlay);
    }
});

subheaderCart.addEventListener('click', cartModalOpen.bind(null, cartOverlay));

headerCityButton.addEventListener('click', () => {
    const city = prompt('Укажите Ваш город');
    if (city !== null) {
        localStorage.setItem('lomoda-location', city);
    }
    updateLocation();
});

cartOverlay.addEventListener('click', event => {
    const target = event.target;

    if (target.matches('.cart__btn-close') || target.matches('.cart-overlay')) {
        cartModalClose(cartOverlay);
    }
});
