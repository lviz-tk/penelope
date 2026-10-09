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
  Platform,
} from "react-native";
import { useNavigation } from '@react-navigation/core';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import Dropdown from 'react-native-input-select';

import api from '../../../services/api';
import url from "../../../services/url";
import { darkTheme, lightTheme } from "./style";

const Configuracao = () => {
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

  const [selectedTheme, setSelectedTheme] = useState(Appearance.getColorScheme());

  useEffect(() => {
    if (Platform.OS != 'web') {
      Appearance.setColorScheme(selectedTheme);
    }

  }, [selectedTheme]);

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
        <Dropdown
          options={[
            { label: "Modo Automático", value: "unspecified" },
            { label: "Modo Claro", value: "light" },
            { label: "Modo Escuro", value: "dark" },
          ]}
          selectedValue={selectedTheme}
          onValueChange={(value) => setSelectedTheme(value)}
          minSelectableItems={1}
        />
      </ScrollView>
    </View>
  );
}

export default Configuracao;
