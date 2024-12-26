import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Allproducts } from './Allproducts';
import { useDispatch } from 'react-redux';
import { CartActions } from './store/indec';

const Productsdetail = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { ID } = useParams();

    const found = Allproducts.find((pro) => pro.id == ID);

    const addHandler = () => {
        dispatch(CartActions.additems({ id: found.id, name: found.name, price: found.price, description: found.description }));
    };

    const handleBack = () => {
        navigate(-1);
    };

    if (!found) {
        return (
            <div className="flex items-center justify-center min-h-screen bg-gray-100">
                <p className="text-2xl text-red-500 font-semibold">Product not found</p>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-100 flex items-center justify-center">
            <div className="max-w-2xl bg-white rounded-lg shadow-lg p-6">
                <h1 className="text-3xl font-bold text-gray-800 mb-4">{found.name}</h1>
                <p className="text-lg text-gray-700 mb-4">{found.description}</p>
                <p className="text-2xl text-green-600 font-bold mb-6">${Number(found.price).toFixed(2)}</p>
                <div className="flex space-x-4">
                    <button 
                        onClick={addHandler} 
                        className="px-6 py-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-all"
                    >
                        Add to Cart
                    </button>
                    <button 
                        onClick={handleBack} 
                        className="px-6 py-2 bg-gray-600 text-white font-semibold rounded-lg hover:bg-gray-700 transition-all"
                    >
                        Go Back
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Productsdetail;
