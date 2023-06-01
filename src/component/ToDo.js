import React, { useEffect, useState } from 'react';
import './style.css';
import { computeHeadingLevel } from '@testing-library/react';




const getLocalData = () => {
  const list = localStorage.getItem("myToDoList");
  if (list) {
    return JSON.parse(list);
  }
  else {
    return "";
  }
}


const ToDo = () => {


  const [inputData, setInputData] = useState("");
  const [items, setItems] = useState(getLocalData());
  const [isEditItem, setIsEditItem] = useState("");
  const [toggleBtn, setToggleBtn] = useState(false);


  // funtion for add items 

  const addItem = () => {
  
    if (inputData === "") {
      alert("plesse fill the deta");
    }
    else if (inputData && toggleBtn) {
      setItems(
        items.map((currentElement) => {
          if (currentElement.id === isEditItem) {
            
            return{...currentElement ,name:inputData};
          }
          return currentElement;
        })
      )
      setToggleBtn(false);
      setInputData("");
    }
    else {
      const myNweInutData = {
        id: new Date().getTime().toString(),
        name: inputData,
      }
      setItems([...items, myNweInutData]);
      setInputData("");
    };
  };

  // delet todo   item
  const deletItem = (index) => {
    const updetedItems = items.filter((currentElement) => {
      return currentElement.id !== index;
      
  });
  setItems(updetedItems);
};

// edit item 

const editItem = (index) => {
  const itemsToDoEdit = items.find((currentElement) => {
    return currentElement.id === index;
  })
  setInputData(itemsToDoEdit.name);
  setIsEditItem(index);
  setToggleBtn(true);
}


// removeAll todo 

const removeAll = () => {
  setItems([]);
}

// adding localStorage

useEffect(() => {
  localStorage.setItem("myToDoList", JSON.stringify(items));
}, [items])



return (
  <>
    <div className="main-div">
      <div className="chaild-div">
        <figure>
          <img src="./image/logo.png" alt="" className='img' />
          <figcaption>Add your list hare✌️</figcaption>
        </figure>
        <div className="add-items">
          <div className="input">
            <input type="text" placeholder='✍️ Add Items' className='form-contral' value={inputData} onChange={(event) => { setInputData(event.target.value) }} />
            {toggleBtn ? <i className="fa-solid fa-pen-to-square" onClick={addItem}></i> : <i className="fa-solid fa-plus" onClick={addItem}></i>}

          </div>
          {/* Todo item show  */}
          <div className="show-items">
            {items.map((currentElement) => {
              return (
                <div className="each-items" key={currentElement.id}>
                  <h2>{currentElement.name}</h2>
                  <div className="todo-btn">
                    <i className="fa-solid fa-pen-to-square" onClick={() => { editItem(currentElement.id) }}></i>
                    <i className="fa-solid fa-trash" onClick={() => { deletItem(currentElement.id) }}></i>
                  </div>
                </div>
              )
            })}

          </div>
          {/* remove btn  */}
          <div className='delet-btn'>
            <button className="btn efect04" data-sm-link-text="Remove All" onClick={removeAll}>
              <span>Remove All</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  </>
)
}

export default ToDo;
