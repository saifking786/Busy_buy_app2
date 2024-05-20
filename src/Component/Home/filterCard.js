import styles from './filterCard.module.css';
import React, { useState, useEffect } from "react";
import ItemCard from "./ItemCard";
import { data } from "../../Assets/data";

export default function FilterBar() {
    const [price, setPrice] = useState(5000);
    const [category, setCategory] = useState('none');
    const [filteredItems, setFilteredItems] = useState([]);

    const fetchItems = async () => {
        const filteredData = data.filter(item => {
            const priceCond = item.price <= price;
            if (category === 'none') {
                return priceCond;
            }
            const categoryCond = item.category === category;
            return priceCond && categoryCond;
        });
        setFilteredItems(filteredData);
    };

    useEffect(() => {
        fetchItems();
    }, [category, price]);

    return (
        <div className={styles.filterBar}>
            <h1>FilterBar</h1>
            <div className={styles.priceRange}>
                <span>Price</span>{` <= ${price}`}
                <br />
                <input
                    type="range"
                    min="100"
                    max="50000"
                    value={price}
                    onChange={(e) => setPrice(Number(e.target.value))}
                />
            </div>
            <div className={styles.categoryBox}>
                <span>Category:</span>
                <div>
                    <input
                        type="radio"
                        id="men"
                        value="men"
                        name="category"
                        onClick={() => setCategory("men")}
                    />
                    <label htmlFor="men">Men</label>

                    <input
                        type="radio"
                        id="women"
                        value="women"
                        name="category"
                        onClick={() => setCategory("women")}
                    />
                    <label htmlFor="women">Women</label>

                    <input
                        type="radio"
                        id="electric"
                        value="electric"
                        name="category"
                        onClick={() => setCategory("electric")}
                    />
                    <label htmlFor="electric">Electronic</label>

                    <input
                        type="radio"
                        id="jewellery"
                        value="jewellery"
                        name="category"
                        onClick={() => setCategory("jewellery")}
                    />
                    <label htmlFor="jewellery">Jewellery</label>

                    <input
                        type="radio"
                        id="none"
                        value="none"
                        name="category"
                        onClick={() => setCategory("none")}
                    />
                    <label htmlFor="none">None</label>
                </div>
            </div>
            <div className={styles.itemGrid}>
                {filteredItems.map((u) => (
                    <ItemCard key={u.id} id={u.id} name={u.name} image={u.image} price={u.price} category={u.category} />
                ))}
            </div>
        </div>
    );
}
