import { StyleSheet } from "react-native";

import { lightColors, darkColors } from "../../styles/sharedColors";

function setThemeColors(theme){

  // Light
  if (theme === "light"){
    var mainBackground = lightColors.mainBackground;
    var header = lightColors.header;
    var subHeader = "#d1f6d7";
    var fontColor = lightColors.fontColor;
    var rowOdd = '#d0f0d0';
    var rowEven = '#d4ffd4';
  }
  // Dark
  else {
    var mainBackground = darkColors.mainBackground;
    var header = darkColors.header;
    var subHeader = "#123012";
    var fontColor = darkColors.fontColor;
    var rowOdd = '#194019';
    var rowEven = '#153b15';
  }

  return StyleSheet.create({
    mainView:{
      flex: 1,
      backgroundColor: mainBackground,
    },

    mainScrollView:{
      flex: 1,
    },

    headerSafeArea:{
      backgroundColor: header,
    },

    topHeader:{
      flexDirection: "row",
      alignItems: "space-between",
      justifyContent: "center",
      alignContent: "space-between",
      paddingBottom: 15,
      width: "100%",
      height: 70,
      backgroundColor: header,
    },

    searchBar:{
      width: "83%",
      flexDirection: "row",
      height: 45,
      backgroundColor: "#335533aa",
      justifyContent: "center",
      borderRadius: 15,
      marginTop: 15,
    },

    searchBarInput:{
      fontSize: 20,
      padding: 3,
      marginLeft: 5,
      width: "88%",
      color: fontColor,
    },

    searchBarIcon:{
      width: "10%",
      marginLeft: 5,
      alignSelf: "center",
    },

    filterButton:{
      marginLeft: 5,
      marginTop: 15,
    },

    searchButton:{
      marginLeft: 5,
    },

    sortHeader:{
      flexDirection: "row",
      alignItems: "center",
      width: "100%",
      height: 50,
      paddingRight: 10,
      backgroundColor: subHeader,
      boxShadow: "3px 5px 10px #00000055",
    },

    passarosExibidos:{
      fontSize: 22,
      marginLeft: 10,
      color: fontColor,
      width: "60%",
    },

    sortByButton:{
      width: "10%",
    },

    listScrollView:{
      width: "100%",
      minHeight: "100%",
    },

    listImagePreview:{
      width: 64,
      height: 64,
      margin: 5,
      borderColor: "#ffffff22",
      borderWidth: 1,
      borderRadius: 10,
    },

    listRow:{
      borderRadius: 10,
      width: "95%",
      marginTop: 8,
      flex: 1,
      flexDirection: "row",
      justifySelf: "center",
      alignSelf: "center",
      boxShadow: "3px 5px 10px #00000055",
    },

    listPassaroInfo:{
      flex: 1,
      width: "80%",
      marginLeft: 5
    },

    listNomePopularText:{
      marginTop: 7,
      marginLeft: 2,
      fontSize: 22,
      color: fontColor,
      textWrap: "nowrap",
      textOverflow: "ellipsis",
      overflow: "hidden",
    },

    listMiscInfo:{
      flex: 1,
      flexDirection: "row",
      marginTop: 5,
    },

    listNomeBinomialText:{
      fontSize: 17,
      color: fontColor,
      textWrap: "nowrap",
      textOverflow: "ellipsis",
      overflow: "hidden",
    },

    listEstadoConservacaoBadge:{
      width: 25,
      height: 18,
      marginLeft: 7,
      marginTop: 2,
      borderRadius: "15%",
      backgroundColor: "#016767",
      justifyContent: "center",
      textAlign: "center",
      alignItems: "center",
    },

    listEstadoConservacaoText:{
      color: "#f0f0f0",
      fontWeight: "bold",
      fontSize: 12,
    },

    listEnvergaduraText:{
      marginLeft: 6,
      marginTop: 2,
      fontSize: 16,
      color: fontColor,
    },

    listFavoritePassaroButton:{
      alignSelf: "center",
      marginBottom: 5,
      marginRight: 15
    },

    rowEven:{
      backgroundColor: rowEven,
    },

    rowOdd:{
      backgroundColor: rowOdd,
    },

    gridView:{
      width: "100%",
      display: "grid",
      gridTemplateColumns: "1fr 1fr",
      gridTemplateRows: "1fr 1fr",
    },

    gridItem:{
      width: "1fr",
      aspectRatio: "1 / 1",
    },

    gridImage:{
      width: "100%",
      height: "100%",
      boxShadow: "5px 5px 20px #00000077",
      borderColor: "#ffffff22",
      borderWidth: 1,
      borderRadius: 15,
    },

    gridGradient:{
      width: "100%",
      height: "100%",
      borderRadius: "5%",
      backgroundImage: "linear-gradient(#00000055, #00000000, #00000055)",
    },

    gridUpperInfo:{
      width: "100%",
      height: "70%",
      padding: 2,
    },

    gridNomePopularText:{
      marginTop: 5,
      marginLeft: 2,
      fontSize: 22,
      color: "#f0f0f0",
      textShadow: "3px 2px 5px #000000aa",
    },

    gridNomeBinomialText:{
      fontSize: 18,
      color: "#f0f0f0",
      textShadow: "3px 2px 5px #000000aa",
    },

    gridFavoritePassaroButton:{
      alignSelf: "flex-end",
      marginBottom: 5,
      marginRight: 8,
      textShadow: "3px 5px 5px #00000088",
    },

    gridBottomInfo:{
      width: "100%",
      height: "30%",
      flexDirection: "row",
    },

    gridMiscInfo:{
      width: "75%",
      height: "100%",
      flexDirection: "row",
    },

    gridEstadoConservacaoBadge:{
      width: 25,
      height: 18,
      margin: 5,
      borderRadius: "15%",
      justifyContent: "center",
      textAlign: "center",
      alignItems: "center",
      alignSelf: "flex-end",
      boxShadow: "5px 5px 20px #00000077",
    },

    gridEstadoConservacaoText:{
      color: "#f0f0f0",
      fontWeight: "bold",
      fontSize: 12,
    },

    gridEnvergaduraText:{
      margin: 5,
      fontSize: 16,
      color: "#f0f0f0",
      alignSelf: "flex-end",
      textShadow: "3px 5px 5px #00000088",
    },

    vectorIcon:{
      color: fontColor,
    },

    vectorIconLight:{
      color: darkColors.fontColor,
    },
  })
}

const lightTheme = setThemeColors("light");
const darkTheme = setThemeColors("dark");

export {lightTheme, darkTheme};
