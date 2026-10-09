import { StyleSheet } from "react-native";

import { lightColors, darkColors } from "../../styles/sharedColors";

function setThemeColors(theme){

  // Light
  if (theme === "light"){
    var mainBackground = lightColors.mainBackground;
    var fontColor = lightColors.fontColor;
  }
  // Dark
  else {
    var mainBackground = darkColors.mainBackground;
    var fontColor = darkColors.fontColor;
  }

  return StyleSheet.create({
    mainBackground:{
      flex: 1,
      backgroundColor: mainBackground,
    },
  })
}

const lightTheme = setThemeColors("light");
const darkTheme = setThemeColors("dark");

export {lightTheme, darkTheme};
