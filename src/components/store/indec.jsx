import { configureStore } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";

const intialcartstate = {
    items:[],
    totalamount:0,
    activeadd:false
};

const CartSlice = createSlice({
    name: "cart",
    initialState:intialcartstate,
    reducers:{
        additems(state,action){
            state.activeadd=true
            const alreadyexisted=state.items.find((item)=>item.id===action.payload.id)
            state.totalamount+=action.payload.price
            if(!alreadyexisted){
             state.items.push({
                id:action.payload.id,
                name:action.payload.name,
              description:action.payload.description,
                price:action.payload.price,
                quantity:1,
                totalamounteach:action.payload.price
             })}else{
                alreadyexisted.quantity++
                alreadyexisted.totalamounteach+=alreadyexisted.price
                 
             }

             },
        removeitems(state,action){
            state.activeadd=true
            const youritem=state.items.find((item)=>item.id===action.payload.id)
            if(youritem){
                youritem.quantity--
                youritem.totalamounteach-=youritem.price
                state.totalamount-=youritem.price
            }
            if(youritem.quantity===0){
                state.items = state.items.filter((item) => item.id !== action.payload.id);
            }

        },
        replacecart(state,action){
            state.activeadd=false
            state.items=action.payload.items
            state.totalamount=action.payload.totalamount

        }
    }

})

const intialcartshowstate={show:false,Notification:null}
const Showcart=createSlice({
    name:"showcart",
    initialState:intialcartshowstate,
    reducers:{
        showmycart(state){
            state.show=true
        },
        hidemycart(state){
            state.show=false
        },
        setnotification(state,action){
            state.Notification={
                status:action.payload.status,
                message:action.payload.message,
                title:action.payload.title

            }
        }

    }
})

const Store=configureStore({
    reducer:{
        cart:CartSlice.reducer,
        showcart:Showcart.reducer
        }
})
export default Store
export const CartActions=CartSlice.actions //if you want to use manipulated actions from reducer(cartActions.whichevre method you want to use from reducer)
export const Cartshowing=Showcart.actions