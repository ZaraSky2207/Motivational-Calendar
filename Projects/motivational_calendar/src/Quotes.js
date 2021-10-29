import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Table  } from 'react-bootstrap';


function Quotes() {
    // React hook
    // Store, update, and use data within this functional component
    // [storage, setMusic] how your state will be initialize when your component renders
    const [quotes, setQuotes] = useState([])

    // write a function that will make a fetch request to our server
    async function fetchQuotes() {
        // try catch block
        // try something, if it doesn't work, it will go straight to the catch block
        try {
            const response = await fetch('http://localhost:3000/allMotivations')
            const responseJSON = await response.json()
            // update Quotes storage []
            setQuotes(responseJSON)
        } catch {
            console.log('Fetching Quotes failed!')
        }
    }

    // invoke useEffect
    // useEffect is a callback after your component renders, function
    useEffect( () => {
        // call fetchMusic to fill quote[]
        fetchQuotes()
    }, [])// Second parameter of useEffect must match useState() parameter


    return(
        <div class="sticky-top">
            <h1 class="auto" >Quotes:</h1>
            <div class="center-quotes">
                <Table class="table table-hover">
                <thead>
                    <tr  class="table-info">
                        <td>Quote</td>
                        <td>Author</td>
                    </tr>
                </thead>
                <tbody>
                    {quotes.map((quote) => {
                    return <tr class="table-secondary">
                            <td>{quote.quote}</td>
                            <td>{quote.author}</td>
                        </tr>
                })} 
                </tbody>
                </Table>
            </div>
        </div>
    )
}

export default Quotes