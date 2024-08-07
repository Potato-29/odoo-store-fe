import React from "react";
import { toast } from "react-toastify";
import { toastOptions } from "../../util/toastOptions";
import { updateCart } from "../../service/cartService";
import { useDispatch } from "react-redux";
import { decreaseQty, increaseQty } from "../../store/cartSlice";
const CartItem = ({ item, cart }) => {
  const dispatch = useDispatch();

  const updateQty = async (type) => {
    try {
      dispatch(type === "increase" ? increaseQty(item) : decreaseQty(item));
      const response = await updateCart(
        cart.cartId,
        cart.items,
        item._id,
        type
      );
    } catch (error) {
      console.log(error);
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
        <p>${item?.price * item?.qty}</p>
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
