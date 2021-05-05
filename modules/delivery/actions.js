const getCustomerDetails = async () => {
    return fetch(`/assets/mocks/customer.json`).then(res => res.json());
}

export {
    getCustomerDetails
}