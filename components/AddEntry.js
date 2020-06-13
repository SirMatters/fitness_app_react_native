import React from 'react';
import { View, Text } from 'react-native';
import { getMetricMetaInfo, timeToString } from '../utils/helpers';
import UdaciSlider from './UdaciSlider';
import UdaciStepper from './UdaciStepper';
import DateHeader from './DateHeader';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Ionicons } from 'react-native-vector-icons';
import TextButton from './TextButton';

function SubmitBtn({ onPress }) {
  return (
    <TouchableOpacity onPress={onPress}>
      <Text>Submit</Text>
    </TouchableOpacity>
  );
}
export default class AddEntry extends React.Component {
  state = {
    run: 0,
    bike: 0,
    swim: 0,
    sleep: 0,
    eat: 0,
  };

  increment = (metric) => {
    const { max, step } = getMetricMetaInfo(metric);
    this.setState((prevState) => {
      const count = prevState[metric] + step;
      return { ...prevState, [metric]: count > max ? max : count };
    });
  };

  decrement = (metric) => {
    this.setState((prevState) => {
      const count = prevState[metric] - getMetricMetaInfo(metric).step;
      return { ...prevState, [metric]: count < 0 ? 0 : count };
    });
  };

  slide = (metric, value) => {
    this.setState(() => ({
      [metric]: value,
    }));
  };

  submit = () => {
    const key = timeToString();
    const entry = this.state;

    // Update Redux
    this.setState(() => ({
      run: 0,
      bike: 0,
      swim: 0,
      sleep: 0,
      eat: 0,
    }));
    // Navigate to home
    // Save to DB
    // Clear local notification
  };

  reset = () => {
    const key = timeToString();

    // Update redux

    // Route to home

    // Update DB
  };

  render() {
    const metaInfo = getMetricMetaInfo();
    const date = new Date().toLocaleDateString();

    if (this.props.alreadyLogged()) {
      return (
        <View>
          <Ionicons name='ios-happy' size={100} />
          <Text>You have already logged in your today's data</Text>
          <TextButton onPress={this.reset}>Reset</TextButton>
        </View>
      );
    }

    return (
      <View>
        <DateHeader date={date} />
        <Text>{JSON.stringify(this.state)}</Text>
        {Object.keys(metaInfo).map((key) => {
          const { getIcon, type, ...rest } = metaInfo[key];
          const value = this.state[key];

          return (
            <View key={key}>
              {getIcon()}
              {type === 'slider' ? (
                <UdaciSlider
                  value={this.state[key]}
                  onChange={(value) => {
                    this.slide(key, value);
                  }}
                  {...rest}
                />
              ) : (
                <UdaciStepper
                  value={value}
                  onIncrement={() => {
                    this.increment(key);
                  }}
                  onDecrement={() => {
                    this.decrement(key);
                  }}
                  {...rest}
                />
              )}
            </View>
          );
        })}
        <SubmitBtn onPress={this.submit} />
      </View>
    );
  }
}
