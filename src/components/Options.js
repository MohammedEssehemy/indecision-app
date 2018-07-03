import React from 'react';
import Option from './Option';
const Options =  (props) =>{
    return (
      <div>
        <h4> your options are </h4>
        {
          props.options
          .map((o,idx)=> (<Option handleDeleteOpt={props.handleDeleteOpt} option={o} key={idx} />))
        }

        <button onClick={props.handleRemoveAll} > Remove All</button>
          </div>
    )
  };
export default Options;
