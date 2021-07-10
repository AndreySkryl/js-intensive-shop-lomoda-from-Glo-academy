'use strict';

import { renderCart } from './cart.js';

// блокировка скролла
const disableScroll = () => {
    if (document.disableScroll) { return; }

    const widthScroll = window.innerWidth - document.body.offsetWidth;

    document.disableScroll = true;

    document.body.dbScrollY = window.scrollY;

    document.body.style.cssText = `
        position: fixed;
        top: ${-document.body.dbScrollY}px;
        left: 0;
        width: 100%;
        height: 100vh;
        overflow: hidden;
        padding-right: ${widthScroll}px;
    `;
};

const enableScroll = () => {
    document.disableScroll = false;

    document.body.style.cssText = ``;
    window.scroll({
        top: document.body.dbScrollY
    });
};

// модальное окно
export const cartModalOpen = overlay => {
    overlay.classList.add('cart-overlay-open');

    renderCart();
    disableScroll();
};

export const cartModalClose = overlay => {
    overlay.classList.remove('cart-overlay-open');
    enableScroll();
};