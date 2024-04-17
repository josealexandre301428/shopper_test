import React, { useEffect, useState } from 'react';
import api from "../../services/Api";
import { validCsv, readCsv } from '../../services/validateFile';

export default function UpdateProducts() {
    const [ base, setBase] = useState([])
    const [selectedFile, setSelectedFile] = useState(null);
    const [fileNan, setFileNan] = useState(false);
    const [productsOk, setProductsOk] = useState([]);
    const [error, setError] = useState(false);
    const [success, setSuccess] = useState(false);
    const [errorProducts, setErrorProducts] = useState([]);
    const [disable, setDisable] = useState(true);


    const fetch = async () => { 
        try {
            const products =  await api.get('/products');
            setBase(products.data);
        } catch (error) {
            setError(true);
        }
 };

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        setSelectedFile(file);
        setFileNan(false);
        setDisable(true)
    };

    const handleButton = async (file) => {
        if (!file) {
            return setFileNan(true);
        } else {
            setErrorProducts([]);
            setError(false);
            setSuccess(false);
            setProductsOk([]);
            try {
                const products = await api.get('/products');
                setBase(products.data)
                const csvData = await readCsv(file);
                const validationResult = await validCsv(base, csvData);
    
                if (validationResult.errors.length > 0) {
                    setErrorProducts(validationResult.errors);
                    setError(true);
                } else {
                    const validProducts = validationResult.products;
                    setProductsOk(validProducts);
                    console.log(validProducts);
                    setDisable(false);
                }
            } catch (error) {
                console.error('Erro ao processar arquivo CSV:', error);
            }
        }
    };

    const handleUpload = async () => {
        if (selectedFile) {
            try {
                const response = await api.put('/upload', productsOk);
                console.log(response);
                setSuccess(true);
            } catch (error) {
                setError(true);
            }
        }
    };

    useEffect(() => {
        fetch()
    },[])

    return (
        <div>
            <h1 className='mb-4 mt-4 text-4xl text-center font-extrabold leading-none tracking-tight text-black'>Produtos</h1>
            <hr className="my-12 h-px border-t-0 bg-transparent bg-gradient-to-r from-transparent via-neutral-500 to-transparent opacity-25 dark:via-neutral-400" />
            <div className="py-4 mb-4">
                
                <div className="overflow-x-auto container mx-auto mb-20">
                    <table className="table-auto w-full border-collapse border border-black">
                        <thead>
                            <tr className="bg-blue-500">
                                <th className="px-4 py-2">Código</th>
                                <th className="px-4 py-2">Nome</th>
                                <th className="px-4 py-2">Preço de Custo</th>
                                <th className="px-4 py-2">Preço de Venda</th>
                            </tr>
                        </thead>
                        <tbody>
                           {base.map((prod, index) => {
                                const {code, name, sales_price, cost_price} = prod;
                                const cost = Number(cost_price).toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
                                const sales = Number(sales_price).toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 });

                                return (
                                    <tr key={index} className="bg-white">
                                        <td className="border border-black font-bold text-center px-4 py-2">{code}</td>
                                        <td className="border border-black text-center px-4 py-2">{name}</td>
                                        <td className="border border-black text-center px-4 py-2">{`R$ ${cost}`}</td>
                                        <td className="border border-black text-center px-4 py-2">{`R$ ${sales}`}</td>
                                    </tr>
                            )})}
                        </tbody>
                    </table>
                </div>
            </div>
            <h4 className='mb-4 mt-4 text-4xl text-center font-extrabold leading-none tracking-tight text-black'>Atualização de Produtos</h4>
            <hr className="my-12 h-px border-t-0 bg-transparent bg-gradient-to-r from-transparent via-neutral-500 to-transparent opacity-25 dark:via-neutral-400" />
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
            <div className="flex container mx-auto justify-center items-stretch mb-20">
                <button 
                    className="inline-block rounded mr-4 bg-blue-500 text-neutral-50 shadow-[0_4px_9px_-4px_rgba(51,45,45,0.7)] hover:bg-blue-600 hover:shadow-[0_8px_9px_-4px_rgba(51,45,45,0.2),0_4px_18px_0_rgba(51,45,45,0.1)] focus:bg-blue-800 focus:shadow-[0_8px_9px_-4px_rgba(51,45,45,0.2),0_4px_18px_0_rgba(51,45,45,0.1)] active:bg-blue-700 active:shadow-[0_8px_9px_-4px_rgba(51,45,45,0.2),0_4px_18px_0_rgba(51,45,45,0.1)] px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal transition duration-150 ease-in-out focus:outline-none focus:ring-0"
                    onClick={() => handleButton(selectedFile)}
                    >
                    Validar
                </button>
                {disable ? (
                    <button className="inline-block rounded border-2 border-red-500 text-red-500 hover:border-red-600 hover:bg-red-400 hover:bg-opacity-10 hover:text-red-600 focus:border-red-700 focus:text-red-700 active:border-red-800 active:text-red-800 dark:border-red-300 dark:text-red-300 dark:hover:hover:bg-red-300 px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal transition duration-150 ease-in-out focus:outline-none focus:ring-0" disabled>
                        Atualizar
                    </button>
                ) : (
                    <button
                        className="inline-block rounded bg-green-500 text-neutral-50 shadow-[0_4px_9px_-4px_rgba(51,45,45,0.7)] hover:bg-green-600 hover:shadow-[0_8px_9px_-4px_rgba(51,45,45,0.2),0_4px_18px_0_rgba(51,45,45,0.1)] focus:bg-green-800 focus:shadow-[0_8px_9px_-4px_rgba(51,45,45,0.2),0_4px_18px_0_rgba(51,45,45,0.1)] active:bg-green-700 active:shadow-[0_8px_9px_-4px_rgba(51,45,45,0.2),0_4px_18px_0_rgba(51,45,45,0.1)] px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal transition duration-150 ease-in-out focus:outline-none focus:ring-0"
                        onClick={handleUpload}
                        >
                        Atualizar
                    </button>
                ) }
            </div>
            {fileNan && (<h1 className="text-lg text-center font-semibold mb-20 mt-2">Selecione um arquivo!</h1>)}
            {error && (
                <div className="py-4">
                <h3 className="text-lg text-center font-semibold mb-2">Erros Encontrados:</h3>
                <div className="overflow-x-auto container mx-auto mb-20">
                    <table className="table-auto w-full border-collapse border border-black">
                        <thead>
                            <tr className="bg-red-500">
                                <th className="px-4 py-2">Código</th>
                                <th className="px-4 py-2">Nome</th>
                                <th className="px-4 py-2">Preço de Venda</th>
                                <th className="px-4 py-2">Novo Preço</th>
                                <th className="px-4 py-2">Motivo</th>
                            </tr>
                        </thead>
                        <tbody>
                            {errorProducts.map((prod, index) => {
                                const {code, name, sales_price, new_price, message} = prod;
                                const sales = Number(sales_price).toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
                                const newPrice = Number(new_price).toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
                                return (
                                <tr key={index} className="{{ index % 2 === 0 ? 'bg-gray-50' : 'bg-white' }}">
                                    <td className="border border-black font-bold text-center px-4 py-2">{code}</td>
                                    <td className="border border-black text-center px-4 py-2">{name}</td>
                                        <td className="border border-black text-center px-4 py-2">{`R$ ${sales}`}</td>
                                        <td className="border border-black text-center px-4 py-2">{`R$ ${newPrice}`}</td>
                                    <td className="border border-black text-center px-4 py-2">{message}</td>
                                </tr>
                            )})}
                        </tbody>
                    </table>
                </div>
            </div>
            )}
            {success && (
                <div className="py-4 mb-20">
                <h3 className="text-lg text-center font-semibold mb-2">Produtos alterados com Sucesso!</h3>
                <div className="overflow-x-auto container mx-auto">
                    <table className="table-auto w-full border-collapse border border-black">
                        <thead>
                            <tr className="bg-blue-500">
                                <th className="px-4 py-2">Código</th>
                                <th className="px-4 py-2">Nome</th>
                                <th className="px-4 py-2">Preço de Venda</th>
                                <th className="px-4 py-2">Novo Preço</th>
                            </tr>
                        </thead>
                        <tbody>
                            {productsOk.map((prod, index) => {
                                const {code, name, sales_price, new_price} = prod;
                                const sales = Number(sales_price).toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
                                const newPrice = Number(new_price).toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 });

                                return (
                                    <tr key={index} className="bg-white">
                                        <td className="border border-black font-bold text-center px-4 py-2">{code}</td>
                                        <td className="border border-black text-center px-4 py-2">{name}</td>
                                        <td className="border border-black text-center px-4 py-2">{`R$ ${sales}`}</td>
                                        <td className="border border-black text-center px-4 py-2">{`R$ ${newPrice}`}</td>
                                    </tr>
                            )})}
                        </tbody>
                    </table>
                </div>
            </div>
            
            )}
        </div>
    );
}

