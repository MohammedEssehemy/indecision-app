import React from 'react';

const Action = (props) => (
      <div>
        <button
          className="big-button"
          onClick={props.handlePick}
          disabled={!props.hasOptions}
        >  Pick an Action?
        </button>
      </div>
    );

export default Action;
