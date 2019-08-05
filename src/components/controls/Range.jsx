import React from 'react';

/**
 * A draggable range element.
 * Double click to enter value directly.
 */
export default class Range extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isMouseDown: false,
      value: props.value
    };
  }

  static defaultProps = {
    min: -Infinity,
    max: Infinity,
    step: 1,
    sensitivity: 5,
    onInput: () => {}
  };

  static propTypes = {
    value: React.PropTypes.number.isRequired,
    onChange: React.PropTypes.func.isRequired,
    /* min bound */
    min: React.PropTypes.number,
    /* max bound */
    max: React.PropTypes.number,
    /* number to increment by */
    step: React.PropTypes.number,
    /* number of pixels mouse has to move to step */
    sensitivity: React.PropTypes.number,
    onInput: React.PropTypes.func
  };

  componentWillMount() {
    this.setState({ isMouseDown: false });
  }

  componentWillReceiveProps(nextProps) {
    this.setState({ value: nextProps.value });
  }

  render() {
    return (
      <div className='range-container'>
        <input
          className='range-input'
          disabled={ this.props.disabled }
          value={ this.state.value }
          type='text'
          onChange={ this.onChange }
          onMouseDown={ this.onMouseDown }
          onKeyDown={ this.onKeyDown }
          onMouseUp={ this.onMouseUp }
          onDoubleClick={ this.onDoubleClick }
          onBlur={ this.onBlur } />
      </div>
    );
  }

  /* Clip the value based on the min and max bounds */
  cutoff = (num) => { return Math.min(Math.max(num, this.props.min), this.props.max); }

  onChange = (e) => { this.setState({ value: e.target.value }); }

  onBlur = () => {
    let parsed = parseFloat(this.state.value);
    if(isNaN(parsed)) this.setState({ value: this.props.value });
    else {
      this.props.onChange(this.cutoff(parsed));
      this.setState({ value: this.cutoff(parsed) });
    }
  }

  onMouseMove = (e) => {
    let change;
    if(this.props.sensitivity > 0) {
      change = Math.floor(( this.state.startX - e.screenX ) / this.props.sensitivity);
    } else {
      change = this.state.startX - e.screenX;
    }
    let value = this.cutoff(this.state.startValue - (change * this.props.step));
    this.setState({ dragged: true, value: value });
    this.props.onInput(value);
  }

  onMouseDown = (e) => {
    if(e.target === document.activeElement || e.button !== 0) return;
    this.setState({ isMouseDown: true });

    e.preventDefault();

    this.setState({ isMouseDown: true, dragged: false, startX: e.screenX, startValue: this.state.value });
    window.addEventListener('mousemove', this.onMouseMove);
    window.addEventListener('mouseup', this.onMouseUp);
  }

  onMouseUp = (e) => {
    if (this.state.isMouseDown) {
      e.preventDefault();
      window.removeEventListener('mousemove', this.onMouseMove);
      window.removeEventListener('mouseup', this.onMouseUp);
      if(this.state.dragged) this.onBlur();
      this.setState({ isMouseDown: false });
    }
  }

  onDoubleClick = (e) => { e.target.focus(); }

  onKeyDown = (e) => {
    let value;
    if (e.which == 38) {
      // UP
      e.preventDefault();
      value = this.state.value + this.props.step;
      this.setState({ value: value });
      this.props.onInput(value);
    } else if (e.which == 40) {
      // DOWN
      e.preventDefault();
      value = this.state.value - this.props.step;
      this.setState({ value: value });
      this.props.onInput(value);
    } else if (e.which == 13) {
      // ENTER
      this.onBlur(e);
      e.target.blur();
    }
  }
}