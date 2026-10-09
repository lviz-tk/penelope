import React from 'react';
import { StyleSheet, Appearance } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/core';
import { NavigationContainer } from '@react-navigation/native';

import CustomBottomTabs from '../components/CustomBottomTabs';

import Artigo from '../screens/Artigo';
import Avistamentos from '../screens/Avistamentos';
import Configuracao from '../screens/Configuracao';
import Gravacao from '../screens/Gravacao';
import Home from '../screens/Home';
import Passaros from '../screens/Passaros';

const PassarosStack = createNativeStackNavigator();
function PassarosNavigation(){
  return (  
    <PassarosStack.Navigator 
      screenOptions={{
        headerShown: false,
      }}>
      <PassarosStack.Screen name="Passaros" component={Passaros} />
      <PassarosStack.Screen name="Artigo" component={Artigo} />
    </PassarosStack.Navigator>
  )
}

const BottomTab = createBottomTabNavigator();
function BottomTabNavigation(){
  return (
    <BottomTab.Navigator
      tabBar={(props) => <CustomBottomTabs {...props} />}
      screenOptions={{
        headerShown: false,
      }}
    >
      <BottomTab.Screen name="Home" component={Home} />
      <BottomTab.Screen name="PassarosNavigation" component={PassarosNavigation} />
      <BottomTab.Screen name="Gravacao" component={Gravacao} />
      <BottomTab.Screen name="Avistamentos" component={Avistamentos} />
      <BottomTab.Screen name="Configuracao" component={Configuracao} />
    </BottomTab.Navigator>
  )
}

const Routes = () => (
  <NavigationContainer>
    <BottomTabNavigation>
    </BottomTabNavigation>
  </NavigationContainer>
)

export default Routes;
