import React, { useEffect, useState } from "react";
import ComboBox from "./Combobox";

const formatInput = (value) => {
  const formattedValue = value.toString().replace(/[^\d.]/g, '');
  const parts = formattedValue.split('.');

  if (parts.length > 2) {
    parts[0] = parts[0] + parts[1];
    parts.splice(1, 1);
  }

  if (parts.length > 1) {
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    parts[1] = parts[1].slice(0, 2);
  } else {
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  }

  return parts.join('.');
};

function addStyle(expense){
  expense.price = isNaN(expense.price) ? expense.price : formatInput(expense.price)
  expense.qty = isNaN(expense.qty) ? expense.qty : formatInput(expense.qty)
  expense.total = isNaN(expense.total) ? expense.total : formatInput(expense.total)
  return expense
}

function getUniqueGroup(expenseList){
  let groups = expenseList.map((item) => item.group);
  groups = groups.filter((item, index) => groups.indexOf(item) === index);
  return groups
}

function Expense({ expenseList, expenseValue, handleChange }) {
  const [expense, setExpense] = useState(addStyle(expenseValue));
  const [group, setGroup] = useState(
    getUniqueGroup(expenseList.filter(item => item.type === "Trong ca"))
  )
  const [items, setItems] = useState(
    expenseList
      .filter((item) => item.group === expenseValue.group)
      .map((item) => item.name)
  );

  
  useEffect(() => {
    setExpense(addStyle(expenseValue))
  }, [expenseValue])

  
  function handleSelectGroup(group) {
    let updatedExpense = { ...expense, group: group, name: "", unit: "" };
    setItems(
      expenseList
        .filter((item) => item.group === group)
        .map((item) => item.name)
    );
    setExpense(updatedExpense);
    handleChange(updatedExpense);
  }

  function handleSelectType(type) {
    let updatedExpense = { ...expense, type, group: "", name: "", unit: "" }
    setGroup(getUniqueGroup(expenseList.filter(item => item.type === type)))
    setExpense(updatedExpense)
    handleChange(updatedExpense)
  }

  function handleSelectItem(exName) {
    let exUnit = expenseList.find((ex) => ex.name === exName)?.unit;
    let updatedExpense = { ...expense, name: exName, unit: exUnit };
    setExpense(updatedExpense);
    handleChange(updatedExpense);
  }

  const handleChangeInput = (event) => {
    let inputName = event.target.name;
    let value = event.target.value;
    let newTotal
    var newValue = formatInput(value)
    if (inputName === "note") {
      let updatedExpense = { ...expense, [inputName]: value }
      setExpense(updatedExpense);
      handleChange(updatedExpense);
      return
    }
    if (inputName === "price") {
      newTotal = calculateMultiplication(value, expense.qty);
    }
    if (inputName === "qty") {
      newTotal = calculateMultiplication(expense.price, value)
    }
    
    let updatedExpense = { ...expense, [inputName]: newValue, total: newTotal };
    
    setExpense(updatedExpense);
    handleChange(updatedExpense);
  };
  
  const calculateMultiplication = (price, total) => {
    const parsedInput1 = parseFloat(price.replace(/[^\d.]/g, ''));
    const parsedInput2 = parseFloat(total.replace(/[^\d.]/g, ''));

    if (!isNaN(parsedInput1) && !isNaN(parsedInput2)) {
      const multiplicationResult = (parsedInput1 * parsedInput2).toLocaleString('en-US', {
        maximumFractionDigits: 0,
      });
      return (multiplicationResult);
    } else {
      return ('');
    }
  };
  

  const numberWithCommas = (x) => {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };
  return (
    <div className="expense" key={expense.id} id={expense.id}>
      <div>
        <ComboBox
          name="Loại phí"
          items={["Trong ca", "Ngoài ca"]}
          selectedItem={expense.type}
          onSelectItem={handleSelectType}

        />
        <ComboBox
          name="Nhóm chi phí"
          items={group}
          selectedItem={expense.group}
          onSelectItem={handleSelectGroup}
        />
        <ComboBox
          name="Chi phí"
          items={items}
          selectedItem={expense.name}
          onSelectItem={handleSelectItem}
        />
        <input
          type="text"
          name="unit"
          value={expense.unit}
          placeholder="Đơn vị tính"
          disabled
        />

      </div>
      <div>

        <input
          autoComplete="off"
          type="text"
          name="price"
          value={expense.price}
          placeholder="đơn giá"
          onChange={handleChangeInput}
        />
        <input
          autoComplete="off"
          type="text"
          name="qty"
          value={expense.qty}
          placeholder="số lượng"
          onChange={handleChangeInput}
        />
        <input
          type="text"
          name="total"
          value={numberWithCommas(expense.total)}
          placeholder="tổng"
          disabled
          />
        <input
          autoComplete="off"
          type="text"
          name="note"
          value={expense.note}
          placeholder="ghi chú"
          onChange={handleChangeInput}
        />
      </div>
    </div>
  );
}

export default Expense;
