import React, { useEffect, useState } from 'react'
import '../Components/Categories/CategoryPage.css';
import WarnLogo from '../Assets/WarnLogo.png';
import Action from '../Assets/Action.png';
import Drama from '../Assets/Drama.png';
import Romance from '../Assets/Romance.png';
import Thriller from '../Assets/Thriller.png';
import Western from '../Assets/Western.png';
import Horror from '../Assets/Horror.png';
import Fantasy from '../Assets/Fantasy.png';
import Music from '../Assets/Music.png';
import Fiction from '../Assets/Fiction.png';
import xBtn from '../Assets/X.png';
import { useNavigate } from 'react-router-dom';

const CategoryPage = () => {
  const CardInfo = [
    { name: 'Action', path: Action },
    { name: 'Drama', path: Drama },
    { name: 'Romance', path: Romance },
    { name: 'Thriller', path: Thriller },
    { name: 'Western', path: Western },
    { name: 'Horror', path: Horror },
    { name: 'Fantasy', path: Fantasy },
    { name: 'Music', path: Music },
    { name: 'Fiction', path: Fiction },
  ]
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [validSelection, setValidSelection] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    setValidSelection(selectedCategories.length >= 3);
  }, [selectedCategories]);

  const toggleCategory = (cardName) => {
    if (selectedCategories.includes(cardName)) {
      setSelectedCategories(selectedCategories.filter(card => card !== cardName));
    } else {
      setSelectedCategories([...selectedCategories, cardName]);
    }
  };

  const handleNextPage = () =>{
    if(validSelection){
      localStorage.setItem('selectedCategories', JSON.stringify(selectedCategories));
      navigate('/home');
    }
  }

  return (
    <div className='category-page'>
      <div className="selected-category">
        <div id="app-logo">Super app</div>
        <h1 id='select-heading'>Choose your entertainment category</h1>
        <div id="selected">
          {selectedCategories.map((cardName, index) => (
            <div key={index} className="selected-btn">
              {cardName} <img id='x-btn' src={xBtn} onClick={() => toggleCategory(cardName)} />
            </div>
          ))}
        </div>
        <div className="warning">
          {!validSelection && (
            <>
              <img id='warn-logo' src={WarnLogo} alt="Warning Logo" />
              <p id='warn-text'>Minimum 3 categories required</p>
            </>
          )}
        </div>
      </div>

      <div className="select-category">
        {CardInfo.map((card, index) => (
          <div
            key={index}
            className={`category ${selectedCategories.includes(card.name) ? 'selected' : ''}`}
            id={card.name}
            onClick={() => toggleCategory(card.name)}
          >
            <p>{card.name}</p>
            <img src={card.path} alt={card.name} />
          </div>
        ))}
      </div>

      <button className="nextpage-btn" onClick={handleNextPage}>Next Page</button>
    </div >
  )
}

export default CategoryPage;