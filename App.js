import * as React from 'react';
import { View } from 'react-native';
import AddEntry from './components/AddEntry';

export default class App extends React.Component {
  alreadyLogged = () => {};

  render() {
    return (
      <View>
        <AddEntry alreadyLogged={this.alreadyLogged} />
      </View>
    );
  }
}
