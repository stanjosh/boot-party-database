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
        


        const filterAndSortBoots = (boots) => {
            boots.products?.forEach((product) => {
                product.variants.forEach((variant) => {
                    variant.title = product?.title;
                    variant.bootImgSrc = variant.featured_image?.src;
                })
                
            })

            const variants = boots.products?.map((product) => product.variants)
            
            

            const filteredBoots = variants
                .flat()
                .filter((b) => {
                    return b.option2 == shoeWidth && (b.option1 == parseFloat(shoeSize) || b.option1 == sizeUp || b.option1 == sizeDown);
                })
                
                .reduce((acc = [], boot) => {
                    if (!acc[boot['option3']]) { acc[boot['option3']] = [] }
                    acc[boot['option3']].push(boot);
                    return acc;
                }, {})
            

            
            //hidalgo honey hacking + night on the town
            if (filteredBoots['Hidalgo Honey']) {

                const hhboots = filteredBoots['Hidalgo Honey'].reduce((acc, boot) => {
                    if (!acc[boot['title']]) { acc[boot['title']] = [] }
                    acc[boot['title']].push(boot);
                    return acc;
                }, {})
                filteredBoots['The Comal Hidalgo Honey'] = hhboots['The Comal']
                filteredBoots['The Lamar Hidalgo Honey'] = hhboots['The Lamar']

                delete filteredBoots['Hidalgo Honey']

            }

            if (filteredBoots['Night on the Town']) {
                const nottboots = filteredBoots['Night on the Town'].reduce((acc, boot) => {
                    if (!acc[boot['title']]) { acc[boot['title']] = [] }
                    acc[boot['title']].push(boot);
                    return acc;
                }, {})

                filteredBoots['The Stassney Night on the Town'] = nottboots['The Stassney']
                filteredBoots['The Duval Night on the Town'] = nottboots['The Duval']
                delete filteredBoots['Night on the Town']
            }
            

            

            return Object.keys(filteredBoots).map((key) => {
                return filteredBoots[key];
            });

        }





        const fetchBoots = async () => {
            if (!shoeSize || !shoeWidth) return;
            try {
                
                const bootDataURL = shoeWidth === "B" ? womenBootDataURL : menBootDataURL;
                setLoading(true);
                
                fetch(bootDataURL)

                    .then((response) => response.json())
                    .then((data) => {
                        

                        const filteredBoots = filterAndSortBoots(data)

                        setLoading(false);
                        setBootData(filteredBoots);
                        console.log('Boots fetched:', filteredBoots);
                        
                    })
                        
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
