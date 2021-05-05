const skuValidator = (item, modelValue) => {
    return modelValue > item.availableStock ? 'OUT OF STOCK' : ''
}

export {
    skuValidator
}