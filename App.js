import * as React from 'react';
import { Platform, StyleSheet, Text, View } from 'react-native';
import { render } from 'react-dom';
import AddEntry from './components/AddEntry';

export default class App extends React.Component {
  render() {
    return (
      <View>
        <AddEntry />
      </View>
    );
  }
}
