'use strict';

import getGoods from "./service.js";
import { getLocalStorage, setLocalStorage } from "./localStorage.js";
import { deleteItemCart } from './cart.js';
import { updateCountGoodsCart } from './index.js';

export default (hash) => {
    // страница товара
    try {
        if (!document.querySelector('.card-good')) {
            throw 'This is not a card-good page';
        }

        const cardGoodImage = document.querySelector('.card-good__image');
        const cardGoodBrand = document.querySelector('.card-good__brand');
        const cardGoodTitle = document.querySelector('.card-good__title');
        const cardGoodPrice = document.querySelector('.card-good__price');
        const cardGoodColor = document.querySelector('.card-good__color');
        const cardGoodSelectWrapper = document.querySelectorAll('.card-good__select__wrapper');
        const cardGoodColorList = document.querySelector('.card-good__color-list');
        const cardGoodSizes = document.querySelector('.card-good__sizes');
        const cardGoodSizesList = document.querySelector('.card-good__sizes-list');
        const cardGoodBuy = document.querySelector('.card-good__buy');

        const generateList = data => data.reduce((html, item, i) => html +
            `<li class="card-good__select-item" data-id="${i}">${item}</li>`, '');

        const renderCardGood = ([{ id, brand, name, cost, color, sizes, photo }]) => {
            const data = { brand, name, cost, id };

            cardGoodImage.src = `goods-image/${photo}`;
            cardGoodImage.alt = `${brand} ${name}`;
            cardGoodBrand.textContent = brand;
            cardGoodTitle.textContent = name;
            cardGoodPrice.textContent = `${cost} ₽`;
            if (color) {
                cardGoodColor.textContent = color[0];
                cardGoodColor.dataset.id = 0;
                cardGoodColorList.innerHTML = generateList(color);
            } else {
                cardGoodColor.style.display = 'none';
            }

            if (sizes) {
                cardGoodSizes.textContent = sizes[0];
                cardGoodSizes.dataset.id = 0;
                cardGoodSizesList.innerHTML = generateList(sizes);
            } else {
                cardGoodSizes.style.display = 'none';
            }

            if (getLocalStorage().some(item => item.id === id)) {
                cardGoodBuy.classList.add('delete');
                cardGoodBuy.textContent = 'Удалить из корзины';
            }

            cardGoodBuy.addEventListener('click', () => {
                if (cardGoodBuy.classList.contains('delete')) {
                    deleteItemCart(id);
                    cardGoodBuy.classList.remove('delete');
                    cardGoodBuy.textContent = 'Добавить в корзину';
                    return;
                }

                if (color) { data.color = cardGoodColor.textContent; }
                if (sizes) { data.size = cardGoodSizes.textContent; }

                cardGoodBuy.classList.add('delete');
                cardGoodBuy.textContent = 'Удалить из корзины';

                const cardData = getLocalStorage();
                cardData.push(data);
                setLocalStorage(cardData);
                updateCountGoodsCart();
            });
        };

        cardGoodSelectWrapper.forEach(item => {
            item.addEventListener('click', e => {
                const target = e.target;

                if (target.closest('.card-good__select')) {
                    target.classList.toggle('card-good__select__open');
                }

                if (target.closest('.card-good__select-item')) {
                    const cardGoodSelect = item.querySelector('.card-good__select');
                    cardGoodSelect.textContent = target.textContent;
                    cardGoodSelect.dataset.id = target.dataset.id;
                    cardGoodSelect.classList.remove('card-good__select__open');
                }
            });
        });

        getGoods(renderCardGood, 'id', hash);
    } catch (err) {
        console.warn(err);
    }
};