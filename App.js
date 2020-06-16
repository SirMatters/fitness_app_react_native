import * as React from 'react';
import { View } from 'react-native';
import AddEntry from './components/AddEntry';
import History from './components/History';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import reducer from './reducers';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

export default class App extends React.Component {
  render() {
    const Tab = createBottomTabNavigator();
    return (
      <Provider store={createStore(reducer)}>
        <View style={{ flex: 1 }}>
          <View style={{ height: 20 }} />
          <NavigationContainer>
            <Tab.Navigator>
              <Tab.Screen name='History' component={History} />
              <Tab.Screen name='Add New' component={AddEntry} />
            </Tab.Navigator>
          </NavigationContainer>
          {/* <History /> */}
        </View>
      </Provider>
    );
  }
}
