import React, { useEffect, useState } from "react";
import ComboBox from "./Combobox";

function addStyle(expenseValue) {
  expenseValue.qty = isNaN(expenseValue.qty) ? expenseValue.qty : Number(expenseValue.qty).toLocaleString('en-US', { minimumIntegerDigits: 1, useGrouping: true })
  expenseValue.price = isNaN(expenseValue.price) ? expenseValue.price : Number(expenseValue.price).toLocaleString('en-US', { minimumIntegerDigits: 1, useGrouping: true })
  expenseValue.total = isNaN(expenseValue.total) ? expenseValue.total : Number(expenseValue.total).toLocaleString('en-US', { minimumIntegerDigits: 1, useGrouping: true })
  return expenseValue
}
function Expense({ expenseList, expenseValue, handleChange }) {
  const [expense, setExpense] = useState(addStyle(expenseValue));
  const [group, setGroup] = useState(
    expenseList.filter(item => item.type === "Trong ca").map(item => item.group).filter((item, index) => groups.indexOf(item) === index)
  )
  const [items, setItems] = useState(
    expenseList
      .filter((item) => item.group === expenseValue.group)
      .map((item) => item.name)
  );

  useEffect(() => {
    setExpense(addStyle(expenseValue))
  }, [expenseValue])

  let groups = expenseList.map((item) => item.group);
  groups = groups.filter((item, index) => groups.indexOf(item) === index);
  
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
    setGroup(groups.filter(item => item.type === type).map(item => item.group))
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
    let newTotal = expense.total;
    var newValue = value.replace(/\D/g, ''); // Remove non-digit characters

    if (inputName === "note") {
      let updatedExpense = { ...expense, [inputName]: value }
      setExpense(updatedExpense);
      handleChange(updatedExpense);
      return
    }
    if (inputName === "price") {
      newTotal = newValue * expense.qty.toString().replace(/\D/g, '') * 1;
    }
    if (inputName === "qty") {
      newTotal = newValue * expense.price.toString().replace(/\D/g, '') * 1;
    }
    var formattedValue = Number(newValue).toLocaleString('en-US', { minimumIntegerDigits: 1, useGrouping: true });
    let updatedExpense = { ...expense, [inputName]: formattedValue, total: newTotal };
    setExpense(updatedExpense);
    handleChange(updatedExpense);
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
