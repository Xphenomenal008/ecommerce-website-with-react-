 import Header from "./components/header";
import Products from "./components/products";
import Cart from "./components/cart";
import { useState } from "react";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { CartActions, Cartshowing } from "./components/store/indec";
import Notification from "./components/notification"
import { Navigate, Route, Routes } from "react-router-dom";
import Productsdetail from "./components/productsdetail";
import { redirect } from "react-router-dom";

 

function App() {
  const showC = useSelector((state) => state.showcart.show);
  const commingNotification = useSelector((state) => state.showcart.Notification);
  const becart = useSelector((state) => state.cart);
  const activeadd = useSelector((state) => state.cart.activeadd);
  const dispatch = useDispatch();
  const [state, setOurState] = useState(false);

  // Fetching data from Firebase
  useEffect(() => {
    const getCartData = async () => {
      try {
        const res = await fetch("https://realtimecart-5f1b5-default-rtdb.firebaseio.com/carty.json");
        if (!res.ok) {
          throw new Error("Failed to fetch cart data");
        }
        const data = await res.json();
        dispatch(
          CartActions.replacecart({
            items: data?.items || [],
            totalamount: data?.totalamount || 0,
          })
        );
      } catch (error) {
        dispatch(
          Cartshowing.setnotification({
            status: "error",
            message: "Unable to fetch cart data",
            title: "Fetching Error",
          })
        );
        console.error("Fetching cart data failed:", error);
      }
    };

    getCartData();
  }, [dispatch]);

  // Sending data to Firebase
  useEffect(() => {
    const sendCartData = async () => {
      dispatch(
        Cartshowing.setnotification({
          message: "Sending cart data...",
          status: "pending",
          title: "Sending",
        })
      );

      try {
        const response = await fetch("https://realtimecart-5f1b5-default-rtdb.firebaseio.com/carty.json", {
          method: "PUT",
          body: JSON.stringify({
            items: becart.items,
            totalamount: becart.totalamount,
          }),
        });
        if (!response.ok) {
          throw new Error("Failed to send cart data");
        }

        dispatch(
          Cartshowing.setnotification({
            message: "Cart data sent successfully",
            status: "success",
            title: "Success",
          })
        );
      } catch (error) {
        dispatch(
          Cartshowing.setnotification({
            message: "Sending cart data failed",
            status: "error",
            title: "Failed",
          })
        );
        console.error("Error sending cart data:", error);
      }
    };

    if (!state) {
      setOurState(true);
      return;
    }

    if (activeadd) {
      sendCartData();
    }
  }, [becart, dispatch, activeadd, state]);

  return (
    <div className="px-12 py-3">
      {commingNotification && (
        <Notification
          status={commingNotification.status}
          message={commingNotification.message}
          title={commingNotification.title}
        />
      )}
      <Header></Header>
     <Routes>
   <Route path="/products" element={<Products />}  />
   <Route path="/" element={<Navigate to="/products" replace />} />
   
   <Route path="/:ID" element={<Productsdetail></Productsdetail>}/>
   
  <Route path="/cart" element={<Cart />} />
</Routes>
</div>
  );
}

export default App;
