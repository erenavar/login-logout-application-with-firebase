import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import ProfileScreen from '../screens/ProfileScreen';
import { TabParamList } from './types';

const Tab = createBottomTabNavigator<TabParamList>();

export default function tabNavigation() {
    return (
        <Tab.Navigator>
            <Tab.Screen name="Profile" component={ProfileScreen}></Tab.Screen>
            <Tab.Screen name="Products" component={ProfileScreen}></Tab.Screen>
            <Tab.Screen name="Cart" component={ProfileScreen}></Tab.Screen>
        </Tab.Navigator>
    )
}


