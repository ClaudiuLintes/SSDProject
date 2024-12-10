const sampleProducts = [
    { id: '0x040001', groupId: 1, image: 'https://via.placeholder.com/200', title: 'AlphaSoft Recovery Enterprise', inStock: true, price: 199.99, brand: 'AlphaSoft', type: 'Recovery', use: 'Enterprise Use' },
    { id: '0x040002', groupId: 2, image: 'https://via.placeholder.com/200', title: 'BetaSoft Storage Manager Professional', inStock: false, price: 299.99, brand: 'BetaSoft', type: 'Storage Manager', use: 'Professional Use' },
    { id: '0x040003', groupId: 3, image: 'https://via.placeholder.com/200', title: 'CyberSoft Security Enterprise', inStock: true, price: 149.99, brand: 'CyberSoft', type: 'Security', use: 'Enterprise Use' },
    { id: '0x040004', groupId: 4, image: 'https://via.placeholder.com/200', title: 'DeltaSoft Recovery Professional', inStock: false, price: 249.99, brand: 'DeltaSoft', type: 'Recovery', use: 'Professional Use' },
    { id: '0x040005', groupId: 5, image: 'https://via.placeholder.com/200', title: 'EpsilonSoft Storage Manager Enterprise', inStock: true, price: 199.99, brand: 'EpsilonSoft', type: 'Storage Manager', use: 'Enterprise Use' },
    { id: '0x040006', groupId: 6, image: 'https://via.placeholder.com/200', title: 'GammaSoft Security Professional', inStock: true, price: 399.99, brand: 'GammaSoft', type: 'Security', use: 'Professional Use' },
    { id: '0x040007', groupId: 7, image: 'https://via.placeholder.com/200', title: 'OmegaSoft Recovery Enterprise', inStock: false, price: 149.99, brand: 'OmegaSoft', type: 'Recovery', use: 'Enterprise Use' },
    { id: '0x040008', groupId: 8, image: 'https://via.placeholder.com/200', title: 'LambdaSoft Storage Manager Professional', inStock: true, price: 349.99, brand: 'LambdaSoft', type: 'Storage Manager', use: 'Professional Use' },
    { id: '0x040009', groupId: 9, image: 'https://via.placeholder.com/200', title: 'AlphaSoft Security Professional', inStock: false, price: 199.99, brand: 'AlphaSoft', type: 'Security', use: 'Professional Use' },
    { id: '0x04000A', groupId: 1, image: 'https://via.placeholder.com/200', title: 'BetaSoft Recovery Enterprise', inStock: true, price: 299.99, brand: 'BetaSoft', type: 'Recovery', use: 'Enterprise Use' },
    { id: '0x04000B', groupId: 2, image: 'https://via.placeholder.com/200', title: 'CyberSoft Storage Manager Professional', inStock: true, price: 249.99, brand: 'CyberSoft', type: 'Storage Manager', use: 'Professional Use' },
    { id: '0x04000C', groupId: 4, image: 'https://via.placeholder.com/200', title: 'DeltaSoft Security Enterprise', inStock: false, price: 399.99, brand: 'DeltaSoft', type: 'Security', use: 'Enterprise Use' },
    { id: '0x04000D', groupId: 5, image: 'https://via.placeholder.com/200', title: 'EpsilonSoft Recovery Professional', inStock: true, price: 199.99, brand: 'EpsilonSoft', type: 'Recovery', use: 'Professional Use' },
    { id: '0x04000E', groupId: 6, image: 'https://via.placeholder.com/200', title: 'GammaSoft Storage Manager Enterprise', inStock: false, price: 299.99, brand: 'GammaSoft', type: 'Storage Manager', use: 'Enterprise Use' },
    { id: '0x04000F', groupId: 7, image: 'https://via.placeholder.com/200', title: 'OmegaSoft Security Professional', inStock: true, price: 149.99, brand: 'OmegaSoft', type: 'Security', use: 'Professional Use' },
    { id: '0x040010', groupId: 8, image: 'https://via.placeholder.com/200', title: 'LambdaSoft Recovery Enterprise', inStock: true, price: 249.99, brand: 'LambdaSoft', type: 'Recovery', use: 'Enterprise Use' },
    { id: '0x040011', groupId: 1, image: 'https://via.placeholder.com/200', title: 'AlphaSoft Storage Manager Professional', inStock: false, price: 199.99, brand: 'AlphaSoft', type: 'Storage Manager', use: 'Professional Use' },
    { id: '0x040012', groupId: 3, image: 'https://via.placeholder.com/200', title: 'BetaSoft Security Enterprise', inStock: true, price: 399.99, brand: 'BetaSoft', type: 'Security', use: 'Enterprise Use' },
    { id: '0x040013', groupId: 4, image: 'https://via.placeholder.com/200', title: 'CyberSoft Recovery Professional', inStock: true, price: 149.99, brand: 'CyberSoft', type: 'Recovery', use: 'Professional Use' },
    { id: '0x040014', groupId: 5, image: 'https://via.placeholder.com/200', title: 'DeltaSoft Storage Manager Enterprise', inStock: false, price: 349.99, brand: 'DeltaSoft', type: 'Storage Manager', use: 'Enterprise Use' },
    { id: '0x040015', groupId: 6, image: 'https://via.placeholder.com/200', title: 'EpsilonSoft Security Professional', inStock: true, price: 199.99, brand: 'EpsilonSoft', type: 'Security', use: 'Professional Use' },
    { id: '0x040016', groupId: 7, image: 'https://via.placeholder.com/200', title: 'GammaSoft Recovery Enterprise', inStock: false, price: 299.99, brand: 'GammaSoft', type: 'Recovery', use: 'Enterprise Use' },
    { id: '0x040017', groupId: 8, image: 'https://via.placeholder.com/200', title: 'OmegaSoft Storage Manager Professional', inStock: true, price: 249.99, brand: 'OmegaSoft', type: 'Storage Manager', use: 'Professional Use' },
    { id: '0x040018', groupId: 1, image: 'https://via.placeholder.com/200', title: 'LambdaSoft Security Enterprise', inStock: false, price: 399.99, brand: 'LambdaSoft', type: 'Security', use: 'Enterprise Use' }
];

export default sampleProducts