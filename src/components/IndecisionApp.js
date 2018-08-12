import React from 'react';
import ReactDOM from 'react-dom';
import Header from './Header';
import Action from './Action';
import Options from './Options';
import AddOption from './AddOption';
import OptionModal from './optionModal';

export default class IndecisionApp extends React.Component {
  state = {
    options: [],
    selectedOption: undefined
  };
  handleRemoveAll =  () => {
    this.setState(()=>({ options: [] }));
  };

  handlePick = () => {
    const idx = Math.floor(Math.random()*this.state.options.length);
    const opt = this.state.options[idx];
    // alert(opt);
    this.setState(()=>({
      selectedOption: opt
    }))
  };

  handleCloseModal= () => {
    this.setState(()=>({selectedOption: undefined}));
  }
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
        <div className="container">
          <Action
            hasOptions={!!this.state.options.length}
            handlePick = {this.handlePick}
          />
          <div className="widget">
            <Options
              handleDeleteOpt={this.handleDeleteOpt}
              options={this.state.options}
              handleRemoveAll = {this.handleRemoveAll}
            />
            <AddOption  handleAddOption = {this.handleAddOption}/>
          </div>
        </div>
          <OptionModal
          selectedOption={this.state.selectedOption}
          onCloseClick={this.handleCloseModal}
        />
      </div>
    )
  }
}
IndecisionApp.defaultProps = {
  options: []
}
