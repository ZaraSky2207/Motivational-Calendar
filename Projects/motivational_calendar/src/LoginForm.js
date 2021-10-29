import React, { useState } from 'react';
import './style.css'

function LoginForm({ Login, error }) {
    const [details, setDetails] = useState({name: "", username: "", password: ""});

   const submitHandler = async (e) => {
        e.preventDefault();
        const data = details
        //console.log('THIS IS THE DATA', data)
        try {
            const response = await fetch('http://localhost:3000/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                referrerPolicy: 'no-referrer',
                body: JSON.stringify(data)
            }).then((res)=>{
                console.log(res)
                if(res.status === 200) {
                    alert(`Successfully logged in as ${data.name}`)
                } else if(res.status === 404) {
                    alert('Invalid username or password!')
                }
            })
        } catch(err) {
            console.error(err)
            alert('Server error')
        }
    }


    return (
        <div class="center-login">
            <form class="sticky-top" onSubmit={submitHandler}>
                <div className="form-inner">
                    <h2>Login</h2>
                    {(error !== "") ? ( <div className="error">{error}</div> ) : ""}
                    <div className="form-group">
                        <label>Name:</label>
                        <input type="text" name="name" id="name" onChange={e => setDetails({...details, name: e.target.value})} value={details.name} />
                    </div>
                    <div className="form-group">
                        <label>Username: </label>
                        <input type="text" name="username" id="username" onChange={e => setDetails({...details, username: e.target.value})} value={details.username} />
                        </div>
                        <div className="form-group">
                            <label htmlFor="password">Password: </label>
                            <input type="password" name="password" id="password" onChange={e => setDetails({...details, password: e.target.value})} value={details.password} />
                            </div>
                            <p className="form__text">
                                <a href="#" className="form__link">Forgot your Password?</a>
                            </p>
                            <p className="form__text">
                                <a className="form__link" id="linkCreateAccount" >Don't have an account? Create account</a>
                            </p>
                            <input type="submit"/>
                    </div>
            </form>
        </div>
    )
}
export default LoginForm