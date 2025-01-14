import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { db } from '../../../firebase'; // Firebase config
import {
    collection,
    doc,
    setDoc,
    deleteDoc,
    getDocs,
} from 'firebase/firestore';
import '../../css/database/databaseProductEditor.css';

import image_default_internal_ssd from '../../assets/product-images/defaults/internal_ssd_default.png'
import image_default_external_ssd from '../../assets/product-images/defaults/external_ssd_default.png'
import image_default_software from '../../assets/product-images/defaults/software_default.png'
import image_default_ssd_accesory from '../../assets/product-images/defaults/ssd_accesory_default.png'

import image_company_internal_ssd from '../../assets/product-images/company/internal_ssd.jpg'
import image_company_external_ssd from '../../assets/product-images/company/external_ssd.jpg'
import image_company_m2_ssd from '../../assets/product-images/company/m2_ssd.jpg'


import image_adata_se760_ext from '../../assets/product-images/adata_se760_ext.jpg'
import image_kingston_xs1000_ext from '../../assets/product-images/kingston_xs1000_ext.jpg'
import image_samsung_T7_ext from '../../assets/product-images/samsung_T7_ext.jpg'
import image_sandisk_ssd_ext from '../../assets/product-images/sandisk_ssd_ext.jpg'
import image_kingston_xs1000_ext_red from '../../assets/product-images/kingston_xs1000_ext_red.jpg'
import image_samsung_T7_ext_blue from '../../assets/product-images/samsung_T7_ext_blue.jpg'

import image_adata_SU650 from '../../assets/product-images/adata_SU650.jpg'
import image_adata_SU800 from '../../assets/product-images/adata_SU800.jpg'
import image_kingston_a400 from '../../assets/product-images/kingston_a400.jpg'
import image_samsung_870EVO from '../../assets/product-images/samsung_870EVO.jpg'
import image_sandisk_plus from '../../assets/product-images/sandisk_plus.jpg'
import image_adata_xpg_m2 from '../../assets/product-images/adata_xpg_m2.jpg'
import image_samsung_980_m2 from '../../assets/product-images/samsung_980_m2.jpg'
import image_kingston_nv3_m2 from '../../assets/product-images/kingston_nv3_m2.jpg'

import image_caddy_adapter from '../../assets/product-images/caddy_adapter.jpg'
import image_sata_cable from '../../assets/product-images/sata_cable.jpg'
import image_sata_cable2 from '../../assets/product-images/sata_cable2.jpg'
import image_ssd_rack_adata_m2 from '../../assets/product-images/ssd_rack_adata_m2.jpg'
import image_ssd_rack_adata_sata from '../../assets/product-images/ssd_rack_adata_sata.jpg'


const imageOptions = [
    { name: 'default-internal-ssd', path: image_default_internal_ssd },
    { name: 'default-external-ssd', path: image_default_external_ssd },
    { name: 'default-software', path: image_default_software },
    { name: 'default-ssd-accessory', path: image_default_ssd_accesory },
    { name: 'Project-SSD o7 Portable SSD', path: image_company_external_ssd },
    { name: 'Project-SSD T800 Sata SSD', path: image_company_internal_ssd },
    { name: 'Project-SSD G1 Mk2 M2 SSD', path: image_company_m2_ssd },
    { name: 'Adata SE760 External', path: image_adata_se760_ext },
    { name: 'Kingston XS1000 External Black', path: image_kingston_xs1000_ext },
    { name: 'Kingston XS1000 External Red', path: image_kingston_xs1000_ext_red },
    { name: 'Samsung T7 External Gray', path: image_samsung_T7_ext },
    { name: 'Samsung T7 External Blue', path: image_samsung_T7_ext_blue },
    { name: 'Sandisk Extreme Portable External', path: image_sandisk_ssd_ext },
    { name: 'Adata SU650', path: image_adata_SU650 },
    { name: 'Adata SU800', path: image_adata_SU800 },
    { name: 'Kingston A400', path: image_kingston_a400 },
    { name: 'Samsung 870 EVO', path: image_samsung_870EVO },
    { name: 'Sandisk Plus', path: image_sandisk_plus },
    { name: 'Adata XPG', path: image_adata_xpg_m2 },
    { name: 'Samsung 980 M2', path: image_samsung_980_m2 },
    { name: 'Kingston NV3 M2', path: image_kingston_nv3_m2 },
    { name: 'Caddy Adapter', path: image_caddy_adapter },
    { name: 'Sata Cable 1', path: image_sata_cable },
    { name: 'Sata Cable 2', path: image_sata_cable2 },
    { name: 'Adata Rack SSD M2', path: image_ssd_rack_adata_m2 },
    { name: 'Adata Rack SSD Sata', path: image_ssd_rack_adata_sata }
];

const DatabaseProductEditor = () => {
    const [products, setProducts] = useState([]);
    const [brands, setBrands] = useState([]);
    const [productId, setProductId] = useState('');
    const [category, setCategory] = useState('');
    const [image, setImage] = useState('');
    const [model, setModel] = useState('');
    const [groupId, setGroupId] = useState(-1);  // Default to -1 if not chosen
    const [price, setPrice] = useState('');
    const [oldPrice, setOldPrice] = useState(0);
    const [addOldPrice, setAddOldPrice] = useState(false);
    const [inStock, setInStock] = useState(false);
    const [brand, setBrand] = useState('');
    const [type, setType] = useState('');
    const [addType, setAddType] = useState(false);
    const [color, setColor] = useState('');
    const [addColor, setAddColor] = useState(false);
    const [use, setUse] = useState('');
    const [addUse, setAddUse] = useState(false);
    const [description, setDescription] = useState('');
    const [groupProducts, setGroupProducts] = useState([]);
    const [size, setSize] = useState('');
    const [addSize, setAddSize] = useState(false);
    const [addMultipleSizes, setAddMultipleSizes] = useState(false);
    const [sizes] = useState(['120gb', '240gb', '480gb', '1tb', '2tb', '4tb', '8tb']);
    const [selectedSizes, setSelectedSizes] = useState([]);
    const [newBrand, setNewBrand] = useState('');
    const [previewTitle, setPreviewTitle] = useState('');

    const basicColors = [
        "Red", "Green", "Blue", "Yellow", "Black", "White",
        "Purple", "Orange", "Pink", "Brown", "Grey", "Gold",
        "Silver", "Teal", "Copper"
    ];

    useEffect(() => {
        const fetchData = async () => {
            try {
                // Fetch products
                const querySnapshot = await getDocs(collection(db, 'products'));
                const productList = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
                setProducts(productList);

                // Fetch brands
                const brandsSnapshot = await getDocs(collection(db, 'brands'));
                const brandList = brandsSnapshot.docs.map(doc => doc.id);
                setBrands(brandList);

                // Generate next Product ID
                const lastProduct = productList[productList.length - 1];
                const lastProductId = lastProduct ? parseInt(lastProduct.id.replace('PROD', ''), 10) : 0;
                setProductId(`PROD${String(lastProductId + 1).padStart(6, '0')}`);
            } catch (error) {
                console.error('Error fetching data: ', error);
            }
        };

        fetchData();
    }, []);

    const loadProduct = (product) => {
        setProductId(product.id);
        setCategory(product.category);
        setImage(product.image);
        setModel(product.model);
        setGroupId(product.groupId || -1);  // Default to -1
        setPrice(product.price);
        setOldPrice(product.oldPrice || 0); // Default to 0
        setAddOldPrice(!!product.oldPrice);
        setInStock(product.inStock);
        setBrand(product.brand);
        setType(product.type || '');
        setAddType(!!product.type);
        setColor(product.color || '');
        setAddColor(!!product.color);
        setUse(product.use || '');
        setAddUse(!!product.use);
        setDescription(product.description || '');
        setSize(product.size || '');
        setAddSize(!!product.size);
    };

    const resetProductId = () => {
        // Reset to last product id after selecting new or clearing
        const lastProduct = products[products.length - 1];
        const lastProductId = lastProduct ? parseInt(lastProduct.id.replace('PROD', ''), 10) : 0;
        setProductId(`PROD${String(lastProductId + 1).padStart(6, '0')}`);
    };

    const clearForm = () => {
        setCategory('');
        setImage('');
        setModel('');
        setGroupId(-1);
        setPrice('');
        setOldPrice(0);
        setAddOldPrice(false);
        setInStock(false);
        setBrand('');
        setAddType(false);
        setType('');
        setAddColor(false);
        setColor('');
        setAddUse(false);
        setUse('');
        setDescription('');
        setGroupProducts([]);
        setAddMultipleSizes(false);
        setSize('');
        setSelectedSizes([]);
        setAddSize(false);
        resetProductId();  // Reset Product ID to last
    };

    const handleSave = async () => {
        if (!model || !price || !category || !brand) {
            alert('Title, Price, Category, and Brand are required.');
            return;
        }

        if (addMultipleSizes && !(category === 'Internal SSDs' || category === 'External SSDs')) {
            alert('Add Multiple Sizes is only allowed for Internal SSDs or External SSDs.');
            return;
        }

        const productData = {
            category,
            image,
            title: previewTitle,
            model,
            groupId: groupId === -1 ? null : groupId,  // If not selected, set to null
            price: parseFloat(price),
            oldPrice: parseFloat(oldPrice),
            inStock,
            brand,
            type: addType ? type : null,
            color: addColor ? color : null,
            use: addUse ? use : null,
            description, // Save description
        };

        if (addMultipleSizes) {
            // Add multiple products for each selected size
            const newProducts = selectedSizes.map((selectedSize, selectedSizeIndex) => {
                const newProductId = `PROD${String(parseInt(productId.replace('PROD', ''), 10) + selectedSizeIndex).padStart(6, '0')}`;
                const newProductTitle = `${brand} ${model} ${type} ${selectedSize} ${color} ${use}`;
                return {
                    ...productData,
                    id: newProductId,
                    title: newProductTitle,
                    size: selectedSize,
                };
            });

            try {
                // Add the new products
                await Promise.all(newProducts.map(async (product) => {
                    const productRef = doc(db, 'products', product.id);
                    await setDoc(productRef, product, { merge: true });
                }));
                alert('Products saved successfully!');
                clearForm();
            } catch (error) {
                console.error('Error saving products: ', error);
                alert('Failed to save products. Please try again.');
            }
        } else {
            // Create a single product
            try {
                const productRef = doc(db, 'products', productId);
                await setDoc(productRef, productData, { merge: true });
                alert('Product saved successfully!');
                clearForm();
            } catch (error) {
                console.error('Error saving product: ', error);
                alert('Failed to save product. Please try again.');
            }
        }
    };

    const handleDelete = async () => {
        if (!productId) {
            alert('Please select a product to delete.');
            return;
        }

        try {
            const productRef = doc(db, 'products', productId);
            await deleteDoc(productRef);
            alert('Product deleted successfully!');
            clearForm();
        } catch (error) {
            console.error('Error deleting product: ', error);
            alert('Failed to delete product. Please try again.');
        }
    };

    const handleSizeChange = (e) => {
        setSize(e.target.value);
    };

    const handleAddMultipleSizesChange = (e) => {
        setAddMultipleSizes(e.target.checked);
        if (!e.target.checked) {
            setSelectedSizes([]); // Reset selected sizes if Add Multiple Sizes is unchecked
        }
    };

    const handleSizeCheckboxChange = (e) => {
        const { value, checked } = e.target;
        setSelectedSizes((prev) => {
            if (checked) {
                return [...prev, value];
            } else {
                return prev.filter((size) => size !== value);
            }
        });
    };

    const handleImageSelect = (e) => {
        const selectedImageName = e.target.value;
        const selectedImage = imageOptions.find(img => img.name === selectedImageName);
        setImage(selectedImage ? selectedImage.path : '');
    };

    const handleAddBrand = async () => {
        const brandName = window.prompt('Enter the new brand name:');

        // Check if the user entered a valid brand name
        if (brandName && brandName.trim() !== '') {
            try {
                const brandRef = doc(db, 'brands', brandName);
                await setDoc(brandRef, { name: brandName });

                alert('Brand added successfully!');
            } catch (error) {
                console.error('Error adding brand: ', error);
                alert('Failed to add brand. Please try again.');
            }
        } else {
            alert('Please enter a valid brand name.');
        }
    };

    const constructTitle = () => {
        const parts = [brand, model, type, size, color, use].filter(Boolean);
        return parts.join(' ');
    };

    useEffect(() => {
        setPreviewTitle(constructTitle());
    }, [brand, model, type, size, color, use]);

    return (
        <div className="databaseProductEditor-container">
            <div className="databaseProductEditor-buttons">
                <Link to="/database-product-preview" className="databaseProductEditor-button">Database Product Preview</Link>
                <Link to="/database-products" className="databaseProductEditor-button">Database Products</Link>
                <Link to="/database" className="databaseProductEditor-button">Database Control Panel</Link>
            </div>
            <h1>Database Product Editor</h1>
            <div className="databaseProductEditor-form-group">
                <label>Choose Product to Edit:</label>
                <select onChange={(e) => {
                    const product = products.find(p => p.id === e.target.value);
                    if (product) loadProduct(product);
                    else resetProductId();  // Reset to last product ID when "New Product" is selected
                }}>
                    <option value="">New Product</option>
                    {products.map(product => (
                        <option key={product.id} value={product.id}>{product.title}</option>
                    ))}
                </select>
            </div>
            <div className="databaseProductEditor-form-group">
                <label>Product ID:</label>
                <input type="text" value={productId} readOnly />
            </div>
            <div className="databaseProductEditor-form-group">
                <label>Category:</label>
                <select value={category} onChange={(e) => setCategory(e.target.value)}>
                    <option value="">Select Category</option>
                    <option value="Internal SSDs">Internal SSDs</option>
                    <option value="External SSDs">External SSDs</option>
                    <option value="SSD Accessories">SSD Accessories</option>
                    <option value="Software">Software</option>
                </select>
            </div>

            {/* Image Section */}
            <div className="databaseProductEditor-form-group">
                <label>Select Image:</label>
                <select onChange={handleImageSelect} value={image ? image.split('/').pop() : ''}>
                    <option value="">Select an image</option>
                    {imageOptions.map((img, index) => (
                        <option key={index} value={img.name}>{img.name}</option>
                    ))}
                </select>
            </div>

            {/* Image Preview */}
            {image && (
                <div className="databaseProductEditor-form-group">
                    <label>Image Preview:</label>
                    <img src={image} alt="Selected" width="200" />
                </div>
            )}

            {/* Price and Old Price */}
            <div className="databaseProductEditor-form-group">
                <label>Price:</label>
                <input type="number" value={price} onChange={(e) => setPrice(e.target.value)} />
            </div>
            <div className="databaseProductEditor-form-group">
                <label>Old Price:</label>
                <input type="number" value={oldPrice} onChange={(e) => setOldPrice(e.target.value)} />
            </div>

            {/* In Stock */}
            <div className="databaseProductEditor-form-group">
                <label>
                    <input
                        type="checkbox"
                        checked={inStock}
                        onChange={() => setInStock(!inStock)}
                    /> In Stock
                </label>
            </div>

            {/* Brands */}
            <div className="databaseProductEditor-form-group">
                <label>Brand:</label>
                <select value={brand} onChange={(e) => setBrand(e.target.value)}>
                    <option value="">Select Brand</option>
                    {brands.map((brandName) => (
                        <option key={brandName} value={brandName}>{brandName}</option>
                    ))}
                </select>
            </div>

            <div className="databaseProductEditor-addbrand-button">
                <button onClick={handleAddBrand}>Add New Brand</button>
            </div>

            {/* Model */}
            <div className="databaseProductEditor-form-group">
                <label>Model:</label>
                <input type="text" value={model} onChange={(e) => setModel(e.target.value)} />
            </div>

            {/* Add Type */}
            <div className="databaseProductEditor-form-group">
                <label>
                    <input
                        type="checkbox"
                        checked={addType}
                        onChange={() => setAddType(!addType)}
                    /> Add Type
                </label>
                {addType && (
                    <div>
                        <label>Type:</label>
                        <input type="text" value={type} onChange={(e) => setType(e.target.value)} />
                    </div>
                )}
            </div>

            {/* Add Size */}
            <div className="databaseProductEditor-form-group">
                <label>
                    <input
                        type="checkbox"
                        checked={addSize}
                        onChange={() => setAddSize(!addSize)}
                    /> Add Size
                </label>
                {addSize && !addMultipleSizes && (
                    <div>
                        <label>Select Size:</label>
                        <select value={size} onChange={handleSizeChange}>
                            <option value="">Choose Size</option>
                            {sizes.map((s) => (
                                <option key={s} value={s}>{s}</option>
                            ))}
                        </select>
                    </div>
                )}

                {/* Add Multiple Sizes */}
                {addSize && (
                    <div>
                        <label>
                            <input
                                type="checkbox"
                                checked={addMultipleSizes}
                                onChange={handleAddMultipleSizesChange}
                            /> Add Multiple Sizes
                        </label>
                    </div>
                )}

                {/* Selected Sizes for Multiple */}
                {addMultipleSizes && (
                    <div>
                        <label>Select Sizes:</label>
                        {sizes.map((s) => (
                            <div key={s}>
                                <label>
                                    <input
                                        type="checkbox"
                                        value={s}
                                        checked={selectedSizes.includes(s)}
                                        onChange={handleSizeCheckboxChange}
                                    /> {s}
                                </label>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {/* Add Color */}
            <div className="databaseProductEditor-form-group">
                <label>
                    <input
                        type="checkbox"
                        checked={addColor}
                        onChange={() => setAddColor(!addColor)}
                    /> Add Color
                </label>
                {addColor && (
                    <div>
                        <label>Select Color:</label>
                        <select value={color} onChange={(e) => setColor(e.target.value)}>
                            {basicColors.map((colorOption) => (
                                <option key={colorOption} value={colorOption}>{colorOption}</option>
                            ))}
                        </select>
                    </div>
                )}
            </div>

            {/* Add Use */}
            <div className="databaseProductEditor-form-group">
                <label>
                    <input
                        type="checkbox"
                        checked={addUse}
                        onChange={() => setAddUse(!addUse)}
                    /> Add Use
                </label>
                {addUse && (
                    <div>
                        <label>Use:</label>
                        <input type="text" value={use} onChange={(e) => setUse(e.target.value)} />
                    </div>
                )}
            </div>

            {/* Title Preview*/}
            <div className="databaseProductEditor-form-group">
                <label>Title Preview:</label>
                <p>{previewTitle}</p>
            </div>

            {/* Description */}
            <div className="databaseProductEditor-form-group">
                <label>Description:</label>
                <textarea value={description} onChange={(e) => setDescription(e.target.value)} />
            </div>

            {/* Buttons */}
            <div className="databaseProductEditor-buttons">
                <button onClick={handleSave}>Save</button>
                <button onClick={handleDelete}>Delete</button>
                <button onClick={clearForm}>Clear Form</button>
            </div>
        </div>
    );
};

export default DatabaseProductEditor;
