import React from 'react'

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import Lista from './src/pages/Lista';
import DetalheEpisodio from './src/pages/DetalheEpisodio';
import DetalheSerie from './src/pages/DetalheSerie';

const Stack = createStackNavigator();

export default function Navigation() {
    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen name="Lista" component={Lista} options={{ headerShown: false }} />
                <Stack.Screen name="DetalheSerie" component={DetalheSerie} options={{ headerShown: false }} />
                <Stack.Screen name="DetalheEpisodio" component={DetalheEpisodio} options={{ headerShown: false }} />
            </Stack.Navigator>
        </NavigationContainer>
    );
}