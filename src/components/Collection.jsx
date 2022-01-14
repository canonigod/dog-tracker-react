import React, {useState, useEffect} from 'react';
import DogInfo from './DogInfo'

function Collection(props) {
    const [dogToDelete, setDogToDelete] = useState('');
    const [dogs, setDogs] = useState([]);


    useEffect(() => {
        let index = props.dogBreedAdded.findIndex(x => x.name === dogToDelete);
        let newDogCollection = props.dogBreedAdded.splice(index, 1);
        setDogs(newDogCollection);
      }, [dogToDelete]);

  return (
      <div className="collection-wrapper">
        {props.dogBreedAdded.length !== 0 ? <h2>Your Dog Collection {props.dogBreedAdded === []}</h2> : <h2>Add dogs to your collection</h2>}
        <div className="collection-container">
            {props.dogBreedAdded.map((dog, index) => { // using props in child component and looping
                return (
                    <DogInfo dogName={dog.name} dogImg={dog.img} key={index} delete={dogToDelete => setDogToDelete(dogToDelete)} />
                )
            })}
        </div>
      </div>
    );
}

export default Collection;