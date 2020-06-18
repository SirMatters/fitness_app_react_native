import * as React from 'react';
import { View, Platform, StatusBar } from 'react-native';
import AddEntry from './components/AddEntry';
import History from './components/History';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import reducer from './reducers';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { white, purple } from './utils/colors';
import Constants from 'expo-constants';
import EntryDetail from './components/EntryDetail';
import { createStackNavigator } from '@react-navigation/stack';

export default class App extends React.Component {
  render() {
    const Tab =
      Platform.OS === 'ios'
        ? createBottomTabNavigator()
        : createMaterialTopTabNavigator();

    const RouteConfigs = {
      History: {
        name: 'History',
        component: History,
        options: {
          tabBarIcon: ({ tintColor }) => (
            <Ionicons name='ios-bookmarks' size={30} color={tintColor} />
          ),
          title: 'History',
        },
      },
      AddEntry: {
        component: AddEntry,
        name: 'Add Entry',
        options: {
          tabBarIcon: ({ tintColor }) => (
            <FontAwesome name='plus-square' size={30} color={tintColor} />
          ),
          title: 'Add Entry',
        },
      },
    };

    const TabNavigatorConfig = {
      navigationOptions: {
        header: null,
      },
      tabBarOptions: {
        activeTintColor: Platform.OS === 'ios' ? purple : white,
        style: {
          height: 56,
          backgroundColor: Platform.OS === 'ios' ? white : purple,
          shadowColor: 'rgba(0, 0, 0, 0.24)',
          shadowOffset: {
            width: 0,
            height: 3,
          },
          shadowRadius: 6,
          shadowOpacity: 1,
        },
      },
    };

    function UdaciStatusBar({ backgroundColor, ...props }) {
      return (
        <View style={{ backgroundColor, height: Constants.statusBarHeight }}>
          <StatusBar translucent backgroundColor={backgroundColor} {...props} />
        </View>
      );
    }

    const TabNav = () => (
      <Tab.Navigator {...TabNavigatorConfig}>
        <Tab.Screen {...RouteConfigs['History']} />
        <Tab.Screen {...RouteConfigs['AddEntry']} />
      </Tab.Navigator>
    );

    const Stack = createStackNavigator();
    const MainNav = () => (
      <Stack.Navigator headerMode='screen'>
        <Stack.Screen
          name='Home'
          component={TabNav}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name='EntryDetail'
          component={EntryDetail}
          options={{
            headerTintColor: white,
            headerStyle: { backgroundColor: purple },
          }}
        />
      </Stack.Navigator>
    );

    return (
      <Provider store={createStore(reducer)}>
        <View style={{ flex: 1 }}>
          <UdaciStatusBar />
          <NavigationContainer>
            <MainNav />
          </NavigationContainer>
        </View>
      </Provider>
    );
  }
}
