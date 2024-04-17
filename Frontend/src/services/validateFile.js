import Papa from 'papaparse';

export const readCsv = (file) => {
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

const validarCamposNumericos = (produto) => {
    if (isNaN(Number(produto.new_price))) {
        throw new Error('Os preços devem ser valores numéricos válidos.');
    }
};

const validarProdutoExistente = (baseProdutos, produto) => {
    if (!baseProdutos.find((baseProduto) => baseProduto.code === produto.product_code)) {
        throw new Error(`O código do produto '${produto.code}' não existe na base de dados.`);
    }
};

const validarPrecosPreenchidos = (produto) => {
    if (!produto.new_price) {
        throw new Error('Os preços devem ser preenchidos.');
    }
};

export const validCsv = async (baseProdutos, csvData) => {
    const errors = [];
    const products = [];

    if (!csvData || csvData.length === 0) {
        errors.push({
            message: "O arquivo CSV está vazio."
        });
        return { products, errors };
    }

    const camposObrigatorios = ['product_code', 'new_price'];

    const headerFields = Object.keys(csvData[0]);
    for (const campo of camposObrigatorios) {
        if (!headerFields.includes(campo)) {
            errors.push({
                message: `Campo obrigatório '${campo}' não encontrado no arquivo CSV.`
            });
        }
    }

    const baseProdutosMap = new Map(baseProdutos.map(product => [product.code, product]));

    for (let i = 0; i < csvData.length; i++) {
        const csvProduct = csvData[i];

        try {
            validarCamposNumericos(csvProduct);
            validarPrecosPreenchidos(csvProduct);

            const foundProduct = baseProdutosMap.get(csvProduct.product_code);

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
                        name: foundProduct.name,
                        sales_price: foundProduct.sales_price,
                        new_price: csvProduct.new_price
                    });
                } else {
                    errors.push({
                        code: foundProduct.code,
                        name: foundProduct.name,
                        sales_price: foundProduct.sales_price,
                        new_price: csvProduct.new_price,
                        message: `O novo preço não pode ser menor que o custo e deve estar dentro de 10% do valor de venda atual. Erro encontrado na linha: ${i + 1}`
                    });
                }
            } else {
                errors.push({
                    code: csvProduct.product_code,
                    new_price: csvProduct.new_price,
                    message: `Produto com código ${csvProduct.product_code}, que consta na linha ${i + 1}, não encontrado na base de dados`
                });
            }
        } catch (error) {
            errors.push({
                code: csvProduct.product_code,
                new_price: csvProduct.new_price,
                message: `Erro de validação na linha ${i + 1}: ${error.message}`
            });
        }
    }

    return { products, errors };
};