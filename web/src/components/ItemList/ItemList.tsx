import React, { useState, useEffect } from "react";
import axios from "axios";

import "./itemsList.css";
import { Item } from "../Item/Item";
import { Search } from "../Search/Search";
import { ItemEntry } from "../../types/Item";
import { API_URL } from "../../config/environment";


const ItemList: React.FC = () => {
  const [items, setItems] = useState<ItemEntry[]>([]);
  const [disabled, setDisabled] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [loading, setLoading] = useState(true);
  const [emptySeaarch, setEmptySeaarch] = useState(false);

  useEffect(() => {
    getItemList();
  }, []);

  useEffect(() => {
    setDisabled(false);
  }, [inputValue]);

  const getItemList = () => {
    console.log();
    axios.get<ItemEntry[]>(API_URL + "/items").then((response) => {
      if (response.data.length) {
        setItems(response.data);
      }
      setLoading(false);
    });
  };

  const createItem = () => {
    if (disabled) {
      return;
    }
    setDisabled(true);
    axios
      .post<ItemEntry>(API_URL + "/items", { name: inputValue })
      .then((response) => {
        setInputValue("");
        setDisabled(false);
        if (emptySeaarch) {
          getItemList();
          setEmptySeaarch(false);
        } else {
          setItems([...items, response.data]);
        }
      });
  };

  const onDelete = (id: number) => {
    const updated = items.filter((item) => item.id !== id);
    setItems(updated);
  };

  const onSearchResult = (data: ItemEntry[]) => {
    if (data.length) {
      setItems(data);
      setEmptySeaarch(false);
    } else {
      setItems([]);
      setEmptySeaarch(true);
    }
  };

  return (
    <div className="container">
      <div className="heading">
        <h1>Items</h1>
        <Search onResult={onSearchResult} />
      </div>
      {items.length && !emptySeaarch ? (
        <div className="list">
          {items.map((item) => (
            <Item key={item.id} onDelete={onDelete} item={item} />
          ))}
        </div>
      ) : (
        <div>
          {loading
            ? "Loading items..."
            : emptySeaarch
            ? "Nothing found"
            : "No items found, add new item first"}
        </div>
      )}
      <div className="actions">
        <form onSubmit={createItem}>
          <input
            className="input"
            type="text"
            value={inputValue}
            onChange={(event) => setInputValue(event.target.value)}
          />
          <button disabled={disabled} className="button" onClick={createItem}>
            Add Item
          </button>
        </form>
      </div>
    </div>
  );
};

export default ItemList;
