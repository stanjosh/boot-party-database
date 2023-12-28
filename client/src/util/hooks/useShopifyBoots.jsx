import { useState, useEffect } from 'react';

const useShopifyBoots = () => {
    const [boots, setBoots] = useState([]);

    useEffect(() => {
        // Fetch boots data from Shopify API
        const fetchBoots = async () => {
            try {
                const response = await fetch('https://api.shopify.com/boots');
                const data = await response.json();
                setBoots(data);
            } catch (error) {
                console.error('Error fetching boots:', error);
            }
        };

        fetchBoots();
    }, []);

    return boots;
};

export default useShopifyBoots;
