import React, { useEffect, useState } from "react";
import { getCart } from "../../service/cartService";
import { toastOptions } from "../../util/toastOptions";
import { toast } from "react-toastify";
import CartItem from "../CartItem/CartItem";
import { useDispatch, useSelector } from "react-redux";
import { clearCart, saveCartToStore } from "../../store/cartSlice";
import TextInput from "../TextInput/TextInput";
import Button from "../Button/Button";
import { placeOrder } from "../../service/orderService";

const Sidebar = () => {
  const cart = useSelector((state) => (state ? state.cart : []));
  const user = JSON.parse(window.sessionStorage.getItem("user"));
  const [shippingAddress, setShippingAddress] = useState("");
  const [billingAddress, setBillingAddress] = useState("");

  const dispatch = useDispatch();
  const getAllCartitems = async () => {
    try {
      const response = await getCart(user.id);
      if (response) {
        dispatch(saveCartToStore(response));
      }
    } catch (error) {
      console.log("error: ", error);
      toast.error("failed to fetch cart items", toastOptions);
    }
  };

  const initiateCheckout = async () => {
    try {
      const response = await placeOrder({
        user,
        order: cart,
        address: { shippingAddress, billingAddress },
      });
      if (response) {
        dispatch(clearCart());
        const cart = await getCart(user.id);
        dispatch(saveCartToStore(cart));
        toast.success("Order Placed!", toast.success);
      }
    } catch (error) {
      console.log("error: ", error);
      toast.error("Something went wrong!", toastOptions);
    }
  };

  useEffect(() => {
    getAllCartitems();
  }, []);

  const calculateTotals = () => {
    let tax = 0;
    let cartTotal = 0;
    let subTotal = 0;
    cart?.items?.map((item) => (cartTotal += item.price * item.qty));
    tax = (cartTotal * 5) / 100;
    subTotal = cartTotal + tax;

    return { tax, cartTotal, subTotal };
  };

  const { subTotal, tax, cartTotal } = calculateTotals();

  return (
    <div className="h-full w-1/4 fixed right-1">
      <p className="text-3xl">Cart details</p>
      <hr className="my-2" />

      <div className="overflow-y-scroll max-h-80">
        {cart &&
          cart?.items?.map((item) => <CartItem cart={cart} item={item} />)}
      </div>
      <div>
        <div className="flex flex-row items-center justify-between">
          <p>Cart Total</p>
          <p>${cartTotal.toFixed(2)}</p>
        </div>
        <div className="flex flex-row items-center justify-between">
          <p>Tax</p>
          <p>${tax.toFixed(2)}</p>
        </div>
        <hr />
        <div className="flex flex-row items-center justify-between">
          <p>Sub Total</p>
          <p>${subTotal.toFixed(2)}</p>
        </div>
      </div>

      <div className="mt-3">
        <p>Shipment</p>
        <hr className="my-2" />
        <div>
          <div>
            <label htmlFor="">Shipping address</label>
            <TextInput
              value={shippingAddress}
              onChange={(e) => setShippingAddress(e.target.value)}
              type="text"
              className={"w-80 border my-1"}
            />
          </div>
          <div>
            <label htmlFor="">Billing address</label>
            <TextInput
              value={billingAddress}
              onChange={(e) => setBillingAddress(e.target.value)}
              type="text"
              className={"w-80 border my-1"}
            />
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
