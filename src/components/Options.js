import React from 'react';
import Option from './Option';
const Options =  (props) =>(
  <div>
    <div className="widget-header">
      <h3 className="widget-header__title"> Your Options</h3>
      <button
        className="button button--link"
        onClick={props.handleRemoveAll}
      > Remove All</button>
    </div>
    {!props.options.length && <p className="widget__message">add an option to start.</p>}
    {
        props.options
      .map((o,idx)=> (
        <Option
          handleDeleteOpt={props.handleDeleteOpt}
          option={o}
          key={o}
          count={idx+1}
        />))
    }

  </div>
  );
  export default Options;
