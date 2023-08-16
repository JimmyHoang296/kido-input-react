
import React from "react";
import Expense from "./Expense";

function Expenses({ expenseList, shift, expenses, setExpenses }) {
  
  const addExpense = () => {
    if (expenses.length > 0 && expenses[expenses.length - 1].group === "") {
      return;
    }
    let newID =
      expenses.length < 9
        ? "e0" + (expenses.length + 1)
        : "e" + expenses.length;
    newID = shift + newID;

    let newEx = {
      id: newID,
      type: "Trong ca",
      group: "",
      name: "",
      unit: "",
      price: "",
      qty: "",
      total: "",
      note: ""
    };
    setExpenses((prev) => [...prev, newEx]);
  };

  const numberWithCommas = (x) => {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  const handleChange = (expense) => {
    let updatedExpenses = expenses.map((ex) => {
      if (ex.id === expense.id) {
        return expense;
      }
      return ex;
    });
    setExpenses(updatedExpenses);
  };

  return (
    <div className="input-group expense-list">
      <div className="infor">
        <h2>Chi phí</h2>
        <h3>
          Tiền trong ca{" "}
          {numberWithCommas(
            expenses.reduce(
              (a, v) => (v.type === "Trong ca" ? a + v.total.toString().replace(/\D/g, '') * 1 : a),
              0
            )
          )}
          đ
        </h3>
        <h3>
          Tiền ngoài ca {" "}
          {numberWithCommas(
            expenses.reduce(
              (a, v) => (v.type === "Ngoài ca" ? a + v.total.toString().replace(/\D/g, '') * 1 : a),
              0
            )
          )}
          đ
        </h3>
      </div>
      {expenses.length > 0
        ? expenses.map((ex, index) => (
          <Expense
            key={index}
            expenseList={expenseList}
            expenseValue={ex}
            handleChange={handleChange}
          />
        ))
        : ""}
      <button onClick={addExpense}>Thêm chi phí</button>
    </div>
  );
}

export default Expenses;