import { useEffect, useState } from "react";
import React from "react";
import SearchDate from "../component/SearchDate";
import Loading from "./Loading";
import CashInput from "../component/CashInput";
import Expenses from "../component/Expenses"

function Input({ expenseList, user }) {
  const [isDisplay, setIsDisplay] = useState(false);
  const [isMainDisplay, setIsMainDisplay] = useState(false);
  const [shift, setShift] = useState("");
  const URL = process.env.REACT_APP_URL

  const cashList = [
    { id: "cashSale", name: "Doanh thu bán hàng" },
    { id: "grab", name: "Doanh thu Grab" },
    { id: "baemin", name: "Doanh thu Baemin" },
    { id: "shopee", name: "Doanh thu Shopee" },
    { id: "cashEnd", name: "Tiền cuối ca" }
  ];

  const [expenses, setExpenses] = useState([])
  const [cashs, setCashs] = useState(
    cashList.map(item => { var mapItem = {}; return mapItem[item.id] = 0 }))
    ;

  useEffect(() => {
  }, [expenses])

  const handleSubmit = (event) => {
    event.preventDefault(); // Prevent the form from submitting

    // Get all form data as an object
    const submitData = {
      type: "update",
      user,
      id: shift,
      expenses,
      cashs
    };

    setIsDisplay(true);
    fetch(URL, {
      method: "POST",
      headers: {
        "Content-Type": "text/plain;charset=utf-8"
      },
      body: JSON.stringify(submitData) // body data type must match "Content-Type" header
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        handleResponse(data);
        alert("Đã cập nhật thành công");
        setIsDisplay(false);
      })
      .catch((error) => {
        console.error("Error:", error);
        alert("Cập nhật không thành công, hãy thử lại");
        setIsDisplay(false);
      });
  };

  function addStyle(cashs) {

    for (const key in cashs) {
      if (cashs.hasOwnProperty(key)) {
        cashs[key] = isNaN(cashs[key]) ? cashs[key] : cashs[key].toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
      }
    }
    return cashs
  }

  const handleResponse = (data) => {
    setCashs(addStyle(data.dayCash))
    // setCashs(data.dayCash)
    setExpenses(data.dayExpense)
  };

  const handleSearch = async (dayShift) => {
    setShift(dayShift);
    setCashs(cashList.reduce((a, v) => ({ ...a, [v.id]: "" }), {}));
    var submitData = {
      type: "search",
      data: { id: dayShift }
    };
    setIsDisplay(true);

    try {
      const response = await fetch(URL, {
        method: "POST",
        headers: {
          "Content-Type": "text/plain;charset=utf-8",
        },
        body: JSON.stringify(submitData), // body data type must match "Content-Type" header
      });
      const data = await response.json();
      handleResponse(data);
      alert("Hoàn thành");
      setIsDisplay(false);
      setIsMainDisplay(true);
    } catch (error) {
      alert("Cập nhật không thành công, hãy thử lại");
      setIsDisplay(false);
    }


  };

  const getToday = () => {
    var today = new Date();
    var year = today.getFullYear();
    var month = today.getMonth() + 1;
    var day = today.getDate();
    var dateString =
      (day < 10 ? "0" : "") +
      day +
      (month < 10 ? "0" : "") +
      month +
      year.toString().slice(2, 4);

    return dateString;
  };

  return (
    <div className="inputSection">
      <h2>{user} nhập liệu BAKIDO2</h2>
      <SearchDate
        onSearch={handleSearch}
      />
      {isMainDisplay && (
        <>
          <h2>
            {shift.slice(6, 8) === "c1" ? "Ca 1" : "Ca 2"} ngày
            {` ${shift.slice(0, 2)}/${shift.slice(2, 4)}/20${shift.slice(
              4,
              6
            )}`}
          </h2>
          <CashInput cashList={cashList} cashs={cashs} setCashs={setCashs} />
          <Expenses
            expenseList={expenseList}
            shift={shift}
            expenses={expenses}
            setExpenses={setExpenses}
          />
          {getToday() === shift.slice(0, 6) && (
            <button onClick={handleSubmit} className="submit-btn"> Submit</button>
          )}
        </>
      )}
      {isDisplay &&<Loading />}
    </div>
  );
}

export default Input;