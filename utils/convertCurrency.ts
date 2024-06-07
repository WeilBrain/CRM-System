export const convertCurrency = (amount: string | number) => {
    return new Intl.NumberFormat('ru', {
        style: 'currency',
        currency: 'RUB',
    }).format(+amount)
}