import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import ProfileScreen from '../screens/ProfileScreen';
import { TabParamList } from './types';
import { Feather } from '@expo/vector-icons';
import ProductsScreen from '../screens/Product/ProductsScreen';
import CartScreen from '../screens/CartScreen';

const Tab = createBottomTabNavigator<TabParamList>();

export default function TabNavigation() {
    return (
        <Tab.Navigator>
            <Tab.Screen name="Profile" component={ProfileScreen} options={{
                tabBarIcon: ({ focused, color, size }) => (
                    <Feather name="user" size={size} color={color} />
                )
            }} />
            <Tab.Screen name="Products" component={ProductsScreen} options={{
                headerShown: false,
                tabBarIcon: ({ focused, size, color }) => (
                    <Feather name="home" size={size} color={color} />
                )
            }} />
            <Tab.Screen name="Cart" component={CartScreen} options={{ tabBarIcon: ({ focused, size, color }) => (<Feather name="shopping-cart" size={size} color={color} />) }} />
        </Tab.Navigator>
    )
}


