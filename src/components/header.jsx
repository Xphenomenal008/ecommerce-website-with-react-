import React from 'react';
import { useDispatch } from 'react-redux';
import { Cartshowing } from './store/indec';
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';

const Header = () => {
    const dispatch=useDispatch()
    const quantity=useSelector((state)=>state.cart.items)
    
   const actualquant=quantity.reduce((num,item)=>{
return num +item.quantity
    },0)

    const clickhandler=()=>{
        dispatch(Cartshowing.showmycart())
    }

  return (
    <div className="flex items-center justify-between px-4 py-2 bg-blue-600 text-white shadow-md">
      {/* Brand Logo */}
    <NavLink to="/">
    <div className="text-2xl font-bold tracking-wide">ReduxCart</div>
    </NavLink>
      

       

      
       

      {/* Cart Section */}
      <NavLink to="/cart">
      <div className="flex items-center space-x-4">
        <div className="relative">
          <button onClick={clickhandler} className="text-lg cursor-pointer font-medium">My Cart</button>
          <div
            className="absolute -top-2 -right-2 flex items-center justify-center h-5 w-5 bg-red-500 text-xs font-bold text-white rounded-full"
          >
            {actualquant}
          </div>
        </div>
      </div>

      </NavLink>
      

    </div>
  );
};

export default Header;
