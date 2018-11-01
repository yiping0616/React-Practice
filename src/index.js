import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

//Functional Component(單純render UI stateless components)
const TodoList = (props) => (
    <ul>
        {
            props.items.map((item) => (
                <li key={item.id}>{item.text}</li>
            ))
        }
    </ul>
)
//Class Component(可進行較複雜的操作和元件生命週期的控制)
class TodoApp extends React.Component {
    constructor(props) {
      super(props);
      this.onChange = this.onChange.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
      this.state = {
          items: [],
          text: '',
      }
    }
    onChange(e) {
        this.setState({text: e.target.value});
    }
    handleSubmit(e) {
        e.preventDefault();
        const nextItems = this.state.items.concat( [{text: this.state.text, id: Date.now()}] );
        const nextText = '';
        this.setState({items: nextItems, text: nextText});
    }
    render() {
        return (
            <div>
                <h3>TODO</h3>
                <TodoList items={this.state.items} />
                <form onSubmit={this.handleSubmit}>
                    <input onChange={this.onChange} value={this.state.text} />
                    <button>{'Add #' + (this.state.items.length + 1)}</button>
                </form>
            </div>
        )
    }
    componentWillMount() {
        console.log('componentWillMount');
    }
    componentDidMount() {
        console.log('componentDidMount');
    }
    componentWillReceiveProps() {
        console.log('componentWillReceiveProps');
    }
    componentWillUpdate() {
        console.log('componentWillUpdate');
    }
    componentDidUpdate() {
        console.log('componentDidUpdate');
    }
    componentWillUnmount() {
        console.log('componentWillUnmount');
    }
}

ReactDOM.render(<TodoApp />, document.getElementById('root'));