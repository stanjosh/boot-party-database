import { useState, useEffect } from 'react';

const menBootDataURL = "https://rickshaw-boots.myshopify.com/collections/mens-boots/products.json";
const womenBootDataURL = "https://rickshaw-boots.myshopify.com/collections/womens-boots/products.json";



const useShopifyBoots = ({shoeSize, shoeWidth }) => {

    const [bootData, setBootData] = useState([]);

    const sizeUp = (shoeSize == 14 || shoeSize ==  15 || shoeSize == 13) ? 1 + parseFloat(shoeSize) : 0.5 + parseFloat(shoeSize);
    const sizeDown = (shoeSize == 14 || shoeSize ==  15) ? -1 + parseFloat(shoeSize) : -0.5 + parseFloat(shoeSize);

    useEffect(() => {


        // Fetch boots data from Shopify JSON
        

        console.log(sizeUp, sizeDown)
        const fetchBoots = async () => {
            if (!shoeSize || !shoeWidth) return;
            try {
                
                const bootDataURL = shoeWidth === "B" ? womenBootDataURL : menBootDataURL;
                fetch(bootDataURL)
                    .then((response) => response.json())
                    .then((data) => {
                        const filteredBoots = []
                        data.products?.forEach((style) =>

                            style.variants.forEach((variant) => {
                                if (variant.available === true && variant.option1 === shoeSize && variant.option2 === shoeWidth ) {
                                    variant.alt = style.title
                                    variant.nearSizes = []
                                    filteredBoots.push(variant)
                                    style.variants.forEach((nearSizeVariant) => {
                                        const { available, option1, option2, option3 } = nearSizeVariant;
                                        if (available == true && option3 === variant.option3 && (option1 == sizeUp || option1 == sizeDown) && option2 === shoeWidth ) {
                                            nearSizeVariant.alt = style.title
                                            variant.nearSizes.push(nearSizeVariant)
                                        }
                                    })
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
