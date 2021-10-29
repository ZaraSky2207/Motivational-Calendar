import React, { useEffect, useState } from 'react';

function Users() {
    // React hook
    // Store, update, and use data within this functional component
    // [storage, setMusic] how your state will be initialize when your component renders
    const [users, setUsers] = useState([])

    // write a function that will make a fetch request to our server
    async function fetchUsers() {
        // try catch block
        // try something, if it doesn't work, it will go straight to the catch block
        try {
            const response = await fetch('http://localhost:3000/allUsers')
            const responseJSON = await response.json()
            // update users storage []
            setUsers(responseJSON)
        } catch {
            console.log('Fetching users failed!')
        }
    }

    // invoke useEffect
    // useEffect is a callback after your component renders, function
    useEffect( () => {
        // call fetchMusic to fill music[]
        fetchUsers()
    }, [])// Second parameter of useEffect must match useState() parameter


    return(
        <div>
            <h1>Users:</h1>
            <table>
                <tr>
                    <td>Name</td>
                    <td>username</td>
                    <td>password</td>
                </tr>
                {users.map((user) => {
                return <tr>
                        <td>{user.name}</td>
                        <td>{user.username}</td>
                        <td>{user.password}</td>
                       </tr>
            })} 
            </table>
        </div>
    )
}

export default Users