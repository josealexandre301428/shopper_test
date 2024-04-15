const fs = require('fs');
const csvParser = require('csv-parser');
const { Transform } = require('stream');
const { error } = require('console');


const readCsv = (file) => {
    return new Promise((resolve, reject) => {
        let result = [];
        const readableStream = fs.createReadStream(file);
        const transformStreamToObj = csvParser({ separator: "," });

        const transformStreamToString = new Transform({
            readableObjectMode: true,
            writableObjectMode: true,
            transform(chunk, encoding, callback) {
                const obj = JSON.parse(JSON.stringify(chunk));
                this.push(obj);
                callback();
            },
        }).on('error', (err) => {
            console.log('Erro ao processar o Arquivo:', err);
            reject(err); // Rejeita a Promise em caso de erro
        });

        readableStream
            .pipe(transformStreamToObj)
            .pipe(transformStreamToString)
            .on('data', (data) => {
                result.push(data);
            })
            .on('end', () => {
                console.log('Leitura do Arquivo Concluída!');
                resolve(result); // Resolve a Promise com os dados lidos
            })
            .on('error', (err) => {
                console.log('Erro durante a leitura do arquivo:', err);
                reject(err); // Rejeita a Promise em caso de erro
            });
    });
};

const validCsv = (base, csv) => {
    const products = [];

    csv.forEach((csvProduct, index) => {
        const foundProduct = base.find((product) => product.dataValues.code == csvProduct.product_code);
        if (foundProduct) {
            const baseProductSalesPrice = Number(foundProduct.dataValues.sales_price);
            const baseProductCostPrice = Number(foundProduct.dataValues.cost_price);
            const csvProductPrice = Number(csvProduct.new_price);

            const biggerThanCost = csvProductPrice >= baseProductCostPrice;
            const maxPriceAdjustment = Number(baseProductSalesPrice * 0.10);
            const isValidPriceAdjustment = Math.abs(baseProductSalesPrice - csvProductPrice) <= maxPriceAdjustment;

            if (biggerThanCost && isValidPriceAdjustment) {
                products.push({ code: foundProduct.dataValues.code, new_price: csvProduct.new_price});
            } else {
                products.push({
                    code: foundProduct.dataValues.code,
                    new_price: csvProduct.new_price,
                    message: `O novo preço não pode ser menor que o custo e deve estar dentro de 10% do valor de venda atual. Erro encontrado na linha: ${index + 1}`
                });
            };
        } else {
            throw new Error(`Produto com código ${csvProduct.product_code}, que consta na linha ${index + 1}, não encontrado na base de dados`);
        }
    });

    return products;
}

module.exports = {
    readCsv,
    validCsv
};