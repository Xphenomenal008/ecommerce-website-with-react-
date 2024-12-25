import React from 'react';
import { Allproducts } from './Allproducts';
import { useDispatch } from 'react-redux';
import { CartActions } from './store/indec';

const Products = () => {
    const dispatch=useDispatch()
const addclickhandler=(id,name,price,description)=>{
    console.log("your addclickhandler is working and actions are dispatched")
 dispatch(CartActions.additems({id,name,price,description}))

}

  const each = Allproducts.map((pro) => (
    <li
      key={pro.id}
      className="border border-gray-700 bg-slate-200 rounded-lg p-4 shadow-md hover:shadow-lg transition-shadow duration-300"
    >
      <h2 className="text-xl font-semibold text-gray-800 mb-2">{pro.name}</h2>
      <p className="text-lg text-green-600 font-medium">${Number(pro.price).toFixed(2)}</p>
      <p className="text-sm text-gray-600 mt-2">{pro.description}</p>
      <button onClick={()=>addclickhandler(pro.id,pro.name,pro.price,pro.description)} className='bg-blue-500 p-3 rounded-md'>addtocart</button>
    </li>
  ));

  return (
    <div className=" p-6 bg-yellow-200">
      <h1 className="text-2xl font-bold text-gray-900 mb-6 text-center">Our Products</h1>
      <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">{each}</ul>
    </div>
  );
};

export default Products;
