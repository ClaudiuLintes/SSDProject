const sampleOrders = [
    {
        id: 'ORD001',
        date: '2025-01-01',
        totalValue: 149.97,
        courierChoice: 'FastTrack Delivery',
        deliveryOption: 'Home delivery',
        deliveryAddress: '123 Main St',
        billingAddress: '123 Main St',
        paymentMethod: 'Credit Card',
        status: 1,
        products: [
            { id: '0x050001', groupId: -1, image: 'https://via.placeholder.com/200', title: 'Adata 120GB USB Type A SSD', inStock: true, price: 19.99, oldPrice: 24.99, brand: 'Adata', type: 'USB Type A', size: '120GB', color: 'Black', category: 'special-deals'},
            { id: '0x05000A', groupId: -1, image: 'https://via.placeholder.com/200', title: 'WD 1TB SATA SSD', inStock: false, price: 99.99, oldPrice: 119.99, brand: 'WD', type: 'SATA', size: '1TB', category: 'special-deals' },
        ]
    },
    {
        id: 'ORD002',
        date: '2025-01-05',
        totalValue: 74.97,
        courierChoice: 'QuickShip Express',
        deliveryOption: 'Pick-up box',
        deliveryAddress: '456 Oak St',
        billingAddress: '456 Oak St',
        paymentMethod: 'PayPal',
        status: 1,
        products: [
            { id: '0x05000A', groupId: -1, image: 'https://via.placeholder.com/200', title: 'WD 1TB SATA SSD', inStock: false, price: 99.99, oldPrice: 119.99, brand: 'WD', type: 'SATA', size: '1TB', category: 'special-deals' }
        ]
    },
    {
        id: 'ORD003',
        date: '2025-01-10',
        totalValue: 179.97,
        courierChoice: 'Reliable Delivery Co.',
        deliveryOption: 'Home delivery',
        deliveryAddress: '789 Pine St',
        billingAddress: '789 Pine St',
        paymentMethod: 'Credit Card',
        status: 2,
        products: [
            { id: '0x05000C', groupId: -1, image: 'https://via.placeholder.com/200', title: 'HyperTech m2 external case SSD', inStock: true, price: 19.99, oldPrice: 24.99, brand: 'HyperTech', type: 'm2 external case', color: 'Black', category: 'special-deals' },
            { id: '0x050012', groupId: -1, image: 'https://via.placeholder.com/200', title: 'AlphaSoft Recovery Enterprise', inStock: true, price: 199.99, oldPrice: 249.99, brand: 'AlphaSoft', type: 'Recovery', use: 'Enterprise Use', category: 'special-deals' }
        ]
    },
    {
        id: 'ORD004',
        date: '2025-01-15',
        totalValue: 89.97,
        courierChoice: 'Speedy Couriers',
        deliveryOption: 'Home delivery',
        deliveryAddress: '321 Maple St',
        billingAddress: '321 Maple St',
        paymentMethod: 'Bank Transfer',
        status: 3,
        products: [
            { id: '0x050012', groupId: -1, image: 'https://via.placeholder.com/200', title: 'AlphaSoft Recovery Enterprise', inStock: true, price: 199.99, oldPrice: 249.99, brand: 'AlphaSoft', type: 'Recovery', use: 'Enterprise Use', category: 'special-deals' }
        ]
    },
    {
        id: 'ORD005',
        date: '2025-01-20',
        totalValue: 89.97,
        courierChoice: 'FastTrack Delivery',
        deliveryOption: 'Pick-up box',
        deliveryAddress: '654 Elm St',
        billingAddress: '654 Elm St',
        paymentMethod: 'Credit Card',
        status: 0,
        products: [
            { id: '0x050012', groupId: -1, image: 'https://via.placeholder.com/200', title: 'AlphaSoft Recovery Enterprise', inStock: true, price: 199.99, oldPrice: 249.99, brand: 'AlphaSoft', type: 'Recovery', use: 'Enterprise Use', category: 'special-deals' },
            { id: '0x020000', groupId: 1, image: 'https://via.placeholder.com/200', title: 'HyperTech m2 external case SSD', inStock: true, price: 19.99, brand: 'HyperTech', type: 'm2 external case', color: 'Black', category: 'ssd-accessories'  },
            { id: '0x010001', groupId: 0, image: 'https://via.placeholder.com/200', title: 'Adata 120GB USB Type A SSD', inStock: true, price: 19.99, brand: 'Adata', type: 'USB Type A', size: '120GB', color: 'Black', category: 'external-ssds'  }
        ]
    },
    {
        id: 'ORD006',
        date: '2025-01-25',
        totalValue: 359.97,
        courierChoice: 'QuickShip Express',
        deliveryOption: 'Home delivery',
        deliveryAddress: '987 Birch St',
        billingAddress: '987 Birch St',
        paymentMethod: 'Cash on Delivery',
        status: 55,
        products: [
            { id: '0x050012', groupId: -1, image: 'https://via.placeholder.com/200', title: 'AlphaSoft Recovery Enterprise', inStock: true, price: 199.99, oldPrice: 249.99, brand: 'AlphaSoft', type: 'Recovery', use: 'Enterprise Use', category: 'special-deals' },
            { id: '0x05000A', groupId: -1, image: 'https://via.placeholder.com/200', title: 'WD 1TB SATA SSD', inStock: false, price: 99.99, oldPrice: 119.99, brand: 'WD', type: 'SATA', size: '1TB', category: 'special-deals' }
        ]
    }
];

export default sampleOrders;
