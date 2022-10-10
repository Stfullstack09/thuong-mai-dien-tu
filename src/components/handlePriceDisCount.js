export const handlePriceDisCount = (price, disCount) => {
    if (!price) return;

    return price - (price * disCount) / 100;
};
