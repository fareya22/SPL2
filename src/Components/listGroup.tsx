//import { MouseEvent } from "react";

import { useState } from "react";

interface Props { 
  items : string[];
  heading : string;
  onSelectItem: ( item :string ) => void;
}
function ListGroup({items, heading, onSelectItem }: Props) {

  const [selectedIndex , setSelectedIndex]= useState(-1);
   
  return (
    <>
      <h1>{heading}</h1>
      {items.length === 0 && <p>No Item found</p>}
      <ul className="List-Group">
        {items.map((item, index) => (
          <li
            className={
              selectedIndex === index ? "List-Group-Itemname active " : "List-Group-Itemname"
            }
           key={item}
            onClick={() => {
              setSelectedIndex(index);
              onSelectItem(item) }}
          >
            {item}
          </li>
        ))}
      </ul>
    </>
  );
}

export default ListGroup;
