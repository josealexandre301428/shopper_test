import React, { useState } from 'react';
import api from "../../services/Api";
import { validCsv } from '../../services/validateFile';

export default function UpdateProducts() {
    const [selectedFile, setSelectedFile] = useState(null);
    const [fileNan, setFileNan] = useState(false);
    const [productsOk, setProductsOk] = useState([]);
    const [error, setError] = useState(false);
    const [success, setSuccess] = useState(false);
    const [errorProducts, setErrorProducts] = useState([]);
    const [disable, setDisable] = useState(true);

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        setSelectedFile(file);
        setFileNan(false);
        setDisable(true)
    };

    const handleButton = async (file) => {
        if (!file) {
            return setFileNan(true)
        }else {
            setError(true);
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
            };
        };
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
            <h2 className='mb-4 mt-4 text-4xl text-center font-extrabold leading-none tracking-tight text-black lg:text-6xl'>Atualização de Produtos</h2>
            <div className="flex container mb-3 mx-auto justify-center grid grid-cols-1 gap-1">
                <label
                    htmlFor="formFile"
                    className="mb-2 inline-block text-neutral-500"
                >Faça o Upload do Arquivo:
                </label>
                <input
                    className="relative m-0 block w-full min-w-0 flex-auto cursor-pointer rounded border border-solid border-secondary-500 bg-transparent bg-clip-padding px-3 py-[0.32rem] text-base font-normal text-surface transition duration-300 ease-in-out file:-mx-3 file:-my-[0.32rem] file:me-3 file:cursor-pointer file:overflow-hidden file:rounded-none file:border-0 file:border-e file:border-solid file:border-inherit file:bg-transparent file:px-3  file:py-[0.32rem] file:text-surface focus:border-primary focus:text-gray-700 focus:shadow-inset focus:outline-none"
                    type="file"
                    id="formFile"
                    onChange={handleFileChange}/>
            </div>
            <div className="flex container mx-auto justify-center">
                <button 
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                    onClick={() => handleButton(selectedFile)}
                    >
                    Validar
                </button>
                {disable ? (
                    <button className="bg-red-700 px-4 py-2 rounded-md cursor-not-allowed text-white opacity-50" disabled>
                        Upload
                    </button>
                ) : (
                    <button
                        className="bg-green-700 hover:bg-green-800 disable:bg-red-700 text-white font-bold py-2 px-4 rounded"
                        onClick={handleUpload}
                        >
                        Upload
                    </button>
                ) }
            </div>
            {fileNan && (<h1>Arquivo não carregado</h1>)}
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

