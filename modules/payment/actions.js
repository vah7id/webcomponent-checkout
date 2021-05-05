
const validatePayment = async (orderId, paymentId) => {
    return fetch(`/assets/mocks/payment_validate_${paymentId}.json`, {
        method: "POST",
        body: JSON.stringify({orderId})
    }).then(res => res.json())
}

const fetchPaymentOptions = async () => {
    return fetch(`/assets/mocks/payment_options.json`).then(res => res.json());
}

const reserveBasket = async (basketItems) => {
    return fetch(`/assets/mocks/reserve_basket.json`,{
        method: 'POST', body: JSON.stringify(basketItems)
    }).then(res => res.json());
}

export {
    validatePayment,
    fetchPaymentOptions,
    reserveBasket
}
