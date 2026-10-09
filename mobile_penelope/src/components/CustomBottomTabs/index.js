import { React, useState, useEffect } from 'react';
import { Alert, Image, Text, TouchableOpacity, View, StyleSheet, Appearance } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons, Entypo } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/core';

import { darkTheme, lightTheme } from "./style";

const CustomBottomTabs = ({ state }) => {
  const navigation = useNavigation();
  const [styles, setStyles] = useState(() => {
    const theme = Appearance.getColorScheme();
    if (theme === "light"){
      return lightTheme;
    }
    else {
      return darkTheme;
    }
  });

  const {index, routes} = state;  
  const currentRouteName = routes[index].name;  

  function focusedIcon(routeName, iconFocused, iconUnfocused){
    if(routeName === currentRouteName){
      return (
        <Ionicons style={styles.screenIcon} name={iconFocused} size={35} color="#eee" />
      )
    }
    else{
      return (
        <Ionicons style={styles.screenIcon} name={iconUnfocused} size={35} color="#eee" />
      )
    }
  }

  useEffect(() => {
    const theme = Appearance.getColorScheme();
    if (theme === "light"){
      setStyles(lightTheme);
    }
    else {
      setStyles(darkTheme);
    }

    Appearance.addChangeListener(() => {
      const theme = Appearance.getColorScheme();
      if (theme === "light"){
        setStyles(lightTheme);
      }
      else {
        setStyles(darkTheme);
      }
    });
  }, []);

  return (
    <SafeAreaView
      style={styles.container}
      edges={["bottom"]}
    >
      <TouchableOpacity
        style={styles.screen}
        onPress={() => {
          navigation.navigate("Home")
        }}
        activeOpacity={0.9}
      >
        {focusedIcon("Home", "home", "home-outline")}
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.screen}
        onPress={() => {
          navigation.navigate("PassarosNavigation")
        }}
        activeOpacity={0.9}
      >
        {focusedIcon("PassarosNavigation", "egg", "egg-outline")}
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.screen}
        onPress={() => {
          navigation.navigate("Gravacao")
        }}
        activeOpacity={0.9}
      >
        {focusedIcon("Gravacao", "mic", "mic-outline")}
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.screen}
        onPress={() => {
          navigation.navigate("Avistamentos")
        }}
        activeOpacity={0.9}
      >
        {focusedIcon("Avistamentos", "eye", "eye-outline")}
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.screen}
        onPress={() => {
          navigation.navigate("Configuracao")
        }}
        activeOpacity={0.9}
      >
        {focusedIcon("Configuracao", "settings", "settings-outline")}
      </TouchableOpacity>
    </SafeAreaView>
  );
}

export default CustomBottomTabs;
