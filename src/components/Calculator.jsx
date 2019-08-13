import React from 'react';

// App Components
import Button from './controls/Button';
import Range from './controls/Range';

export default class Calculator extends React.Component {
  constructor(props) {
    super(props);
    this.state = this.defaultState();
  }

  render() {
    let styles = this.getStyles();
    return (
      <div className='calculator'>
        <h3>Body Mass Index Calculator</h3>
        <div className='bmi-result-container'>
          <div className='bmi-result'>
            <div className='bmi-result-number'>
              Body Mass Index (BMI) = { this.state.bmi }
            </div>
            <div style={ styles[this.state.bmiClass.split(' ')[0].toLowerCase()] }>
              { this.state.bmiClass }
            </div>
          </div>
        </div>

        <div className='bmi-input'>
          <div className='input-fields'>
            <div className='input-group'>
            <p className="description">Input the needed parameters below and press "Enter"</p>
              <span className='label'>Height in cm</span>
              <Range min={90} max={245} value={ this.state.height } onChange={ this.heightChange } />
            </div>

            <div className='input-group'>
              <span className='label'>Weight in kg</span>
              <Range min={35} value={ this.state.weight } onChange={ this.weightChange } />
            </div>
          </div>
        </div>
        <div className='bmi-input'>
          <Button text='Reset' onclick={ this.reset } />
        </div>
      </div>
    );
  }

  heightChange = (height) => {
    this.setState({ height: height }, this.setBmi);
  }

  weightChange = (weight) => {
    this.setState({ weight: weight }, this.setBmi);
  }

  reset = () => { this.setState(this.defaultState()); }

  defaultState = () => {
    return {
      height: 156,
      weight: 76,
      bmi: 20.9,
      bmiClass: 'Over Weight'
    };
  }

  setBmi = () => {
    let bmi = ((this.state.weight / this.state.height / this.state.height) * 10000).toFixed(2);
    this.setState({ bmi: bmi, bmiClass: this.getBmiClass(bmi) });
  }

  getBmiClass = (bmi) => {
    if (bmi < 18.5) return 'Your BMI result indicates that your are UNDERWEIGHT, so you may need to put on some weight. You are recommended to ask your Doctor or a Dietician for advice.';
    if (bmi >= 18.5 && bmi <= 24.9) return 'Your BMI result indicates that you have a NORMAL WEIGHT, you are at a healthy weight for your height. By maintaining a healthy weight, you lower yur risk of developing serious health problems';
    if (bmi >= 25 && bmi <= 29.9) return 'Your BMI result indicates that you are OVERWEIGHT. Your health may be at risk if you do not loose weight. You are recommended to talk to your Doctor or Dietician for advice.';
    if (bmi >= 30) return 'Your BMI result indicates that you are OBESE, which means you are critically overweight. Your health may be at risk if you do not loose weight. You are recommended to talk to your Doctor or Dietician for advice.';
  }

  getStyles = () => {
    return {
      underweight: { color: '#FFFFFF' },
      normal: { color: '#F9F68D' },
      overweight: { color: '#FED88B' },
      obese: { color: '#FF5411' }
    }
  }
}