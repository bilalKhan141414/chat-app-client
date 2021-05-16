import React from 'react'
// React is loaded and is available as React and ReactDOM
// imports should NOT be used
const TodoItem = (props) => <li onClick={props.onClick}>{props.item.text}</li>
let self = null
class TestComponent extends React.Component {
    state = {
        // Fill in appropriate state properties
        firstName:"",
        age:"",
        email:""
      }
      handlOnChange (e){
        const {name, value } = e.target
        this.setState({
          [name]:value
        })
      }
      render() {
        return <div>
          {/* render contact form input fields here */}
          <input type="text" name="firstName" onChange={this.handlOnChange.bind(this)} />
          <input type="text" name="age" onChange={this.handlOnChange.bind(this)} />
          {
            +this.state.age >= 14 && 
            <input type="text" name="email" onChange={this.handlOnChange.bind(this)} />
          }
        </div>
      }
    
  
}

export default TestComponent;