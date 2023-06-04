import "../../styles/components/dropdown.css"
import React, { useState, useEffect, useRef } from 'react';

const Dropdown = ({ style, options, placeholder, dropdownId , chosenOptions, }) => {
  const [showOptions, setShowOptions] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClick = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowOptions(false);
      }
    };

    document.addEventListener('click', handleClick);

    return () => {
      document.removeEventListener('click', handleClick);
    };
  }, []);

  const handleDropdownClick = () => {
    setShowOptions((prevState) => !prevState);
  };


  const optionStyle = {
    position: 'absolute',
    backgroundColor: 'whitesmoke',
    boxShadow: 'inherit',
    right:'0',
    left: '0',
    zIndex: '10',
    boxSizing: 'inherit',
    padding: '1em',
    borderBottom: '1px solid #80808086',
    cursor: 'pointer',
  };

  const arrowStyle = {
    transform:`rotate(${showOptions?225:45}deg) `
  }

  let placeholderText = chosenOptions.map(optionIndex=>{
    if(!options[optionIndex])
        return;
    else 
      return options[optionIndex] 
  }).join()

  const MAX_LENGTH = 25
  if(placeholderText.length > MAX_LENGTH){
    placeholderText = placeholderText.slice(0,MAX_LENGTH)
    placeholderText += "..."
  }
  
   

  const optionsElement = options.map((option, index) => (
    <label key={`option${index}`} name={option} style={{ ...optionStyle, top: `calc(${index + 1} * 100%)` }}>
      <input type="checkbox" className="dropdown--checkbox" />
      <span >
        {option}
      </span>
    </label>
  ));

  return (
    <section className="dropdown" style={style} id={`dropdown${dropdownId}`} ref={dropdownRef}>
      <div className="dropdown--arrow-wrapper" style ={arrowStyle}>
        <div className="dropdown--arrow" />
      </div>
      <div className="dropdown--header" onClick={handleDropdownClick}>
        {placeholderText || placeholder ||'Choose'}
      </div>
      {showOptions && <div className="dropdown-options">{optionsElement}</div>}
    </section>
  );
};

export default Dropdown;
