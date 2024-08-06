import React, { useEffect } from "react";
import ItemList from "../components/ItemList/ItemList";
import { getALL } from "../service/productService";
import { toast } from "react-toastify";
import { toastOptions } from "../util/toastOptions";
import Sidebar from "../components/Sidebar/Sidebar";
import { useDispatch, useSelector } from "react-redux";
import { saveProductsToStore } from "../store/productSlice";
import Login from "./Login";
import { useCookies } from "react-cookie";

const LandingPage = () => {
  const [cookies] = useCookies(["token"]);
  const isLoggedIn = cookies.token ? true : false;
  const {
    list: productsList,
    page,
    limit,
  } = useSelector((state) => (state ? state?.product : []));
  const dispatch = useDispatch();
  const getAllProducts = async () => {
    try {
      const response = await getALL(page, limit);
      if (response) {
        dispatch(saveProductsToStore(response));
      }
    } catch (error) {
      console.log("error: ", error);
      toast.error("Session timedout!", toastOptions);
    }
  };

  useEffect(() => {
    if (isLoggedIn) {
      getAllProducts();
    }
  }, [isLoggedIn]);
  return (
    <>
      {!isLoggedIn ? (
        <Login />
      ) : (
        <div className="h-full flex flex-row p-3">
          <ItemList items={productsList} />
          <Sidebar />
        </div>
      )}
    </>
  );
};

export default LandingPage;
