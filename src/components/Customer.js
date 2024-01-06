import React, { Component } from 'react';

class Customer extends Component
{
    render() {
      return (
        <tr>
            <td style={{ textAlign: "center"}}>1</td>
            <td>Filipe Pires</td>
            <td>filipe@filipe.com.br</td>
            <td>
                <button className='mini ui blue button '>Editar</button>
                <button className='mini ui red button '>Excluir</button>
            </td>
        </tr>
      )
    };
}

export default Customer