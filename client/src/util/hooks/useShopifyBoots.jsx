import { useState, useEffect } from 'react';

const menBootDataURL = "https://rickshaw-boots.myshopify.com/collections/mens-boots/products.json";
const womenBootDataURL = "https://rickshaw-boots.myshopify.com/collections/womens-boots/products.json";



const useShopifyBoots = ({shoeSize, shoeWidth }) => {

    const [bootData, setBootData] = useState([]);
    const [loading, setLoading] = useState(false);

    const sizeUp = (shoeSize == 14 || shoeSize ==  15 || shoeSize == 13) ? 1 + parseFloat(shoeSize) : 0.5 + parseFloat(shoeSize);
    const sizeDown = (shoeSize == 14 || shoeSize ==  15) ? -1 + parseFloat(shoeSize) : -0.5 + parseFloat(shoeSize);

    useEffect(() => {


        // Fetch boots data from Shopify JSON
        

        console.log(sizeUp, sizeDown)
        const fetchBoots = async () => {
            if (!shoeSize || !shoeWidth) return;
            try {
                
                const bootDataURL = shoeWidth === "B" ? womenBootDataURL : menBootDataURL;
                setLoading(true);
                fetch(bootDataURL)
                    .then((response) => response.json())
                    .then((data) => {
                        const filteredBoots = []
                        data.products?.forEach((style) => {

                            const boot = style.variants.filter((variant) => {
                                const { available, option1: size, option2 : width, option3 : color } = variant;
                                return available == true && width === shoeWidth && (size == shoeSize || size == sizeUp || size == sizeDown)
                            })

                        
                            if (boot.length > 0) {
                                filteredBoots.push(boot)
                            }
                            
                        });
                        setLoading(false);
                        setBootData(filteredBoots);
                        console.log('Boots fetched:', filteredBoots);
                    });
            } catch (error) {
                setLoading(false);
                console.error('Error fetching boots:', error);
            }
        };

        fetchBoots();
    }, [shoeSize, shoeWidth]);

    return { bootData, loading };
};

export default useShopifyBoots;
