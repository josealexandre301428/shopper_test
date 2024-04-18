export const havePacks = (baseProdutos, csvData, basePacks) => {
    const relatedProducts = new Map();

    csvData.forEach(csvProduct => {
        const relatedProduct = baseProdutos.find(product => product.code === csvProduct.product_code);
        if (relatedProduct) {
            relatedProducts.set(relatedProduct.code, { ...relatedProduct, new_price: parseFloat(csvProduct.new_price) });
        }
    });


    // Encontrar produtos relacionados a cada pacote
    const packsMap = new Map();
    basePacks.forEach(pack => {
        if (!packsMap.has(pack.pack_id)) {
            packsMap.set(pack.pack_id, []);
        }
        packsMap.get(pack.pack_id).push(pack);
    });

    const relatedProductsMap = new Map();
    baseProdutos.forEach(prod => {
        if (!relatedProductsMap.has(prod.code)) {
            relatedProductsMap.set(prod.code, []);
        }
        relatedProductsMap.get(prod.code).push(prod);
    });


    const productsInPacksMap = new Map();
    packsMap.forEach((packs, pack_id) => {
        const productsInPack = [];
        packs.forEach(pack => {
            const relatedProducts = relatedProductsMap.get(pack.product_id) || [];
            productsInPack.push(...relatedProducts);
        });
        productsInPacksMap.set(pack_id, productsInPack);
    });


    csvData.forEach(csvProduct => {
        const relatedProduct = relatedProducts.get(csvProduct.product_code);
        if (relatedProduct) {
            const pack_id = relatedProduct.pack_id;
            const productsInPack = productsInPacksMap.get(pack_id);
            if (productsInPack) {
                // Encontrou o pacote no mapa, agora substitua o produto correspondente pelo novo produto com o novo preço
                const index = productsInPack.findIndex(product => product.code === relatedProduct.code);
                if (index !== -1) {
                    productsInPack[index] = relatedProduct;
                }
            }
        }
    });
    
    

    console.log(productsInPacksMap);


    return updatedProducts;
};