import React from 'react';
import ReactDOM from 'react-dom';
import Header from './Header';
import Action from './Action';
import Options from './Options';
import AddOption from './AddOption';


export default class IndecisionApp extends React.Component {
  state = {
    options: []
  };
  handleRemoveAll =  () => {
    this.setState(()=>({ options: [] }));
  };

  handlePick = () => {
    const idx = Math.floor(Math.random()*this.state.options.length);
    const opt = this.state.options[idx];
    alert(opt);
  };


  handleAddOption = (opt) => {
    if(!opt) return 'please add a valid option';
    if(this.state.options.includes(opt)) return 'this option already exists';
    this.setState((prevState)=>({options: prevState.options.concat(opt)}));
  };

  handleDeleteOpt = (opt) => {
    this.setState(()=>({options: this.state.options.filter(o=>o!==opt)}))
  };



  componentDidMount(){
    try{
      let opts = localStorage.getItem('options');
      if(opts) {
        let options = JSON.parse(localStorage.getItem('options'));
        this.setState(() => ({options}))
      }
    } catch (err){
      console.error(err);
    }
  }

  componentDidUpdate(prevProps, prevState){
    if(this.state.options.length !== prevState.options.length){
      localStorage.setItem('options', JSON.stringify(this.state.options));
    }
  }

  render(){
    const subtitle = 'random selector';
    return (
      <div>
        <Header subtitle={subtitle} />
        <Action
          hasOptions={!!this.state.options.length}
          handlePick = {this.handlePick}
        />
        <Options
          handleDeleteOpt={this.handleDeleteOpt}
          options={this.state.options}
          handleRemoveAll = {this.handleRemoveAll}
        />
        <AddOption  handleAddOption = {this.handleAddOption}/>
      </div>
    )
  }
}
IndecisionApp.defaultProps = {
  options: []
}
