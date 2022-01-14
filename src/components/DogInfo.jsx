import React from 'react';
import { FaTrash } from 'react-icons/fa';

function DogInfo(props) {

  return (
      <div className="dog-info-container">
        <h3>{props.dogName}</h3>
        <div className="dog-img-container">
            <img src={props.dogImg} alt={props.dogName} />
        </div>
        <FaTrash className="trash" onClick={() => props.delete(props.dogName)} />
      </div>
    );
}

export default DogInfo;