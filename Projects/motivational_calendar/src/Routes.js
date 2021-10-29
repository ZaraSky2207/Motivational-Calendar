import React from 'react'

// import components
import Quotes from './Quotes'
import Users from './Users'
import myCalendar from './Calendar'
import CreateQuote from './AddQuoteForm'
import LoginForm from './LoginForm'

// import react-dom-router dependencies
import {
    BrowserRouter as Router,
    Route,
    Link,
    Switch
} from 'react-router-dom'


function Routes() {
    return (
        <Router>
            {/** Defining the Link (clickable) */}
            <Link to="/quotes">Quotes</Link>
            <Link to="/users">Users</Link>
            <Link to="/">Calendar</Link>
            <Link to="/addquote">Add quote</Link>
            <Link to="/login">Log in</Link>
            {/** Defining the switches, render the matching components */}
            <Switch>
                <Route exact path="/quotes" component={Quotes}/>
                <Route exact path="/users" component={Users}/>
                <Route exact path="/" component={myCalendar}/>
                <Route exact path="/addquote" component = {CreateQuote}/>
                <Route exact path="/login" component = {LoginForm}/>
            </Switch>
        </Router>
    )
}

export default Routes