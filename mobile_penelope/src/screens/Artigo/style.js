import { StyleSheet } from "react-native";

import { lightColors, darkColors } from "../../styles/sharedColors";

function setThemeColors(theme){

  // Light
  if (theme === "light"){
    var mainBackground = lightColors.mainBackground;
    var header = lightColors.header;
    var headerFontColor = "#081510";
    var fontColor = lightColors.fontColor;
    var carouselContainerBackground = "#506550";
    var carouselPaginationBar = "#1d4d3b";
    var artigoInfoColor = "#c1f8d5";
    var boldFontColor = "#0f3024";
    var cantoPlayerColor = "#a1e8b9";
    var avistamentosInnerContainerColor = "#e1f8e5";
  }
  // Dark
  else {
    var mainBackground = darkColors.mainBackground;
    var header = darkColors.header;
    var headerFontColor = "#e0e0e0";
    var fontColor = darkColors.fontColor;
    var carouselContainerBackground = "#151718";
    var carouselPaginationBar = "#151617";
    var artigoInfoColor = "#0f1011";
    var boldFontColor = "#20b655";
    var cantoPlayerColor = "#31403f";
    var avistamentosInnerContainerColor = "#31403f";
  }

  return StyleSheet.create({
    mainView:{
      flex: 1,
      backgroundColor: mainBackground,
    },

    mainScrollView:{
      flex: 1,
    },

    header:{
      backgroundColor: header,
      flexDirection: "row",
      alignItems: "center",
      alignContent: "space-between",
      height: 80,
      width: "100%",
      boxShadow: "3px 3px 20px #00000077",
    },

    headerTitle:{
      width: "70%",
      textAlign: "center",
      color: headerFontColor,
      fontSize: 23,
      fontWeight: "bold",
      textWrap: "nowrap",
      textOverflow: "ellipsis",
    },

    headerButton:{
      width: "15%",
    },

    headerVectorIcon:{
      color: headerFontColor,
      textAlign: "center",
    },

    passaroCarouselContainer:{
      backgroundColor: carouselContainerBackground,
      width: "100%",
      aspectRatio: "16 / 9",
    },
    
    passaroCarouselImage:{
      width: "100%",
      aspectRatio: "16 / 9",
      resizeMode: "contain",
    },

    passaroCarouselPaginationBar:{
      width: "100%",
      backgroundColor: carouselPaginationBar,
      padding: 5,
      boxShadow: "3px 3px 20px #00000077",
    },

    passaroCarouselPagination:{
      border: 0,
      gap: 5,
    },

    passaroCarouselPaginationDot:{
      backgroundColor: "#f0f0f0",
      borderRadius: 15,
      border: 0,
    },

    passaroCarouselPaginationActiveDot:{
      backgroundColor: "#308050",
    },

    artigoInfoContainer:{
      width: "100%",
      minHeight: 200,
      backgroundColor: artigoInfoColor,
      padding: 15,
      paddingTop: 18,
      borderBottomWidth: 1,
      borderColor: "#55555555",
      display: "flex",
      flexDirection: "column",
    },

    artigoNomesContainer:{
      width: "100%",
      flex: 1,
    },

    artigoNomePopular:{
      fontSize: 35,
      fontWeight: "bold",
      color: boldFontColor,
      textWrap: "stable",
    },

    artigoNomeBinomial:{
      fontSize: 20,
      fontStyle: "italic",
      color: fontColor,
      marginBottom: 10,
    },

    artigoEnvergadura:{
      color: fontColor,
    },

    estadoConservacaoContainer:{
      justifySelf: "flex-end",
      display: "flex",
      flexDirection: "row",
    },

    estadoConservacaoBadge:{
      width: 55,
      height: 45,
      marginLeft: 3,
      marginBottom: 8,
      borderRadius: "25%",
      backgroundColor: "#333333",
      justifyContent: "center",
      textAlign: "center",
      alignItems: "center",
      boxShadow: "2px 5px 10px #00000033",
    },

    estadoConservacaoSigla:{
      color: "#f0f0f0",
      fontWeight: "bold",
      fontSize: 32,
    },

    estadoConservacaoNomes:{
      marginLeft: 15,
    },

    estadoConservacaoEnglish:{
      color: boldFontColor,
      fontWeight: "bold",
      fontStyle: "italic",
      fontSize: 20,
    },

    estadoConservacaoPortuguese:{
      color: fontColor,
      fontSize: 16,
    },

    artigoDescricaoContainer:{
      padding: 15,
    },

    artigoDescricaoTitle:{
      color: boldFontColor,
      fontWeight: "bold",
      fontSize: 28,
    },

    artigoDescricao:{
      color: fontColor,
      fontSize: 18,
      marginLeft: 5,
      marginTop: 5,
    },

    artigoCantoContainer:{
      padding: 15,
    },

    artigoCantoTitleContainer:{
      alignItems: "center",
      flexDirection: "row",
    },

    ouvirCantoIcon:{
      textAlign: "center",
      color: boldFontColor,
      fontWeight: "bold",
      fontSize: 40,
    },

    cantoPlayer:{
      display: "flex",
      flexDirection: "row",
      width: "100%",
      height: 60,
      backgroundColor: cantoPlayerColor,
      borderRadius: 20,
      marginTop: 15,
      padding: 5,
      alignItems: "center",
      boxShadow: "3px 3px 20px #00000033",
    },

    playerButtonContainer:{
      minWidth: 50,
      width: "15%",
      marginLeft: 12,
    },

    playerProgressBarContainer:{
      width: "80%",
    },

    playerProgressBar:{
      width: "100%",
      height: 60,
    },

    artigoAvistamentosContainer:{
      width: "100%",
      minHeight: 300,
      backgroundColor: artigoInfoColor,
      padding: 15,
      paddingTop: 18,
      borderTopWidth: 1,
      borderColor: "#55555555",
      display: "flex",
      flexDirection: "column",
      marginTop: 20,
    },

    artigoAvistamentosTitleContainer:{
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      width: "100%",
      paddingRight: 25,
    },

    artigoAvistamentosTitle:{
      color: boldFontColor,
      fontWeight: "bold",
      fontSize: 35,
    },

    artigoAvistamentosIcon:{
      textAlign: "center",
      color: boldFontColor,
      fontWeight: "bold",
      fontSize: 40,
    },

    artigoAvistamentosInnerContainer:{
      width: "100%",
      borderRadius: 20,
      marginTop: 15,
      backgroundColor: avistamentosInnerContainerColor,
      padding: 10,
      boxShadow: "3px 3px 20px #00000033",
      flexDirection: "row",
      justifyContent: "space-between",
    },

    avistamentosTotaisContainer:{
      width: "75%",
    },

    gotoAvistamentosIconContainer:{
      flexDirection: "row",
      width: "10%",
      minWidth: 80,
      marginRight: 5,
    },

    gotoAvistamentosIcon:{
      color: fontColor,
      fontSize: 80,
      alignSelf: "center",
    },

    avistamentosTotaisImagem:{
      width: "100%",
      height: 50,
      backgroundColor: "#99ff9988",
      borderRadius: 20,
      justifyContent: "center",
      alignItems: "center",
      marginTop: 5,
    },

    avistamentosTotaisAudio:{
      width: "100%",
      height: 50,
      backgroundColor: "#ff999988",
      borderRadius: 20,
      justifyContent: "center",
      alignItems: "center",
      marginTop: 5,
    },

    avistamentosTotaisVideo:{
      width: "100%",
      height: 50,
      backgroundColor: "#9999ff88",
      borderRadius: 20,
      justifyContent: "center",
      alignItems: "center",
      marginTop: 5,
    },

    avistamentosTotaisIcon:{
      fontSize: 28,
      color: fontColor,
    },

    avistamentosTotais:{
      fontSize: 28,
      fontWeight: "bold",
      color: fontColor,
    },

    vectorIcon:{
      color: fontColor,
      textAlign: "center",
    },
  })
}

const lightTheme = setThemeColors("light");
const darkTheme = setThemeColors("dark");

export {lightTheme, darkTheme};
