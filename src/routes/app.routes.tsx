import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Groups } from '@screens/Groups';
import { NewGroup } from '@screens/NewGroup';
import { Players } from '@screens/Players';
import React from 'react';

const { Navigator, Screen } = createNativeStackNavigator()

const AppRoutes: React.FC = () => {
  return (
    <Navigator screenOptions={{ headerShown: false }}>
        <Screen 
            name='groups'
            component={Groups}
        />
        <Screen 
            name='players'
            component={Players}
        />
         <Screen 
            name='new'
            component={NewGroup}
        />
    </Navigator>
  )
}

export {AppRoutes};