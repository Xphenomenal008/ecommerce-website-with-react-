 import Header from "./components/header";
import Products from "./components/products";
import Cart from "./components/cart";
import { useState } from "react";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { CartActions, Cartshowing } from "./components/store/indec";
import Notification from "./components/notification"

function App() {
  const showC=useSelector((state)=>state.showcart.show)
  const commingNotification=useSelector((state)=>state.showcart.Notification)
  
  const becart=useSelector((state)=>state.cart)
  const activeadd=useSelector((state)=>state.cart.activeadd)
  const dispatch=useDispatch()
  const [state,setourstate]=useState(false)



  //fetching data
  useEffect(()=>{
    const getcartdata=async()=>{
      const res=await fetch("https://realtimecart-5f1b5-default-rtdb.firebaseio.com/carty.json")
      const data=await res.json()
       
      if(!res.ok){
        throw new Error("cant fetch");
        
      }
        dispatch(CartActions.replacecart({items:data.items||[],totalamount:data.totalamount}))

    }
  getcartdata().catch((error)=>{
    dispatch(Cartshowing.setnotification({
      status:"fetching error",
      message:"not able to fetch",
      title:"nofetching"

    }))

  })

  },[dispatch])


//----------------------------------------------------------------------------------------------------------------------------------------

//sending data
 useEffect(()=>{
  const sendCartdata=async ()=>{
    dispatch(Cartshowing.setnotification(
      {message:'sending cart data',status:'pending',title:'sending'}
    ))
    const response=await fetch('https://realtimecart-5f1b5-default-rtdb.firebaseio.com/carty.json', {
      method: 'PUT',
      body: JSON.stringify({
        items: becart.items,
        totalamount: becart.totalamount
      }),
    });
    if(!response.ok){
      throw new Error('sending failed')
    }
    dispatch(Cartshowing.setnotification(
      {message:'sent cart data',status:'success',title:'sent'}
    ))
     
  }
  if(!state){   //it bloks the ist time sending of data intially--its a technique 
    setourstate(true)
    return
  }
  if(activeadd){
    sendCartdata().catch((error)=>{
      dispatch(Cartshowing.setnotification(
        {message:'sending cart data failed',status:'error',title:'failed'}
      ))
    })
  }
 
},[becart,dispatch])


//-------------------------------------------------------------------------------------------------------------------------------
  return (
    <div className="px-12 py-3 ">
    {commingNotification && <Notification status={commingNotification.status} message={commingNotification.message}></Notification>}
    <Header></Header>
   {showC && <Cart></Cart>}
    <Products></Products>
    </div>
  );
}

export default App;
