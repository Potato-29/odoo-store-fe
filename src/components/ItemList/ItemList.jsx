import React from "react";
import Item from "../Item/Item";
import Button from "../Button/Button";
import { useDispatch, useSelector } from "react-redux";
import { getALL } from "../../service/productService";
import { saveProductsToStore } from "../../store/productSlice";
import { toast } from "react-toastify";
import { toastOptions } from "../../util/toastOptions";

const ItemList = ({ items }) => {
  const pages = [];
  const dispatch = useDispatch();
  const {
    page: currentpage,
    limit,
    totalPages,
  } = useSelector((state) => (state ? state?.product : []));

  for (let i = 1; i <= totalPages; i++) {
    pages.push(i);
  }

  const getAllProducts = async (page) => {
    try {
      const response = await getALL(page, limit);
      if (response) {
        dispatch(saveProductsToStore(response));
      }
    } catch (error) {
      console.log("error: ", error);
      toast.error("Failed to get all products", toastOptions);
    }
  };

  return (
    <div className="w-3/4 mr-2">
      <p className="text-3xl">Products</p>
      <hr className="my-2" />
      <div className="grid grid-cols-4 min-h-[70%]">
        {items && items.map((item) => <Item item={item} />)}
      </div>
      <div className="my-3 flex flex-row">
        <Button
          onClick={() => getAllProducts(currentpage - 1)}
          className={"mr-1"}
          text={"Prev"}
        />
        {pages.map((page) => (
          <p
            className={`p-2 bg-gray-200 rounded-lg mx-1 ${
              page === currentpage ? "bg-black text-white" : ""
            }`}
          >
            {page}
          </p>
        ))}
        <Button
          onClick={() => getAllProducts(currentpage + 1)}
          className={"ml-1"}
          text={"Next"}
        />
      </div>
    </div>
  );
};

export default ItemList;
