import React, { useState, useEffect } from 'react';
import { 
  ScrollView,
  Text,
  TextInput,
  View,
  TouchableOpacity,
  Image,
  ImageBackground,
  Dimensions,
  RefreshControl,
  Appearance,
  BackHandler,
} from "react-native";
import { useNavigation } from '@react-navigation/core';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';

import api from '../../../services/api';
import url from "../../../services/url";
import { darkTheme, lightTheme } from "./style";

const Avistamentos = () => {
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
    <View style={styles.mainBackground}>
      <ScrollView>
      </ScrollView>
    </View>
  );
}

export default Avistamentos;
