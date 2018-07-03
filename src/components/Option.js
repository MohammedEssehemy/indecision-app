import React from 'react';

const Option =  (props)=>{
    return (
      <div>
        Option: {props.option}
        <button onClick={(e)=>props.handleDeleteOpt(props.option)}>remove</button>
          </div>
    )
  };

export default Option;
