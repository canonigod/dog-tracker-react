import axios from 'axios';
import React, {useState, useEffect} from 'react';
import { FaSearch } from 'react-icons/fa';
import Collection from './Collection';

function Hero() {
    const [dogBreedName, setDogBreedName] = useState('');
    const [imgsrc, setImgsrc] = useState('https://images.dog.ceo/breeds/basenji/n02110806_1826.jpg');
    const [dogBreed, setDogBreed] = useState([]);
    const [addDogError, setAddDogError] = useState(false);
    const [showMessage, setShowMessage] = useState(false);
    const [validRequest, setValidRequest] = useState(false);

    const found = dogBreed.some(el => el.name === dogBreedName);

    const dogBreeds = [
            "affenpinscher",
            "african",
            "airedale",
            "akita",
            "appenzeller",
            "australian",
            "basenji",
            "beagle",
            "bluetick",
            "borzoi",
            "bouvier",
            "boxer",
            "brabancon",
            "briard",
            "buhund",
            "bulldog",
            "bullterrier",
            "cattledog",
            "chihuahua",
            "chow",
            "clumber",
            "cockapoo",
            "collie",
            "coonhound",
            "corgi",
            "cotondetulear",
            "dachshund",
            "dalmatian",
            "dane",
            "deerhound",
            "dhole",
            "dingo",
            "doberman",
            "elkhound",
            "entlebucher",
            "eskimo",
            "finnish",
            "frise",
            "germanshepherd",
            "greyhound",
            "groenendael",
            "havanese",
            "hound",
            "husky",
            "keeshond",
            "kelpie",
            "komondor",
            "kuvasz",
            "labradoodle",
            "labrador",
            "leonberg",
            "lhasa",
            "malamute",
            "malinois",
            "maltese",
            "mastiff",
            "mexicanhairless",
            "mix",
            "mountain",
            "newfoundland",
            "otterhound",
            "ovcharka",
            "papillon",
            "pekinese",
            "pembroke",
            "pinscher",
            "pitbull",
            "pointer",
            "pomeranian",
            "poodle",
            "pug",
            "puggle",
            "pyrenees",
            "redbone",
            "retriever",
            "ridgeback",
            "rottweiler",
            "saluki",
            "samoyed",
            "schipperke",
            "schnauzer",
            "setter",
            "sheepdog",
            "shiba",
            "shihtzu",
            "spaniel",
            "springer",
            "stbernard",
            "terrier",
            "tervuren",
            "vizsla",
            "waterdog",
            "weimaraner",
            "whippet",
            "wolfhound"
        ];

    const random = Math.floor(Math.random() * dogBreeds.length);


    const handleKeyDown = (event) => {
        if(event === 'Enter'){
            handleSubmit();
        }
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        if(dogBreedName !== '' && !found){
            axios
            .get(`https://dog.ceo/api/breed/${dogBreedName}/images/random`)
            .then(res => {
                console.log(res)
                if(res.data.status === 'success') {
                    setImgsrc(res.data.message)
                    setValidRequest(true);
                }
            })
            .catch(err => {
                setValidRequest(false);
                setShowMessage(true);
                setAddDogError(true);
                console.error(err);
            });
        }
    }

    const addDogBreed = () => {

        if(!found && dogBreedName !== '' && validRequest){
            setDogBreed([
                ...dogBreed,
                {
                    name: dogBreedName,
                    img: imgsrc
                }
            ])
            setDogBreedName('');
            setValidRequest(true);
            setShowMessage(true);
            setAddDogError(false);
        }else{
            setShowMessage(true);
            setAddDogError(true);
            setDogBreedName('');
        }

    }

    const addDogBreedRandom = () => {
        let randomDog = dogBreeds[random];
        setDogBreedName(randomDog);
    }

    useEffect(() => {
        setTimeout(() => {
            setShowMessage(false);
          }, 1500);
      }, [addDogError]);

  return (
      <div>
        <div className="hero-container">
            <div className="hero-txt">
            <h1>Your Pet Tracker</h1>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Atque porro id, quasi eum soluta odio explicabo. Accusamus dolores nesciunt tempora quo nam autem nobis, ad at esse veritatis sint odio.</p>
            <form onSubmit={handleSubmit}>
                <div className="form-header">
                    <input type="text" value={dogBreedName} onChange={e => setDogBreedName(e.target.value)} onKeyDown={handleKeyDown} style={{backgroundImage: `url(${<FaSearch/> })`}}/>
                    <div className="searchIcon">
                        <FaSearch onClick={handleSubmit}/>
                    </div>
                </div>
                <div className="form-btns">
                    <button onClick={addDogBreedRandom}>Add Random Breed</button>
                    <button onClick={addDogBreed}>Add Breed</button>
                </div>
                {addDogError && showMessage ? <p className="dog-error">Check if dog breed is empty, correct or duplicated</p> :
                !addDogError && showMessage ? <p className="dog-success">Dog breed successfully added to your collection</p> :
                ''
                }
            </form>
            </div>
            <div className="hero-img-container" style={{backgroundImage: `url(${imgsrc})`}}>
                {/* <img className="hero-img"  height="500" width="500" src={imgsrc} alt={dogBreedName + ' image'}/> */}
            </div>
        </div>
            < Collection dogBreedAdded={dogBreed} />
      </div>
    );
}

export default Hero;