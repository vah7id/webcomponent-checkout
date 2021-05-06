
const getBasketItems = async () => {
    return fetch(`/assets/mocks/basket.json`).then(res => res.json());
}

export {
    getBasketItems
}
