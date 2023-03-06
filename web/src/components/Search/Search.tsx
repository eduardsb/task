import { useState } from "react";
import axios from "axios";

import { ItemEntry } from "../../types/Item";
import { API_URL } from "../../config/environment";

import "./search.css";


interface Props {
  onResult: (data: ItemEntry[]) => void;
}

export const Search: React.FC<Props> = (props) => {
  const { onResult } = props;
  const [disabled, setDisabled] = useState(false);
  const [inputValue, setInputValue] = useState("");

  const onSearch = () => {
    if (disabled) {
      return;
    }

    setDisabled(true);
    axios
        .post(API_URL + "/search", { term: inputValue })
        .then((response) => {
          if (response.status === 200) {
            onResult(response.data);
          }
          setDisabled(false);
        }).catch((e) => {
          setDisabled(false);
        })
  };

  return (
    <form className="search" onSubmit={onSearch}>
      <input
        className="input search-input"
        type="text"
        value={inputValue}
        onChange={(event) => setInputValue(event.target.value)}
      />
      <button disabled={disabled} className="button" onClick={onSearch}>
        Search database
      </button>
    </form>
  );
};
