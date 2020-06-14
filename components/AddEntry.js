import React from 'react';
import { View, Text, Platform, StyleSheet } from 'react-native';
import { getMetricMetaInfo, timeToString } from '../utils/helpers';
import UdaciSlider from './UdaciSlider';
import UdaciStepper from './UdaciStepper';
import DateHeader from './DateHeader';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Ionicons } from 'react-native-vector-icons';
import TextButton from './TextButton';
import { submitEntry, removeEntry } from '../utils/api';
import { connect } from 'react-redux';
import { addEntry } from '../actions';
import { getDailyReminderValue } from '../utils/helpers';
import { white, purple } from '../utils/colors';

function SubmitBtn({ onPress }) {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={
        Platform.OS === 'ios' ? styles.iosSubmitBtn : styles.androidSubmitBth
      }
    >
      <Text style={styles.submitBtnText}>Submit</Text>
    </TouchableOpacity>
  );
}
class AddEntry extends React.Component {
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
    this.props.dispatch(
      addEntry({
        [key]: entry,
      })
    );

    this.setState(() => ({
      run: 0,
      bike: 0,
      swim: 0,
      sleep: 0,
      eat: 0,
    }));
    // Navigate to home

    // Save to DB
    submitEntry({ key, entry });
    // Clear local notification
  };

  reset = () => {
    const key = timeToString();

    // Update redux
    this.props.dispatch(
      addEntry({
        [key]: getDailyReminderValue(),
      })
    );
    // Route to home

    // Update DB
    removeEntry(key);
  };

  render() {
    const metaInfo = getMetricMetaInfo();
    const date = new Date().toLocaleDateString();

    if (this.props.alreadyLogged) {
      return (
        <View style={styles.center}>
          <Ionicons
            name={Platform.OS === 'ios' ? 'ios-happy' : 'md-happy'}
            size={100}
          />
          <Text>You have already logged in your today's data</Text>
          <TextButton style={{ padding: 10 }} onPress={this.reset}>
            Reset
          </TextButton>
        </View>
      );
    }

    return (
      <View style={styles.container}>
        <DateHeader date={date} />
        {Object.keys(metaInfo).map((key) => {
          const { getIcon, type, ...rest } = metaInfo[key];
          const value = this.state[key];

          return (
            <View key={key} style={styles.row}>
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: white,
  },
  row: {
    flexDirection: 'row',
    flex: 1,
    alignItems: 'center',
  },
  iosSubmitBtn: {
    backgroundColor: purple,
    padding: 10,
    borderRadius: 7,
    height: 45,
    marginLeft: 40,
    marginRight: 40,
  },
  androidSubmitBth: {
    backgroundColor: purple,
    padding: 10,
    paddingLeft: 30,
    paddingRight: 30,
    height: 45,
    borderRadius: 2,
    alignSelf: 'flex-end',
    justifyContent: 'center',
    alignItems: 'center',
  },
  submitBtnText: {
    color: white,
    fontSize: 22,
    textAlign: 'center',
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 30,
    marginLeft: 30,
  },
});

function mapStateToProps(state) {
  const key = timeToString();

  return {
    alreadyLogged: state[key] && typeof state[key].today === 'undefined',
  };
}

export default connect(mapStateToProps)(AddEntry);
