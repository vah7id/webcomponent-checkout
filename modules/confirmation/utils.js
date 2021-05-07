const isAddressValid = (address) => {
    if(address?.street && address?.city && address?.postalCode) {
        return true;
    }
    return false;
}

export {
    isAddressValid
}