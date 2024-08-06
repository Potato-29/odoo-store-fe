import React, { useState } from "react";
import TextInput from "../TextInput/TextInput";
import Button from "../Button/Button";
import { toastOptions } from "../../util/toastOptions";
import { toast } from "react-toastify";
import { getALL, getSearchItems } from "../../service/productService";
import { useDispatch } from "react-redux";
import { saveProductsToStore } from "../../store/productSlice";

const Navbar = () => {
  const [search, setSearch] = useState("");
  const dispatch = useDispatch();
  const page = 1;
  const limit = 8;
  const searchItems = async () => {
    try {
      // const response = await getSearchItems(search);
      const response = await getALL(page, limit, search);
      dispatch(saveProductsToStore(response));
    } catch (error) {
      toast.error("Failed to search", toastOptions);
    }
  };
  return (
    <div className="w-full flex justify-center items-center shadow-lg p-4">
      <TextInput
        type="text"
        placeholder={"Search an item"}
        className={"w-80 border mx-2"}
        onChange={(e) => setSearch(e.target.value)}
      />
      <Button onClick={searchItems} className={"p-2"} text="Search" />
    </div>
  );
};

export default Navbar;
