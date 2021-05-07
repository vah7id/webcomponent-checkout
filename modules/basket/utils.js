
const getItemsByOrder = (items, orderBy) => {
    let orderedItems = [];
    const orderSet = new Set(items.map(item => {
        return item[orderBy];
    }));
    // map all the items by orderSet unique keys
    Array.from(orderSet).map(order => {
        orderedItems[order] = items.filter(item => item[orderBy] === order);
    });
    return orderedItems;
}

const skuValidator = (item, modelValue) => {
    return modelValue > item.availableStock ? 'OUT OF STOCK' : ''
}

export {
    skuValidator,
    getItemsByOrder
}