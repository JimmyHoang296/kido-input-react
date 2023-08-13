import React, { useEffect, useState } from "react";

const ComboBox = ({ name, items, selectedItem, onSelectItem }) => {
  const [search, setSearch] = useState(selectedItem)
  const [filteredOptions, setFilteredOptions] = useState(items);
  const [isListVisible, setListVisible] = useState(false);
  useEffect(()=> {setSearch(selectedItem)},[selectedItem])
  useEffect(()=>{setFilteredOptions(items)},[items])
  // Function to handle user input and update the filtered options
  const handleInputChange = (event) => {
    const input = event.target.value;
    setSearch(input)
    // onSelectItem(input);
    // Filter the options based on user input (case-insensitive)
    const filtered = items.filter((item) =>
      item.toLowerCase().includes(input.toLowerCase())
    );
    setFilteredOptions(filtered);
    setListVisible(true); // Show the list on input change
  };

  // Function to handle option selection
  const handleOptionSelect = (option) => {
    onSelectItem(option);
    setFilteredOptions(items);
    setListVisible(false); // Hide the list after selection
  };

  // Function to handle onFocus event of the input
  const handleInputFocus = () => {
    setListVisible(true); // Show the list on input focus if there is a value
  };

  // Function to handle onBlur event of the input
  const handleInputBlur = () => {
    setTimeout(() => setListVisible(false), 200);
  };


  return (
    <div className="combobox">
      <input
        autoComplete="off"
        name={name}
        type="text"
        value={search}
        onChange={handleInputChange}
        onFocus={handleInputFocus} // Show list on input focus
        onBlur={handleInputBlur} // Hide list on input blur
        onClick={() => setListVisible(true)} // Show list on input click
        placeholder="Gõ hoặc chọn chi phí"
      />
      {isListVisible && filteredOptions.length > 0 && (
        <ul className="options-list">
          {filteredOptions.map((option) => (
            <li key={option} onClick={() =>
              handleOptionSelect(option)
            }>
              {option}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ComboBox;
