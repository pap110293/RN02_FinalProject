import React, {useEffect} from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {NavigationContainer} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/AntDesign';
import {Text} from 'react-native';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import FeedScreen from '../screens/main/feed';
import SearchScreen from '../screens/main/search';
import AddScreen from '../screens/main/add';
import ProfileScreen from '../screens/main/profile';
import ActivityScreen from '../screens/main/activity';
import CommentsScreen from '../screens/main/comments/comments';
import screens from '../screens';
import {createStackNavigator} from '@react-navigation/stack';
import EmptyScreen from '../screens/Empty';
import SaveScreen from '../screens/main/save';
import {fetchUser, fetchUserPosts} from '../redux/actions/user';
import {getCurrentUserId} from '../firebase/authService';
import ProfilePosts from '../screens/main/profilePosts';

const MainNavigation = ({fetchUser, fetchUserPosts, navigation}) => {
  const Tab = createBottomTabNavigator();
  const Stack = createStackNavigator();
  const tabIconSize = 23;

  useEffect(() => {
    fetchUser();
    fetchUserPosts();
  }, []);

  const searchStacks = () => {
    return (
      <Stack.Navigator>
        <Stack.Screen
          name={screens.mains.search}
          component={SearchScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name={screens.mains.profileUser}
          component={ProfileScreen}
          initialParams={{uid: getCurrentUserId()}}
        />
      </Stack.Navigator>
    );
  };

  const feedStacks = () => {
    return (
      <Stack.Navigator>
        <Stack.Screen
          name={screens.mains.feed}
          component={FeedScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name={screens.mains.profileUser}
          component={ProfileScreen}
          initialParams={{uid: getCurrentUserId()}}
        />
      </Stack.Navigator>
    );
  };

  const profileStacks = () => {
    return (
      <Stack.Navigator>
        <Stack.Screen
          name={screens.mains.profileTab}
          component={ProfileScreen}
          initialParams={{uid: getCurrentUserId()}}
        />
      </Stack.Navigator>
    );
  };

  const MainTabNavigation = () => {
    return (
      <Tab.Navigator
        screenOptions={({route}) => {
          return {
            tabBarShowLabel: false,
            tabBarLabel: ({focused, color}) => {
              return (
                <Text
                  style={{
                    fontSize: 14,
                    fontWeight: '600',
                    color: color,
                  }}>
                  {focused ? route.name : ''}
                </Text>
              );
            },
          };
        }}
        initialRouteName={screens.mains.feed}>
        <Tab.Screen
          name={screens.mains.feed}
          component={feedStacks}
          options={{
            tabBarIcon: ({color}) => {
              return <Icon name="home" color={color} size={tabIconSize} />;
            },
          }}
        />

        <Tab.Screen
          name={screens.mains.search}
          component={searchStacks}
          options={{
            tabBarIcon: ({color}) => {
              return <Icon name="search1" color={color} size={tabIconSize} />;
            },
          }}
        />

        <Tab.Screen
          name={screens.mains.addContainer}
          component={EmptyScreen}
          options={{
            tabBarIcon: ({color}) => {
              return (
                <Icon name="pluscircleo" color={color} size={tabIconSize} />
              );
            },
          }}
          listeners={({navigation}) => {
            return {
              tabPress: e => {
                e.preventDefault();
                navigation.push(screens.mains.add);
              },
            };
          }}
        />

        <Tab.Screen
          name={screens.mains.activity}
          component={ActivityScreen}
          options={{
            tabBarIcon: ({color}) => {
              return <Icon name="heart" color={color} size={tabIconSize} />;
            },
          }}
        />

        <Tab.Screen
          name={screens.mains.profile}
          component={profileStacks}
          options={{
            tabBarIcon: ({color}) => {
              return <Icon name="user" color={color} size={tabIconSize} />;
            },
          }}
        />
      </Tab.Navigator>
    );
  };

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name={screens.mains.main}
          component={MainTabNavigation}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name={screens.mains.add}
          component={AddScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name={screens.mains.comments}
          component={CommentsScreen}
          options={{headerBackTitleVisible: false}}
        />
        <Stack.Screen
          name={screens.mains.outProfileUser}
          component={ProfileScreen}
          initialParams={{uid: getCurrentUserId()}}
          options={{headerBackTitleVisible: false}}
        />
        <Stack.Screen name={screens.mains.save} component={SaveScreen} />
        <Stack.Screen
          name={screens.mains.profilePosts}
          component={ProfilePosts}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const mapDispatchToProp = dispatch =>
  bindActionCreators({fetchUser, fetchUserPosts}, dispatch);

export default connect(null, mapDispatchToProp)(MainNavigation);
