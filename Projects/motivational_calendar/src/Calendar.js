import { id } from 'postcss-selector-parser';
import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button';
import Calendar from 'react-calendar';

class myCalendar extends React.Component {
  
  constructor(props) {
    super();
    this.state = {
      date:new Date(),
      quote: "",
      author: "",
      id: 0
      //userId: 1
    }
      this.handleClick = this.handleClick.bind(this)
      this.favButton = this.favButton.bind(this)

      this.handleClick(this.state.date)
  }

 //when the user logs in, pass down their id through props to this component
  handleClick = async (d) => {
    const response = await fetch("http://localhost:3000/getMotivation")
    //const responseUser = await fetch(`http://localhost:3000/getUser/${props.userId}`) -- stretch goal
    const responseJSON = await response.json()
    //const responseJSON2 = await responseUser.json() -- stretch goal 
    console.log(responseJSON.quote)
    this.setState({
      date:d,
      quote:responseJSON.quote,
      author:responseJSON.author,
      id: responseJSON.id
      //userId: userId //responseJSON2 - change to this when focusing on stretch goal
    })
    console.log("QUOTE ID",this.state.id)
  }

//This does not work yet
  favButton = async (e) =>{
  
    e.preventDefault()

    //console.log("FAV BUTTON QUOTE ID",this.state.id)
 
    const data = this.state

   //console.log('JSON STRINGIGYYY', typeof JSON.stringify(data)) -- testing the type of data being passed

    const response = await fetch(`http://localhost:3000/motivation/${this.state.id}`, { //using the put request route to assign a user to a quote
      method: 'PUT',
      header: {
        'Content-Type': 'application/json'
      },
      referrerPolicy: 'no-referrer',
      body: JSON.stringify(data)  //changing the data to a string so it can be passed through the request
    }).then((res)=>{
      console.log(res)//logging the status of the request
      alert(`Quote has been added to favorites!`)//logging a success alert
    })
  }

  
  
  render() {
    return (
      <div className="sticky-top">
        <h1>Motivational Calendar</h1>
        <p>Selected date: {this.state.date.toDateString()}</p>
        <p>{this.state.quote}</p>
        <p>- {this.state.author}</p>
        <Button  type="button" class="btn btn-outline-primary" onClick={this.favButton}>
            Favorite Quote
        </Button>
        <Calendar onClickDay={this.handleClick}/>
      </div>
    );
  }
}

export default myCalendar;