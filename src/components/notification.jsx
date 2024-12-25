import React, { useState, useEffect } from "react";

const Notification = (props) => {
  const [prop, setProp] = useState(null);

  useEffect(() => {
    if (props.status === "pending") {
      setProp("pending");
    } else if (props.status === "error") {
      setProp("error");
    } else if (props.status === "success") {
      setProp("success");
    } else if (props.status === "fetching error"){
        setProp("fetching error");
    }

    const timer = setTimeout(() => {
      setProp(null);
    }, 4000);

    return () => clearTimeout(timer);
  }, [props.status]);

  return (
    <>
      {prop && (
        <div
          className={`fixed top-5 right-5 z-50 p-4 rounded-lg shadow-lg animate-fade-in-out ${
            prop === "success" ? "bg-green-500 text-white": prop === "error"? "bg-red-500 text-white": prop === "pending" ? "bg-yellow-500 text-black" : "bg-red-500 text-white" 
          }`}
        >
          <span className="text-2xl">{props.message}</span>
        </div>
      )}
    </>
  );
};

export default Notification;
