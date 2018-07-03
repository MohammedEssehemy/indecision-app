'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var IndecisionApp = function (_React$Component) {
  _inherits(IndecisionApp, _React$Component);

  function IndecisionApp(props) {
    _classCallCheck(this, IndecisionApp);

    var _this = _possibleConstructorReturn(this, (IndecisionApp.__proto__ || Object.getPrototypeOf(IndecisionApp)).call(this, props));

    _this.state = {
      options: props.options
    };
    return _this;
  }

  _createClass(IndecisionApp, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      try {
        var options = JSON.parse(localStorage.getItem('options'));
        this.setState(function () {
          return { options: options };
        });
      } catch (err) {
        console.error(err);
      }
    }
  }, {
    key: 'componentDidUpdate',
    value: function componentDidUpdate(prevProps, prevState) {
      if (this.state.options.length !== prevState.options.length) {
        localStorage.setItem('options', JSON.stringify(this.state.options));
      }
    }
  }, {
    key: 'handleRemoveAll',
    value: function handleRemoveAll() {
      this.setState(function () {
        return { options: [] };
      });
    }
  }, {
    key: 'handlePick',
    value: function handlePick() {
      var idx = Math.floor(Math.random() * this.state.options.length);
      var opt = this.state.options[idx];
      alert(opt);
    }
  }, {
    key: 'handleAddOption',
    value: function handleAddOption(opt) {
      if (!opt) return 'please add a valid option';
      if (this.state.options.includes(opt)) return 'this option already exists';
      this.setState(function (prevState) {
        return { options: prevState.options.concat(opt) };
      });
    }
  }, {
    key: 'handleDeleteOpt',
    value: function handleDeleteOpt(opt) {
      var _this2 = this;

      this.setState(function () {
        return { options: _this2.state.options.filter(function (o) {
            return o !== opt;
          }) };
      });
    }
  }, {
    key: 'render',
    value: function render() {
      var subtitle = 'random selector';
      return React.createElement(
        'div',
        null,
        React.createElement(Header, { subtitle: subtitle }),
        React.createElement(Action, {
          hasOptions: !!this.state.options.length,
          handlePick: this.handlePick.bind(this)
        }),
        React.createElement(Options, {
          handleDeleteOpt: this.handleDeleteOpt.bind(this),
          options: this.state.options,
          handleRemoveAll: this.handleRemoveAll.bind(this)
        }),
        React.createElement(AddOption, { handleAddOption: this.handleAddOption.bind(this) })
      );
    }
  }]);

  return IndecisionApp;
}(React.Component);

IndecisionApp.defaultProps = {
  options: []
};

var Header = function Header(props) {
  return React.createElement(
    'div',
    null,
    React.createElement(
      'h1',
      null,
      props.title
    ),
    React.createElement(
      'h3',
      null,
      props.subtitle
    )
  );
};
Header.defaultProps = {
  title: 'Indecision App'
};
var Action = function Action(props) {
  return React.createElement(
    'div',
    null,
    React.createElement(
      'button',
      {
        onClick: props.handlePick,
        disabled: !props.hasOptions
      },
      '  Pick an Action?'
    )
  );
};

var Options = function Options(props) {
  return React.createElement(
    'div',
    null,
    React.createElement(
      'h4',
      null,
      ' your options are '
    ),
    props.options.map(function (o, idx) {
      return React.createElement(Option, { handleDeleteOpt: props.handleDeleteOpt, option: o, key: idx });
    }),
    React.createElement(
      'button',
      { onClick: props.handleRemoveAll },
      ' Remove All'
    )
  );
};

var Option = function Option(props) {
  return React.createElement(
    'div',
    null,
    'Option: ',
    props.option,
    React.createElement(
      'button',
      { onClick: function onClick(e) {
          return props.handleDeleteOpt(props.option);
        } },
      'remove'
    )
  );
};

var AddOption = function (_React$Component2) {
  _inherits(AddOption, _React$Component2);

  function AddOption(props) {
    _classCallCheck(this, AddOption);

    var _this3 = _possibleConstructorReturn(this, (AddOption.__proto__ || Object.getPrototypeOf(AddOption)).call(this, props));

    _this3.state = {
      error: undefined
    };
    return _this3;
  }

  _createClass(AddOption, [{
    key: 'handleAddOption',
    value: function handleAddOption(e) {
      e.preventDefault();
      var option = e.target.elements.option.value.trim();
      var error = this.props.handleAddOption(option);
      this.setState(function () {
        return { error: error };
      });
      if (!error) e.target.elements.option.value = '';
    }
  }, {
    key: 'render',
    value: function render() {
      return React.createElement(
        'div',
        null,
        this.state.error && React.createElement(
          'p',
          null,
          ' ',
          this.state.error,
          ' '
        ),
        React.createElement(
          'form',
          { onSubmit: this.handleAddOption.bind(this) },
          React.createElement('input', { type: 'text', name: 'option' }),
          React.createElement(
            'button',
            null,
            'Add Option'
          )
        )
      );
    }
  }]);

  return AddOption;
}(React.Component);

var appRoot = document.getElementById('app');

ReactDOM.render(React.createElement(IndecisionApp, null), appRoot);
