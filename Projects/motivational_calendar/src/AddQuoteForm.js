import { contentType } from 'mime-types';
import React, { useEffect, useState } from 'react';
import { post } from 'request';
import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Form, FormCheck, FloatingLabel, validated} from 'react-bootstrap';


const CreateQuote = () =>{

  //creating a react hook to store the quote body
  const [quote,setNewQuote] = useState('')
  const [author, setQuoteAuthor] = useState('')

  const handleSubmit = async (e) => { //creating a function to be executed when the submit button is pressed

    e.preventDefault() //going to stop the page from refresehing after submitting

      const newQuote = {quote,author}  //created a variable to store the new objest values set by the user

        try {
          const response = await fetch(`http://localhost:3000/motivation/add` ,{ //adding the route to be executed by the server
          method: 'POST',  //the type of request
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify(newQuote) //turning the new object into a string to pass through the server 
          }).then((res)=>{
            console.log(res) //logging success if the request went through with updating the database
            alert(`Your quote has been added.\n 
            Quote:"${JSON.stringify(quote)}"
            Author: ${JSON.stringify(author)}`)// will alert the user when the quote was added and display a copy of the quote & author
          })
        }catch(err){
          console.error(err) //logging error if the request was unsuccessful
          alert('Unable to add your quote')
        }
  }

  return(
    <div className= "CreateQuote" className="sticky-top">
          {/* initializing the form */}
          <Form onSubmit={handleSubmit}>
          
        <Form.Group className="mb-3">
            <br/>
            
            {/* Adding field to input quote context */}
            <Form.Label>Enter your quote:</Form.Label>
           
            <FloatingLabel controlId="floatingInput" label="Quote" className="mb-3">
                
                <Form.Control type="textarea" placeholder="quote" rows={3}
                required
                value = {quote}
                onChange = {(e)=> setNewQuote (e.target.value)} 
                />
               

            </FloatingLabel>

            {/* adding field to add quote author */}

            <FloatingLabel controlId="floatingTextarea2" label="Author">
                <Form.Control
                as="textarea"
                placeholder="Type the quote author in here"
                style={{ height: '60px' }}
                required
                velue ={author}
                onChange ={ (e) => setQuoteAuthor(e.target.value)}
                 />
            </FloatingLabel>

            <br/>
            <Button type="submit"> Submit </Button>
            
        </Form.Group>
        </Form>
    </div>
  )
}

export default CreateQuote
