import React, { useState } from 'react';
import { data } from '../Assets/data'; // Assuming data is imported from a data file
import styles from '../styles/home.module.css'; // Import CSS module
import ItemCard from '../Component/Home/ItemCard'; // Import ItemCard component
import FilterCard from '../Component/Home/filterCard'; // Import FilterCard component

function Home() {
    const [name, setName] = useState('');
    const [toggle, setToggle] = useState(true); // Toggle state for filtering
    const [filter, setFilter] = useState([]); // State for filtered items
    const [toggle2, setToggle2] = useState(true); // Toggle state for filter card display

    // Function to handle input change for search
    const handleChange = (e) => {
        setName(e.target.value);
        if (e.target.value === '') {
            // If search input is empty, reset toggle and filter state
            setToggle(true);
            setFilter([]);
        } else {
            // Filter data based on search input
            const searched = data.filter((u) => u.name.toLowerCase().includes(e.target.value.toLowerCase()));
            setFilter(searched);
            setToggle(false);
        }
    };

    // Function to toggle filter card display
    const handleChange2 = () => {
        setToggle2(!toggle2);
    };

    return (
        <div className={styles.homeContainer}>
            {/* Search form */}
            <form>
                <input
                    type='text'
                    placeholder='Search By name'
                    value={name}
                    onChange={handleChange}
                    className={styles.input} // Apply input style from CSS module
                />
            </form>
            {/* Filter toggle */}
            <p className={styles.filter} onClick={handleChange2}>{toggle2 ? 'Filter' : 'Cancel'}</p>
            {/* Render filter card if toggle2 is false */}
            {!toggle2 && (
                <FilterCard />
            )}
            {/* Render item cards */}
            {toggle2 && (
                <div>
                    {!toggle && filter.length > 0 && ( // Render filtered items if toggle is false and filter has items
                        <div className={styles.homeContainer2}>
                            {filter.map((u) => (
                                <ItemCard key={u.id} id={u.id} name={u.name} image={u.image} price={u.price} />
                            ))}
                        </div>
                    )}

                    {/* Render all items if toggle is true or filter has no items */}
                    {toggle && (
                        <div className={styles.homeContainer2}>
                            {data.map((u) => (
                                <ItemCard key={u.id} id={u.id} name={u.name} image={u.image} price={u.price} category={u.category} />
                            ))}
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}

export default Home;
