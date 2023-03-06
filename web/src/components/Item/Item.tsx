import { useState } from "react";

import "./item.css";
import axios from "axios";
import { API_URL } from "../../config/environment";

interface Props {
  item: {
    id: number;
    name: string;
  };
  onDelete: (id: number) => void;
}

export const Item: React.FC<Props> = (props) => {
  const { id, name } = props.item;
  const { onDelete } = props;
  const [disabled, setDisabled] = useState(false);

  const onDeleteClick = () => {
    if (disabled) {
      return;
    }
    setDisabled(true);
    axios.delete(API_URL + "/items/" + id).then((response) => {
      if(response) {
        onDelete(id);
      }
      setDisabled(false);
    });
  };

  return (
    <div className="item">
      <div className="name">
        #{id} - {name}
      </div>
      <div>
        <div className="delete" onClick={onDeleteClick}>
          X
        </div>
      </div>
    </div>
  );
};
