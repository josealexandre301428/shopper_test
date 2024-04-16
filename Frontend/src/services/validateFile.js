import Papa from 'papaparse';

const readCsv = (file) => {
    return new Promise((resolve, reject) => {
        const csv = [];
        Papa.parse(file, {
            header: true, 
            dynamicTyping: true,
            complete: (result) => {
                result.data.forEach((item) => csv.push(item));
                resolve(csv); // Resolve a Promise com o array csv após a operação de parsing ser concluída
            }, 
            error: (err) => {
                reject(new Error('Erro ao analisar o CSV:' + err.message)); // Rejeita a Promise em caso de erro
            },
        });
    });
};

export const validCsv = async (base, file) => {
    const products = [];
    try {
        const csv = await readCsv(file); // Espera até que a operação de parsing do CSV seja concluída
        csv.forEach((csvProduct, index) => {
            const foundProduct = base.data.find((product) => product.code === csvProduct.product_code);
            if (foundProduct) {
                const baseProductSalesPrice = Number(foundProduct.sales_price);
                const baseProductCostPrice = Number(foundProduct.cost_price);
                const csvProductPrice = Number(csvProduct.new_price);
    
                const biggerThanCost = csvProductPrice >= baseProductCostPrice;
                const maxPriceAdjustment = Number(baseProductSalesPrice * 0.10);
                const isValidPriceAdjustment = Math.abs(baseProductSalesPrice - csvProductPrice) <= maxPriceAdjustment;
    
                if (biggerThanCost && isValidPriceAdjustment) {
                    products.push({
                        code: foundProduct.code,
                        name:foundProduct.name,
                        sales_price: foundProduct.sales_price,
                        new_price: csvProduct.new_price });
                } else {
                    products.push({
                        code: foundProduct.code,
                        name:foundProduct.name,
                        sales_price: foundProduct.sales_price,
                        new_price: csvProduct.new_price,
                        message: `O novo preço não pode ser menor que o custo e deve estar dentro de 10% do valor de venda atual. Erro encontrado na linha: ${index + 1}`
                    });
                }
            } else {
                throw new Error(`Produto com código ${csvProduct.product_code}, que consta na linha ${index + 1}, não encontrado na base de dados`);
            }
        });
        return products;
    } catch (error) {
        throw new Error(error.message); // Rejeita a Promise com o erro em caso de falha na operação de parsing do CSV
    }
};
