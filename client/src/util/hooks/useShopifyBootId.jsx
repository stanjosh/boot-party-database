import React, { useEffect, useState } from 'react';

const useShopifyBootId = ({ variantId }) => {
    

    const [variantData, setVariantData] = useState([]);

    useEffect(() => {
        
        const fetchBoot = async () => {
            if (!variantId) return;
            const url = `https://rickshaw-boots.myshopify.com/variants/${variantId}.json`
            try {
                fetch(url)
                    .then((response) => response.json())
                    .then((data) => {
                        setVariantData(data);
                        console.log('Boots fetched:', );
                    });
            } catch (error) {
                console.error('Error fetching boot:', error);
            }
        }
        fetchBoot();
    }, [variantId]);

    return { variantData }
};

export default useShopifyBootId;
