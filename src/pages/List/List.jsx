import React, { useEffect, useState } from "react";
import "./List.css";
import axios from "axios";
import { toast } from "react-toastify";

const List = ({ url }) => {
  const [list, setList] = useState([]);

  const fetchList = async () => {
    const response = await axios.get(`${url}/api/mobile/list`);

    if (response.data.success) {
      setList(response.data.data);
    } else {
      toast.error("Failed to fetch list");
    }
  };

  const removeMobile = async (mobileId) => {
    const response = await axios.post(`${url}/api/mobile/remove`, {
      id: mobileId,
    });

    if (response.data.success) {
      toast.success("Mobile removed successfully");
      await fetchList(); // Refresh the list after deletion
    } else {
      toast.error("Failed to remove mobile");
    }
  };

  useEffect(() => {
    fetchList();
  }, []);

  return (
    <div className="list add flex-col">
      <p>All Mobiles List</p>
      <div className="list-table">
        <div className="list-table-format title">
          <b>Image</b>
          <b>Name</b>
          <b>Category</b>
          <b>Price</b>
          <b>Action</b>
        </div>
        {list.map((item, index) => {
          return (
            <div className="list-table-format" key={index}>
              <img src={`${url}/images/` + item.image} alt="" />
              <p>{item.name}</p>
              <p>{item.category}</p>
              <p>₹{item.price}</p>
              <p onClick={() => removeMobile(item._id)} className="cursor">
                X
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default List;
