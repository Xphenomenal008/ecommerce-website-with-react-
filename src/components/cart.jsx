import React from 'react';
import { useDispatch } from 'react-redux';
import { Cartshowing } from './store/indec';
import { useSelector } from 'react-redux';
import { CartActions } from './store/indec';

const Cart = () => {
    const dispatch=useDispatch()
    const items=useSelector((state)=>state.cart.items)
    const totalamount=useSelector((state)=>state.cart.totalamount)

    const handleClick=()=>{
        dispatch(Cartshowing.hidemycart())
    }

    const handleincrease=(id,price)=>{
        dispatch(CartActions.additems({id,price}))
    }
    const handledecrease=(id)=>{
        dispatch(CartActions.removeitems({id}))
    }

    const ouritem = items.map((item) =>  
        <li key={item.id}>
            <div className="bg-white p-4 rounded-lg shadow-md mb-4">
                <div className="flex justify-between items-center">
                    {/* Item Details */}
                    <div className="text-lg font-medium text-gray-700">{item.name}</div>
    
                    {/* Price Details */}
                    <div className="text-right">
                        <div className="text-xl font-semibold text-gray-800">${Number(item.totalamounteach).toFixed(2)}</div>
                        <div className="text-sm text-gray-500">${Number(item.price).toFixed(2)}</div>
                    </div>
                </div>
    
                {/* Quantity and Controls */}
                <div className="flex justify-between items-center mt-4">
                    <div className="text-gray-600">Qty: {item.quantity}</div>
                    <div className="flex space-x-2">
                        <button onClick={() => handleincrease(item.id, item.price)} className="px-3 py-1 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-all">+</button>
                        <button onClick={() => handledecrease(item.id)} className="px-3 py-1 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-all">-</button>
                    </div>
                </div>
            </div>
        </li>
    );
    
  return (
    <div className="fixed top-10 right-10 w-80 bg-gray-100 p-4 rounded-lg shadow-xl border border-gray-200">
      {/* Cart Heading */}
      <h1 className="text-2xl font-bold text-gray-800 mb-4 text-center">Your Cart</h1>
      <ul className="overflow-y-auto max-h-64">{totalamount === 0 ? "Your cart is empty add something 😏!!" : ouritem}</ul>      
      <div className='p-3 mt-4 bg-blue-500 text-white text-lg font-semibold rounded-lg text-center'>
        Total: ${Number(totalamount).toFixed(2)}
      </div>
      <button onClick={handleClick} className='w-full mt-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-all'>Close</button>
    </div>
  );
};

export default Cart;
