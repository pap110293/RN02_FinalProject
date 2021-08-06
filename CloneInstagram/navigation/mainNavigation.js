import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/AntDesign';

import FeedScreen from '../screens/main/feed';
import SearchScreen from '../screens/main/search';
import AddScreen from '../screens/main/add';
import ProfileScreen from '../screens/main/profile';
import ActivityScreen from '../screens/main/activity';
import screens from '../screens';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import EmptyScreen from '../screens/Empty';

const MainNavigation = ({navigation}) => {
  const Tab = createBottomTabNavigator();
  const Stack = createNativeStackNavigator();
  const tabIconSize = 23;

  const MainTabNavigation = () => {
    return (
      <Tab.Navigator screenOptions={{headerShown: false}}>
        <Tab.Screen
          name={screens.mains.feed}
          component={FeedScreen}
          options={{
            tabBarIcon: ({color, size}) => {
              return <Icon name="home" color={color} size={tabIconSize} />;
            },
            tabBarShowLabel: false,
          }}
        />

        <Tab.Screen
          name={screens.mains.search}
          component={SearchScreen}
          options={{
            tabBarIcon: ({color, size}) => {
              return <Icon name="search1" color={color} size={tabIconSize} />;
            },
            tabBarShowLabel: false,
          }}
        />

        <Tab.Screen
          name={screens.mains.addContainer}
          component={EmptyScreen}
          options={{
            tabBarIcon: ({color, size}) => {
              return (
                <Icon name="pluscircleo" color={color} size={tabIconSize} />
              );
            },
            tabBarShowLabel: false,
          }}
          listeners={{
            tabPress: e => {
              e.preventDefault();
            },
          }}
        />

        <Tab.Screen
          name={screens.mains.activity}
          component={ActivityScreen}
          options={{
            tabBarIcon: ({color, size}) => {
              return <Icon name="heart" color={color} size={tabIconSize} />;
            },
            tabBarShowLabel: false,
          }}
        />

        <Tab.Screen
          name={screens.mains.profile}
          component={ProfileScreen}
          options={{
            tabBarIcon: ({color, size}) => {
              return <Icon name="user" color={color} size={tabIconSize} />;
            },
            tabBarShowLabel: false,
          }}
        />
      </Tab.Navigator>
    );
  };

  return (
    <Stack.Navigator>
      <Stack.Screen name={screens.mains.main} component={MainTabNavigation} />
      <Stack.Screen name={screens.mains.add} component={AddScreen} />
    </Stack.Navigator>
  );
};

export default MainNavigation;
