import React from "react";
import { toast } from "react-toastify";
import { toastOptions } from "../../util/toastOptions";
import { getCart, updateCart } from "../../service/cartService";
import { useDispatch, useSelector } from "react-redux";
import {
  saveCartToStore,
  setCartTotal,
  setSubTotal,
  setTax,
} from "../../store/cartSlice";
const CartItem = ({ item }) => {
  const dispatch = useDispatch();
  const cart = useSelector((state) => (state ? state.cart.items : []));

  const updateQty = async (type) => {
    try {
      const response = await updateCart(item._id, type);
      if (response) {
        const cart = await getCart();
        dispatch(saveCartToStore(cart));
        // calculateTotals();
      }
    } catch (error) {
      toast.error("Failed to update", toastOptions);
    }
  };

  return (
    <div className="flex flex-row my-2 py-2 border">
      <div className="w-16 h-16 mx-2">
        <img src={item?.image} alt="" />
      </div>
      <div>
        <p>{item?.name}</p>
        <p>{item?.price * item?.qty}</p>
        <div className="flex flex-row">
          <button
            onClick={() => updateQty("decrease")}
            className="mx-1 px-2 border-2 rounded-lg"
          >
            -
          </button>
          <p>{item?.qty}</p>
          <button
            onClick={() => updateQty("increase")}
            className="mx-1 px-2 border-2 rounded-lg"
          >
            +
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
