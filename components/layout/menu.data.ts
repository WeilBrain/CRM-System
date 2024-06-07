export interface IMenuItem {
    name: string
    url: string
    icon: string
}

export const MENU_DATA: IMenuItem[] = [
    {
        icon: 'radix-icons:dashboard',
        name: 'Home',
        url: '/',
    },
    {
        name: 'Charts',
        icon: 'solar:chart-2-bold-duotone',
        url: '/charts',
    },
    {
        name: 'Orders',
        icon: 'fluent:receipt-28-regular',
        url: '/orders',
    },
    {
        name: 'Customers',
        icon: 'mingcute:group-line',
        url: '/customers',
    },
]
