import React, { Component } from "react";
import axios from "axios";
import MyForm from "./MyForm";
import CustomerList from "./CustomerList";
import Loader from "./Loader";
import "./app.css";

class App extends Component
{
    state = {
        customers: [],
        loader: false,
        url: process.env.REACT_APP_API_URL,
    };

    getCustomers = async () => {
        try {
            this.setState({loader: true});
            const customers = await axios.get(this.state.url);
            this.setState({customers: customers.data, loader: false});
        } catch (error) {
            console.error("Erro ao obter usuários", error);
        }
    };

    componentDidMount(){
        this.getCustomers();
    }

    render(){
        return(
            <div>
                <div className="ui fixed inverted menu">
                    <div className="ui container">
                        <a href="/#" className="header item">React JS CRUD com Laravel API</a>
                    </div>
                </div>

                <div className="ui main container">
                    <MyForm />
                    {
                        this.state.loader ? <Loader /> : ""
                    }
                    <CustomerList customers={this.state.customers}/>
                </div>
                
            </div>
        );
    }
}

export default App;