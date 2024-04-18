export const havePacks = (baseProdutos, csvData, basePacks) => {
    const relatedProducts = new Map();

    csvData.forEach(csvProduct => {
        const relatedProduct = baseProdutos.find(product => product.code === csvProduct.product_code);
        if (relatedProduct) {
            relatedProducts.set(relatedProduct.code, { ...relatedProduct, new_price: parseFloat(csvProduct.new_price) });
        }
    });


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
            relatedProducts.forEach(product => {
                productsInPack.push({ ...product, qty: pack.qty, pack_id });
            });
        });
        productsInPacksMap.set(pack_id, productsInPack);
    });
    

    const produtosAlterados = [];
    csvData.forEach(csvProduct => {
        const relatedProduct = relatedProducts.get(csvProduct.product_code);
        if (relatedProduct) {
            productsInPacksMap.forEach((pack) => {
                pack.forEach((prod) => {
                    if (prod.code === relatedProduct.code) {
                        Object.assign(prod, relatedProduct);
                        produtosAlterados.push(prod.code);
                    }
                });
            });
        }
    });

    productsInPacksMap.forEach((pack) => {
        const hasAlteredProduct = pack.some((prod) => produtosAlterados.includes(prod.code));
        if (hasAlteredProduct) {
            let totalValue = 0;
            
            pack.forEach((prod) => {
                if (prod.new_price !== undefined && prod.new_price !== null) {
                    totalValue += prod.new_price * prod.qty;
                } else {
                    totalValue += prod.sales_price * prod.qty;
                }
            });
            totalValue = parseFloat(totalValue.toFixed(2));
            pack.totalValue = totalValue;
        }
    });
   console.log(productsInPacksMap);
   return productsInPacksMap;

};