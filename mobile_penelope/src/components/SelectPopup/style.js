import { StyleSheet } from "react-native";

import { lightColors, darkColors } from "../../styles/sharedColors";

function setThemeColors(theme){

  // Light
  if (theme === "light"){
    var mainBackground = lightColors.header;
    var fontColor = lightColors.fontColor;
  }
  // Dark
  else {
    var mainBackground = darkColors.header;
    var fontColor = darkColors.fontColor;
  }

  return StyleSheet.create({
    dropdown:{
      backgroundColor: "#00000000",
      display: "none",
    },

    dropdownContainer:{
      display: "none",
      width: 0,
      height: 0,
    },

    modalContainer: {
      backgroundColor: mainBackground,
    },

    checkbox: {
      color: fontColor,
      fontSize: 18,
      marginTop: 5,
      marginBottom: 15,
      padding: 2,
    },

    optionLabel: {
      color: fontColor,
      fontSize: 22,
      marginTop: 5,
      marginBottom: 15,
      padding: 2,
    },
  })
}

const lightTheme = setThemeColors("light");
const darkTheme = setThemeColors("dark");

export {lightTheme, darkTheme};
