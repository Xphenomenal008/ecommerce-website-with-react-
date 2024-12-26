import React from 'react';
import { useDispatch } from 'react-redux';
import { CartActions } from './store/indec';
import { useSelector } from 'react-redux';

const Cart = () => {
    const dispatch = useDispatch();
    const items = useSelector((state) => state.cart.items);
    const totalamount = useSelector((state) => state.cart.totalamount);

    const handleIncrease = (id, price) => {
        dispatch(CartActions.additems({ id, price }));
    };

    const handleDecrease = (id) => {
        dispatch(CartActions.removeitems({ id }));
    };

    const cartItems = items.map((item) => (
        <div key={item.id} className="flex flex-col sm:flex-row items-center justify-between bg-white p-6 rounded-lg shadow-md mb-4">
            <div className="flex-1 sm:mr-4">
                <h3 className="text-lg font-semibold text-gray-800">{item.name}</h3>
                <div className="mt-1 text-sm text-gray-600">Unit Price: ${Number(item.price).toFixed(2)}</div>
                <div className="mt-1 text-sm text-gray-600">Total: ${Number(item.totalamounteach).toFixed(2)}</div>
            </div>
            <div className="flex items-center space-x-4 mt-4 sm:mt-0">
                <button 
                    onClick={() => handleIncrease(item.id, item.price)} 
                    className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-all"
                >
                    +
                </button>
                <span className="px-4 py-2 text-gray-700 bg-gray-200 rounded-md">Qty: {item.quantity}</span>
                <button 
                    onClick={() => handleDecrease(item.id)} 
                    className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-all"
                >
                    -
                </button>
            </div>
        </div>
    ));

    return (
        <div className="min-h-screen bg-gray-100 py-10 px-6">
            <div className="max-w-3xl mx-auto">
                <h1 className="text-3xl font-bold text-center text-gray-800 mb-8">Your Cart</h1>

                {items.length === 0 ? (
                    <div className="text-center text-gray-600 text-lg">Your cart is empty. Add some items to get started!</div>
                ) : (
                    <div className="space-y-4">{cartItems}</div>
                )}

                <div className="mt-8 bg-white p-6 rounded-lg shadow-md">
                    <div className="text-xl font-semibold text-gray-800 flex justify-between">
                        <span>Total Amount:</span>
                        <span>${Number(totalamount).toFixed(2)}</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Cart;
