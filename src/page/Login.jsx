import React from 'react'
import { useState } from 'react'
import Loading from './Loading';


async function login(props) {
    const URL = process.env.REACT_APP_URL
    let submitData = {
        type: "login",
        data: props,
    };

    const response = await fetch(URL, {
        method: "POST",
        headers: {
            "Content-Type": "text/plain;charset=utf-8",
        },
        body: JSON.stringify(submitData), // body data type must match "Content-Type" header
    });
    const data = await response.json();
    alert('dang nhap thanh cong')
    return data
}

export default function Login({ setLogin, setUser, setExpenseList }) {
    const [id, setId] = useState('')
    const [password, setPassword] = useState('')
    const [caution, setCaution] = useState('')
    const [showModal, setShowModal] = useState(false)

    async function handleLogin(e) {
        e.preventDefault()
        setShowModal(true)
        const res = await login({ id, password })

        if (res.status === "ok") {
            setExpenseList(res.data)
            setLogin(true)
            setUser (id)
        } else {
            setCaution('sai thông tin')
        }
        setShowModal(false)

    }


    return (
        <div>
            <form className='login-form' onSubmit={handleLogin}>
                <h2 className='login-form--title'>KIDO FOOD</h2>
                <input type="text" placeholder='id' value={id} onChange={e => { setId(e.target.value); setCaution('') }} />
                <input type="password" placeholder='password' value={password} onChange={e => { setPassword(e.target.value); setCaution('') }} />
                <button>Đăng nhập</button>
                <h3 className='caution'>{caution}</h3>
            </form>
            {showModal && <Loading />}
        </div>
    )
}
