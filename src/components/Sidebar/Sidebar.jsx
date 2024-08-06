import React, { useEffect } from "react";
import { getCart } from "../../service/cartService";
import { toastOptions } from "../../util/toastOptions";
import { toast } from "react-toastify";
import CartItem from "../CartItem/CartItem";
import { useDispatch, useSelector } from "react-redux";
import { saveCartToStore } from "../../store/cartSlice";
import TextInput from "../TextInput/TextInput";
import Button from "../Button/Button";
import axios from "axios";

const Sidebar = () => {
  const cart = useSelector((state) => (state ? state.cart.items : []));

  // const { tax, cartTotal, subTotal } = useSelector((state) =>
  //   state ? state.cart : []
  // );
  const dispatch = useDispatch();
  const getAllCartitems = async () => {
    try {
      const response = await getCart();
      if (response) {
        dispatch(saveCartToStore(response));
      }
    } catch (error) {
      toast.error("failed to fetch cart items", toastOptions);
    }
  };

  const initiateCheckout = async () => {
    const response = await axios.post(
      "https://mercury-uat.phonepe.com/enterprise-sandbox/v3/qr/init",
      {},
      {
        headers: {
          accept: "text/plain",
          "Content-Type": "application/json",
        },
      }
    );
    console.log("qr res", response);
  };

  useEffect(() => {
    getAllCartitems();
  }, []);

  const calculateTotals = () => {
    let tax = 0;
    let cartTotal = 0;
    let subTotal = 0;
    cart.map((item) => (cartTotal += item.price * item.qty));
    tax = (cartTotal * 5) / 100;
    subTotal = cartTotal + tax;

    return { tax, cartTotal, subTotal };
  };

  const { subTotal, tax, cartTotal } = calculateTotals();

  return (
    <div className="h-full w-1/4 fixed right-1">
      <p className="text-3xl">Cart details</p>
      <hr className="my-2" />

      <div className="overflow-y-scroll">
        {cart && cart?.map((items) => <CartItem item={items} />)}
      </div>
      <div>
        <div className="flex flex-row items-center justify-between">
          <p>Cart Total</p>
          <p>{cartTotal.toFixed(2)}</p>
        </div>
        <div className="flex flex-row items-center justify-between">
          <p>Tax</p>
          <p>{tax.toFixed(2)}</p>
        </div>
        <hr />
        <div className="flex flex-row items-center justify-between">
          <p>Sub Total</p>
          <p>{subTotal.toFixed(2)}</p>
        </div>
      </div>

      <div className="mt-3">
        <p>Shipment</p>
        <hr className="my-2" />
        <div>
          <div>
            <label htmlFor="">Shipping address</label>
            <TextInput type="text" className={"w-80 border my-1"} />
          </div>
          <div>
            <label htmlFor="">Billing address</label>
            <TextInput type="text" className={"w-80 border my-1"} />
          </div>
          <div className="my-1 w-full">
            <Button
              text={"Proceed to checkout"}
              onClick={() => initiateCheckout()}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
