import React from "react";

function Search({ options, selected, fnc }) {
  const [isOpen, setIsOpen] = React.useState(false);
  const toggleDropdown = () => setIsOpen(!isOpen);

  const handleOptionClick = (option) => {
    fnc(option);
    setIsOpen(false);
  };

  return (
    <div className="dropdown">
      <button className="dropdown-toggle" onClick={toggleDropdown}>
        {selected} <span className="arrow">{isOpen ? "▲" : "▼"}</span>
      </button>
      {isOpen && (
        <ul className="dropdown-menu">
          {options.map((option) => (
            <li
              key={option.value}
              onClick={() => handleOptionClick(option.title)}
            >
              {option.title}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default Search;
