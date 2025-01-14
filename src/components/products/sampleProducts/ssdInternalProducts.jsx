const sampleProducts = [
    { id: "0x000000", groupId: 0, image: 'https://via.placeholder.com/200', title: 'Adata 120GB SATA SSD', inStock: true, price: 19.99, brand: 'Adata', type: 'SATA', size: '120GB' },
    { id: "0x000001", groupId: 1, image: 'https://via.placeholder.com/200', title: 'Samsung 240GB M2 SSD', inStock: false, price: 29.99, brand: 'Samsung', type: 'M2', size: '240GB' },
    { id: "0x000002", groupId: 2, image: 'https://via.placeholder.com/200', title: 'Kingston 500GB PCIE SSD', inStock: true, price: 9.99, brand: 'Kingston', type: 'PCIE', size: '500GB' },
    { id: "0x000003", groupId: 3, image: 'https://via.placeholder.com/200', title: 'SanDisk 1TB SATA SSD', inStock: false, price: 49.99, brand: 'SanDisk', type: 'SATA', size: '1TB' },
    { id: "0x000004", groupId: 4, image: 'https://via.placeholder.com/200', title: 'WD 2TB M2 SSD', inStock: true, price: 39.99, brand: 'WD', type: 'M2', size: '2TB' },
    { id: "0x000005", groupId: 5, image: 'https://via.placeholder.com/200', title: 'Seagate 120GB SATA SSD', inStock: true, price: 21.99, brand: 'Seagate', type: 'SATA', size: '120GB' },
    { id: "0x000006", groupId: 6, image: 'https://via.placeholder.com/200', title: 'Adata 240GB M2 SSD', inStock: false, price: 25.99, brand: 'Adata', type: 'M2', size: '240GB' },
    { id: "0x000007", groupId: 7, image: 'https://via.placeholder.com/200', title: 'Samsung 500GB PCIE SSD', inStock: true, price: 14.99, brand: 'Samsung', type: 'PCIE', size: '500GB' },
    { id: "0x000008", groupId: 8, image: 'https://via.placeholder.com/200', title: 'Kingston 1TB SATA SSD', inStock: false, price: 34.99, brand: 'Kingston', type: 'SATA', size: '1TB' },
    { id: "0x000009", groupId: 9, image: 'https://via.placeholder.com/200', title: 'SanDisk 2TB M2 SSD', inStock: true, price: 45.99, brand: 'SanDisk', type: 'M2', size: '2TB' },
    { id: "0x00000A", groupId: 10, image: 'https://via.placeholder.com/200', title: 'WD 120GB SATA SSD', inStock: true, price: 19.99, brand: 'WD', type: 'SATA', size: '120GB' },
    { id: "0x00000B", groupId: 11, image: 'https://via.placeholder.com/200', title: 'Seagate 240GB M2 SSD', inStock: false, price: 29.99, brand: 'Seagate', type: 'M2', size: '240GB' },
    { id: "0x00000C", groupId: 2, image: 'https://via.placeholder.com/200', title: 'Adata 500GB PCIE SSD', inStock: true, price: 9.99, brand: 'Adata', type: 'PCIE', size: '500GB' },
    { id: "0x00000D", groupId: 3, image: 'https://via.placeholder.com/200', title: 'Samsung 1TB SATA SSD', inStock: false, price: 49.99, brand: 'Samsung', type: 'SATA', size: '1TB' },
    { id: "0x00000E", groupId: 4, image: 'https://via.placeholder.com/200', title: 'Kingston 2TB M2 SSD', inStock: true, price: 39.99, brand: 'Kingston', type: 'M2', size: '2TB' },
    { id: "0x00000F", groupId: 5, image: 'https://via.placeholder.com/200', title: 'SanDisk 120GB SATA SSD', inStock: true, price: 21.99, brand: 'SanDisk', type: 'SATA', size: '120GB' },
    { id: "0x000010", groupId: 6, image: 'https://via.placeholder.com/200', title: 'WD 240GB M2 SSD', inStock: false, price: 25.99, brand: 'WD', type: 'M2', size: '240GB' },
    { id: "0x000011", groupId: 7, image: 'https://via.placeholder.com/200', title: 'Seagate 500GB PCIE SSD', inStock: true, price: 14.99, brand: 'Seagate', type: 'PCIE', size: '500GB' },
    { id: "0x000012", groupId: 8, image: 'https://via.placeholder.com/200', title: 'Adata 1TB SATA SSD', inStock: false, price: 34.99, brand: 'Adata', type: 'SATA', size: '1TB' },
    { id: "0x000013", groupId: 9, image: 'https://via.placeholder.com/200', title: 'Samsung 2TB M2 SSD', inStock: true, price: 45.99, brand: 'Samsung', type: 'M2', size: '2TB' },
    { id: "0x000014", groupId: 10, image: 'https://via.placeholder.com/200', title: 'Kingston 120GB SATA SSD', inStock: true, price: 19.99, brand: 'Kingston', type: 'SATA', size: '120GB' },
    { id: "0x000015", groupId: 11, image: 'https://via.placeholder.com/200', title: 'SanDisk 240GB M2 SSD', inStock: false, price: 29.99, brand: 'SanDisk', type: 'M2', size: '240GB' },
    { id: "0x000016", groupId: 2, image: 'https://via.placeholder.com/200', title: 'WD 500GB PCIE SSD', inStock: true, price: 9.99, brand: 'WD', type: 'PCIE', size: '500GB' },
    { id: "0x000017", groupId: 3, image: 'https://via.placeholder.com/200', title: 'Seagate 1TB SATA SSD', inStock: false, price: 49.99, brand: 'Seagate', type: 'SATA', size: '1TB' },
    { id: "0x000018", groupId: 4, image: 'https://via.placeholder.com/200', title: 'Adata 2TB M2 SSD', inStock: true, price: 39.99, brand: 'Adata', type: 'M2', size: '2TB' }
];

export default sampleProducts;