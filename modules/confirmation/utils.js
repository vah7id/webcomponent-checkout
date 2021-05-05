const isAddressValid = (address) => {
    return address?.street && address?.city && address?.postalCode;
}

export {
    isAddressValid
}