import React from "react";

export default function CashInput({ cashList, cashs, setCashs }) {


  const handleChange = (e) => {
    const value = e.target.value;
    var newValue = value.replace(/\D/g, ''); // Remove non-digit characters
    var formattedValue = Number(newValue).toLocaleString('en-US', { minimumIntegerDigits: 1, useGrouping: true });
    setCashs((prev) => ({ ...prev, [e.target.name]: formattedValue }));
  };

  return (
    <div className="cash">
      <h2>Tiền thu trong ca</h2>
      <div className="input-group cash-list">
        {cashList.map((item) => (
          <div key={item.id} className="cash-input">
            <label> {item.name}</label>
            <input
              autoComplete="off"
              name={item.id}
              value={cashs[item.id]}
              onChange={handleChange}
            />
            <span>đ</span>
          </div>
        ))}
      </div>
    </div>
  );
}