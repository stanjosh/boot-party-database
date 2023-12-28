import { useState, useEffect } from 'react';

const menBootDataURL = "https://rickshaw-boots.myshopify.com/collections/mens-boots/products.json";
const womenBootDataURL = "https://rickshaw-boots.myshopify.com/collections/womens-boots/products.json";


const useShopifyBoots = ({shoeSize, shoeWidth }) => {
    const [bootData, setBootData] = useState([]);

    useEffect(() => {
        // Fetch boots data from Shopify JSON
        const fetchBoots = async () => {
            if (!shoeSize || !shoeWidth) return;
            try {
                
                const bootDataURL = shoeWidth === "B" ? womenBootDataURL : menBootDataURL;
                fetch(bootDataURL)
                    .then((response) => response.json())
                    .then((data) => {
                        const filteredBoots = []
                        data.products?.filter((style) => 
                            style.variants.forEach((variant) => {
                                if (variant.available === true && variant.option1 === shoeSize && variant.option2 === shoeWidth ) {
                                    variant.alt = style.title
                                    filteredBoots.push(variant)
                                }
                            }))
                        setBootData(filteredBoots);
                        console.log('Boots fetched:', filteredBoots);
                    });
            } catch (error) {
                console.error('Error fetching boots:', error);
            }
        };

        fetchBoots();
    }, [shoeSize, shoeWidth]);

    return { bootData };
};

export default useShopifyBoots;
