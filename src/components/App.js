import React, { Component } from "react";
import axios from "axios";
import MyForm from "./MyForm";
import CustomerList from "./CustomerList";
import Loader from "./Loader";
import "./app.css";
import Swal from 'sweetalert2'

class App extends Component
{
    state = {
        customers: [],
        customer: {},
        loader: false,
        disable: false,
        url: process.env.REACT_APP_API_URL,
    };

    getCustomers = async () => {
        try {
            this.setState({loader: true});
            const customers = await axios.get(this.state.url);
            this.setState({customers: customers.data, loader: false});
        } catch (error) {
            Swal.fire({
                title: "Oops..!",
                html: `Parece que algo está errado <br> <b>${error}</b> ` ,
                icon: "error"
            });
            this.setState({loader: false, disable: true, title: "Impossível salvar pois não existe conexão com o banco de dados."});
        }
    };

    deleteCustomer = async id => {
        this.setState({loader: true});
        await axios.delete(`${this.state.url}/${id}`);

        this.getCustomers();
    };

    createCustomer = async (data) => {
        this.setState({loader: true});

        await axios.post(this.state.url, {
            first_name: data.first_name,
            last_name: data.last_name,
            email: data.email,
        });
        this.getCustomers();
    };

    editCustomer = async data => {
        this.setState({customer: {}, loader: true});
        await axios.put(`${this.state.url}/${data.id}`, {
            first_name: data.first_name,
            last_name: data.last_name,
            email: data.email,
        });

        this.getCustomers();
    }

    componentDidMount(){
        this.getCustomers();
    }

    onDelete = id => {
        this.deleteCustomer(id);
    };

    onEdit = data => {
        this.setState({ customer: data});
    };

    onFormSubmit = data => {
        if(data.isEdit){
            this.editCustomer(data);
        }else{
            this.createCustomer(data);
        }
    };

    render(){
        return(
            <div>
                <div className="ui fixed inverted menu">
                    <div className="ui container">
                        <a href="/#" className="header item"> <i class="fab fa-react" style={{ marginRight: "3px" }}></i>ReactJS com Laravel API <i class="fab fa-laravel" style={{ marginLeft: "3px", marginRight: "3px" }}></i> | CRUD </a>
                    </div>
                </div>

                <div className="ui main container">
                    <MyForm customer={this.state.customer} onFormSubmit={this.onFormSubmit} disableButton={this.state.disable} title={this.state.title}/>
                    {
                        this.state.loader ? <Loader /> : ""
                    }
                    <CustomerList customers={this.state.customers} onDelete={this.onDelete} onEdit={this.onEdit}/>
                </div>
                
            </div>
        );
    }
}

export default App;