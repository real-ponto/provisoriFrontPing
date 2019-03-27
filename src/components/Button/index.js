import React, { Component } from 'react'
import './index.css'

class Button extends Component{
    render(){
        return(
            <button className="button" onChange={this.props.changed} onClick={this.props.click}>{this.props.name}</button>
        )
    }
}

export default Button