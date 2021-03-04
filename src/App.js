import React, { useState, useEffect } from "react";
import Alert from "./Alert";
import Item from "./Item";

// LOCAL STORAGE
const getLocalStorage = () => {
  let data = localStorage.getItem("data");
  if (data) {
    return (data = JSON.parse(localStorage.getItem("data")));
  } else {
    return [];
  }
};

const App = () => {
  const [name, setName] = useState("");
  const [list, setList] = useState(getLocalStorage());
  const [editID, setEditID] = useState(null);
  const [isAlert, setIsAlert] = useState({
    show: false,
    message: "",
    type: "",
  }); //passing object as a initial value.
  const [isEditing, setIsEditing] = useState(false);

  // console.log(isAlert);
  const handleSubmit = (e) => {
    let submit = document.getElementById("submit");

    e.preventDefault();
    // console.log("working");
    if (!name) {
      //if input is empty.
      showAlert(true, "Please enter a value", "danger"); // arguments to showAlert //changing state of alert.
      submit.textContent = "Submit";
    } else if (name && isEditing) {
      setList(
        list.map((item) => {
          if (item.id === editID) {
            return { ...item, name }; // return this item also change the value of name state.
          }
          return item; //items where item.id !== id return them as well.
        })
      );
      setIsEditing(false);
      showAlert(true, "item Edited", "success");
      setName("");
      submit.textContent = "Submit";
    } else {
      //if input has a value and isEditing is set to false.
      showAlert(true, "item added to the list", "success");
      const newItem = { id: new Date().getTime().toString(), name };
      setList([...list, newItem]);
      // console.log(list);

      // console.log(newItem);
      setName(""); // clearing the input once button is clicked.
    }
  };

  // Function to show Alert
  const showAlert = (show = false, message = "", type = "") => {
    //function parameters
    setIsAlert({ show, message, type }); //ES6 when property name is same as the value name.
    // console.log({ show, message, type });
  };

  // Function to edit item
  const editItem = (id) => {
    let submit = document.getElementById("submit");
    const specificItem = list.find((item) => item.id === id);
    // console.log(specificItem);
    setIsEditing(true);
    setEditID(id);

    submit.textContent = "Editing";
    setName(specificItem.name); //getting the name of the item that was clicked, on the input.
  };

  // Function for delete item
  const deleteItem = (id) => {
    setList(list.filter((item) => item.id !== id));
    showAlert(true, "item removed from cart", "danger");
    setName("");
  };

  // Function to clear the cart
  const clearCart = () => {
    setList([]);
    showAlert(true, "Cart is empty", "danger");
  };

  useEffect(() => {
    localStorage.setItem("data", JSON.stringify(list));
  }, [list]);

  return (
    <>
      <section>
        <div className="title">
          <h2>mini cart</h2>
          <div className="underline"></div>
        </div>
        {isAlert.show && (
          <Alert {...isAlert} removeAlert={showAlert} list={list} />
        )}
        {/* ...spreading properties */}
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <button className="btn" type="submit" id="submit">
            Submit
          </button>
        </form>
        {list.length > 0 && (
          <div style={{ width: "100%", textAlign: "center" }}>
            <Item items={list} deleteitem={deleteItem} edititem={editItem} />
            <button className="clear-cart" onClick={clearCart}>
              Clear cart
            </button>
          </div>
        )}
      </section>
    </>
  );
};

export default App;
