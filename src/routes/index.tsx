import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {SCREENS} from '../utils/constants';
import Detail from '../screens/Detail';
import Add from '../screens/Add';
import {TabNavigation} from '../components';

const Stack = createStackNavigator();

const Routes = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown: true}}>
        <Stack.Screen
          name={SCREENS.CONTACT}
          component={TabNavigation}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen name={SCREENS.DETAIL} component={Detail} />
        <Stack.Screen name={SCREENS.ADD} component={Add} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Routes;
