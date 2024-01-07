import React, { Component } from "react";
import Swal from 'sweetalert2'

class MyForm extends Component
{
    state = {
        form: {first_name: '', last_name: '', email: '', isEdit: false},
        btnName:"Salvar",
        btnClass: "ui primary button submit-button",
    };

    isEmpty(obj){
        return Object.entries(obj).length === 0 && obj.constructor === Object;
    }

    componentDidUpdate(prevProps){
        if(prevProps !== this.props && !this.isEmpty(this.props.customer)){
            this.setState({
                form: {...this.props.customer, isEdit: true},
                btnName: "Editar",
                btnClass: "ui orange button submit-button"
            });
        }
    };

    handleChange = event => {
        const {name, value} = event.target;
        let form = this.state.form;
        form[name] = value;
        this.setState({form})
    };

    onFormSubmit = event => {
        event.preventDefault();
        if(this.formValidation()){
            this.props.onFormSubmit(this.state.form);
        }
        this.clearFormFields();
    };

    formValidation = () => {
        if(document.getElementsByName("first_name")[0].value === ''){
            return this.getSwal("Nome");
        }
        
        if(document.getElementsByName("last_name")[0].value === ''){
            return this.getSwal("Sobrenome");
        }
       
        if(document.getElementsByName("email")[0].value === ''){
            return this.getSwal("Email");
        }

        return true
    };

    getSwal = (field) => {
        Swal.fire({
            title: "Oops..!",
            html: `Parece que o campo <strong>${field}</strong> está vazio. Verifique e tente salvar novamente`,
            icon: "warning"
        });
    };

    clearFormFields = () => {
        this.setState({
            form: {first_name: "", last_name: "", email: "", isEdit: false}
        });
        
        this.setState({
            btnName: "Salvar", 
            btnClass: "ui primary button submit-button"
        })

        document.querySelector(".form").reset();
    };

    render(){
        return(
            <form className="ui form">
                <div className="fields">
                    <div className="four wide field">
                        <label>Primeiro Nome</label>
                        <input type="text" name="first_name" id="first_name" placeholder="Digite seu nome" onChange={this.handleChange} value={this.state.form.first_name}/>
                    </div>
                    
                    <div className="four wide field">
                        <label>Sobrenome</label>
                        <input type="text" name="last_name" placeholder="Digite seu sobrenome" onChange={this.handleChange} value={this.state.form.last_name}/>
                    </div>
                    
                    <div className="four wide field">
                        <label>E-mail</label>
                        <input type="email" name="email" placeholder="teste@teste.com" onChange={this.handleChange} value={this.state.form.email}/>
                    </div>
                    
                    <div className="four wide field">
                        <button className={this.state.btnClass} onClick={this.onFormSubmit}>{this.state.btnName}</button>
                    </div>
                </div>
            </form>
        );
    }
}

export default MyForm;