import React, { Component } from "react";

class MyForm extends Component
{
    render(){
        return(
            <form className="ui form">
                <div className="fields">
                    <div className="four wide field">
                        <label>Primeiro Nome</label>
                        <input type="text" name="first_name" placeholder="Digite seu nome"/>
                    </div>
                    
                    <div className="four wide field">
                        <label>Sobrenome</label>
                        <input type="text" name="last_name" placeholder="Digite seu sobrenome"/>
                    </div>
                    
                    <div className="four wide field">
                        <label>E-mail</label>
                        <input type="email" name="email" placeholder="teste@teste.com"/>
                    </div>
                    
                    <div className="four wide field">
                        <button className="ui primary button submit-button">Salvar</button>
                    </div>
                </div>
            </form>
        );
    }
}

export default MyForm;