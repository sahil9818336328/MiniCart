import React from "react";
import { MdEdit } from "react-icons/md";
import { AiFillDelete } from "react-icons/ai";

const Item = ({ items, deleteitem, edititem }) => {
  return (
    <main>
      {items.map((item) => {
        // console.log(item);
        const { id, name } = item;
        return (
          <article key={id} className="list">
            <p>{name}</p>
            <div className="btn-container">
              <button className="editBtn" onClick={() => edititem(id)}>
                <MdEdit />
              </button>
              <button className="deleteBtn" onClick={() => deleteitem(id)}>
                <AiFillDelete />
              </button>
            </div>
          </article>
        );
      })}
    </main>
  );
};

export default Item;
