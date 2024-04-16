import React, { useState } from 'react';
import api from "../../services/Api";
import { validCsv } from '../../services/validateFile';

export default function UpdateProducts() {
    const [selectedFile, setSelectedFile] = useState(null);
    const [productsOk, setProductsOk] = useState([]);
    const [error, setError] = useState(false);
    const [success, setSuccess] = useState(false);
    const [errorProducts, setErrorProducts] = useState([]);
    const [disable, setDisable] = useState(true);

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        setSelectedFile(file);
    };

    const handleButton = async () => {
            setErrorProducts([]);
            setError(false);
            setSuccess(false);
            setProductsOk([]);
            const products = await api.get('/products');
            const handleCsv = await validCsv(products, selectedFile);
            const productsWithErrors = handleCsv.filter((prod) => prod.message);

            if (productsWithErrors.length > 0) {
                setErrorProducts(productsWithErrors);
                setError(true);
            }else{
                setDisable(false);
            }
    };

    const handleUpload = async () => {
        if (selectedFile) {
            try {
                const products = await api.get('/products');
                const handleCsv = await validCsv(products, selectedFile);
                const response = await api.put('/upload', handleCsv);
                console.log(response);
                setProductsOk(handleCsv);
                setSuccess(true);
            } catch (error) {
                setError(true);
            }
        }
    };

    return (
        <div>
            <h2>Upload de Arquivo CSV</h2>
            <input type="file" accept=".csv" onChange={handleFileChange} /><br />
            <button onClick={handleButton}>Validar</button> <br />
            <button disabled={disable} onClick={handleUpload}>Upload</button>
            {error && (
                <div>
                    <h3>Erros Encontrados:</h3>
                    <table>
                        <thead>
                            <tr>
                                <th>Código</th>
                                <th>Nome</th>
                                <th>Preço de Venda</th>
                                <th>Novo Preço</th>
                                <th>Motivo</th>
                            </tr>
                        </thead>
                        <tbody>
                            {errorProducts.map((prod, index) => (
                                <tr key={index}>
                                    <td>{prod.code}</td>
                                    <td>{prod.name}</td>
                                    <td>{prod.sales_price}</td>
                                    <td>{prod.new_price}</td>
                                    <td>{prod.message}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
            {success && (
                <div>
                    <h3>Produtos alterados com Sucesso!</h3>
                    <table>
                        <thead>
                            <tr>
                                <th>Código</th>
                                <th>Nome</th>
                                <th>Preço de Venda</th>
                                <th>Novo Preço</th>
                            </tr>
                        </thead>
                        <tbody>
                            {productsOk.map((prod, index) => (
                                <tr key={index}>
                                    <td>{prod.code}</td>
                                    <td>{prod.name}</td>
                                    <td>{prod.sales_price}</td>
                                    <td>{prod.new_price}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
}

