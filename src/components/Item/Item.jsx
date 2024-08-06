import React, { useState } from "react";
import Button from "../Button/Button";
import { addToCart } from "../../service/productService";
import { toast } from "react-toastify";
import { toastOptions } from "../../util/toastOptions";
import { getCart, updateCart } from "../../service/cartService";
import { useDispatch, useSelector } from "react-redux";
import { saveCartToStore } from "../../store/cartSlice";

const Item = ({ item }) => {
  const dispatch = useDispatch();
  const cart = useSelector((state) => (state ? state.cart.items : []));
  const addItem = async () => {
    try {
      const response = await addToCart(item);
      if (response) {
        const cart = await getCart();
        dispatch(saveCartToStore(cart));
      }
    } catch (error) {
      toast.error("failed to add to cart", toastOptions);
    }
  };

  const updateQty = async (type) => {
    try {
      const response = await updateCart(item._id, type);
      if (response) {
        const cart = await getCart();
        dispatch(saveCartToStore(cart));
      }
    } catch (error) {
      toast.error("Failed to update", toastOptions);
    }
  };

  const cartItem = cart.find((cartItem) => cartItem._id === item._id);

  return (
    <div className="">
      <div className="h-32 w-32">
        <img src={item.image} alt="" />
      </div>
      <div className="">
        <p>{item.name}</p>
        <p>${item.price}</p>
      </div>
      <div>
        {cartItem ? (
          <div className="flex items-center space-x-2">
            <button
              onClick={() => updateQty("decrease")}
              className="px-2 py-1 bg-red-500 text-white rounded"
            >
              -
            </button>
            <span>{cartItem.qty}</span>
            <button
              onClick={() => updateQty("increase")}
              className="px-2 py-1 bg-green-500 text-white rounded"
            >
              +
            </button>
          </div>
        ) : (
          <Button
            onClick={() => addItem()}
            text="Add to cart"
            className=" text-white rounded"
          />
        )}
      </div>
    </div>
  );
};

export default Item;
