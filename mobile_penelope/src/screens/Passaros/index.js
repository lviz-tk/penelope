import React, { useState, useEffect, useRef } from "react";
import {
  ScrollView,
  Text,
  TextInput,
  View,
  TouchableOpacity,
  ImageBackground,
  RefreshControl,
  Appearance,
} from "react-native";
import { Image } from 'expo-image';
import { SafeAreaView } from 'react-native-safe-area-context';
import { SimpleGrid } from 'react-native-super-grid';
import { useNavigation } from "@react-navigation/core";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";

import api from "../../../services/api";
import url from "../../../services/url";
import { darkTheme, lightTheme } from "./style";

import SelectPopup from "../../components/SelectPopup"
import Load from "../../components/Load"

const Passaros = () => {
  const navigation = useNavigation();
  const [styles, setStyles] = useState(() => {
    const theme = Appearance.getColorScheme();
    if (theme === "light") {
      return lightTheme;
    }
    else {
      return darkTheme;
    }
  });

  const [isLoading, setIsLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const selectPopupRef = useRef(null);

  const [searchText, setSearchText] = useState("");
  const [searchFilter, setSearchFilter] = useState([]);
  const [sortAscending, setSortAscending] = useState(true);
  const [sortByAscendingIcon, setSortByAscendingIcon] = useState("caret-up");
  const [sortByFavorite, setSortByFavorite] = useState(false);
  const [sortByFavoriteIcon, setSortByFavoriteIcon] = useState("star-outline");
  const [sortByType, setSortByType] = useState("nome_popular");
  const [toggleGridViewIcon, setToggleGridViewIcon] = useState("grid-view");

  const [passaroList, setPassaroList] = useState([]);
  const [favoritePassaroList, setFavoritePassaroList] = useState([]);
  const [filteredPassaroList, setFilteredPassaroList] = useState([]);
  const [passaroListView, setPassaroListView] = useState((<Text></Text>));
  const [passaroListViewStyle, setPassaroListViewStyle] = useState("grid");
  const [passaroListViewItems, setPassaroListViewItems] = useState();
  const [passaroCounter, setPassaroCounter] = useState(0);

  const onRefresh = () => {
    setRefreshing(true);
    updatePassaroList();
  }

  async function updatePassaroList() {
    try {
      const request = await api.get("backend_penelope/search_passaro.php");

        console.log("Response:");
        console.log(request.data);

      let list = request.data.passaro;
      list = list.map((item, index) => {
        item.favorite = false;
        return item
      })
      console.log(request.data);
      console.log(request.data.passaro);

      setPassaroList(list);
    }
    catch (error) {
      console.log("Request error: " + error);
    }
    finally {
      setIsLoading(false);
      setRefreshing(false);
    }
  }

  function displayPassaroList() {
    setPassaroCounter(filteredPassaroList.length);

    if (passaroListViewStyle === "list") {
      setPassaroListViewItems(filteredPassaroList.map((item, index) => (
        <TouchableOpacity
          key={item.passaro_id}
          style={[
            styles.listRow,
            index % 2 === 0 ? styles.rowEven : styles.rowOdd
          ]}
          onPress={() => {
            navigation.navigate("Artigo", {
              passaro_id: item.passaro_id
            });
          }}
        >
          <Image style={styles.listImagePreview} source={{ uri: url + item.img_passaro_preview_url }} />
          <View style={styles.listPassaroInfo}>

            <Text style={styles.listNomePopularText}>{item.nome_popular}</Text>

            <View style={styles.listMiscInfo}>
              <Text style={styles.listNomeBinomialText}>{item.nome_binomial}</Text>
              <View style={[styles.listEstadoConservacaoBadge, { backgroundColor: estadoConservacaoBadgeColor(item.estado_conservacao) }]}>
                <Text style={styles.listEstadoConservacaoText}>{item.estado_conservacao}</Text>
              </View>
              <Text style={styles.listEnvergaduraText}>{item.envergadura_cm} cm</Text>
            </View>

          </View>
          <TouchableOpacity
            style={styles.listFavoritePassaroButton}
            onPress={() => toggleFavoritePassaro(item.passaro_id)}
          >
            {favoritePassaroIcon(item.passaro_id)}
          </TouchableOpacity>
        </TouchableOpacity>
      )))
    }
    else if (passaroListViewStyle === "grid") {
      setPassaroListViewItems(filteredPassaroList.map((item, index) => (
        <TouchableOpacity
          key={item.passaro_id}
          onPress={() => {
            navigation.navigate("Artigo", {
              passaro_id: item.passaro_id
            });
          }}
          style={styles.gridItem}
        >
          <ImageBackground style={styles.gridImage} imageStyle={styles.gridImage} source={{ uri: url + item.img_passaro_url }}>
            <View style={styles.gridGradient}>
              <View style={styles.gridUpperInfo}>
                <Text style={styles.gridNomePopularText}>{item.nome_popular}</Text>
                <Text style={styles.gridNomeBinomialText}>{item.nome_binomial}</Text>
              </View>

              <View style={styles.gridBottomInfo}>
                <View style={styles.gridMiscInfo}>
                  <View style={[styles.gridEstadoConservacaoBadge, { backgroundColor: estadoConservacaoBadgeColor(item.estado_conservacao) }]}>
                    <Text style={styles.gridEstadoConservacaoText}>{item.estado_conservacao}</Text>
                  </View>
                  <Text style={styles.gridEnvergaduraText}>{item.envergadura_cm} cm</Text>
                </View>

                <TouchableOpacity
                  style={styles.gridFavoritePassaroButton}
                  onPress={() => toggleFavoritePassaro(item.passaro_id)}
                >
                  {favoritePassaroIcon(item.passaro_id)}
                </TouchableOpacity>
              </View>
            </View>

          </ImageBackground>
        </TouchableOpacity>
      )))
    }
  }

  function estadoConservacaoBadgeColor(estadoConservacao) {
    let badgeColor = "";
    switch (estadoConservacao) {
      case "LC":
        badgeColor = "#217944";
        break;
      case "NT":
        badgeColor = "#006666";
        break;
      case "VU":
        badgeColor = "#cd9a00";
        break;
      case "EN":
        badgeColor = "#cc6630";
        break;
      case "CR":
        badgeColor = "#cd3030";
        break;
      case "EW":
        badgeColor = "#050505";
        break;
      case "EX":
        badgeColor = "#050505";
        break;
    }
    return badgeColor;
  }

  function favoritePassaroIcon(passaro_id) {
    for (let i = 0; i < passaroList.length; i++) {
      if (passaroList[i].passaro_id === passaro_id) {
        if (passaroListViewStyle === "list") {
          if (passaroList[i].favorite) {
            return (<Ionicons name="star" size={40} style={styles.vectorIcon} />);
          }
          else {
            return (<Ionicons name="star-outline" size={40} style={styles.vectorIcon} />);
          }
        }
        else if (passaroListViewStyle === "grid") {
          if (passaroList[i].favorite) {
            return (<Ionicons name="star" size={40} style={styles.vectorIconLight} />);
          }
          else {
            return (<Ionicons name="star-outline" size={40} style={styles.vectorIconLight} />);
          }
        }
      }
    }
  }

  function toggleSortByFavorite() {
    if (sortByFavorite) {
      setSortByFavorite(false)
      setSortByFavoriteIcon("star-outline");
    }
    else {
      setSortByFavorite(true)
      setSortByFavoriteIcon("star");
    }
  }

  function toggleAscending() {
    if (sortAscending) {
      setSortAscending(false)
      setSortByAscendingIcon("caret-down");
    }
    else {
      setSortAscending(true)
      setSortByAscendingIcon("caret-up");
    }
  }

  function toggleGridView() {
    if (passaroListViewStyle === "list") {
      setPassaroListViewStyle("grid");
      setToggleGridViewIcon("grid-view");
    }
    else if (passaroListViewStyle === "grid") {
      setPassaroListViewStyle("list");
      setToggleGridViewIcon("list");
    }
  }

  function toggleFavoritePassaro(passaro_id) {
    setPassaroList(passaroList.map((item, index) => {
      if (item.passaro_id === passaro_id) {
        item.favorite = !item.favorite;
      }
      return item;
    }));
  }

  useEffect(() => {
    if (passaroListViewStyle === "list") {
      setPassaroListView(<View>{passaroListViewItems}</View>);
    }
    else if (passaroListViewStyle === "grid") {
      setPassaroListView(
        <SimpleGrid
          itemDimension={130}
          maxItemsPerRow={2}
          spacing={10}
          data={passaroListViewItems}
          renderItem={({ item, index }) => (<View>{item}</View>)}
        />
      );
    }
  }, [passaroListViewItems]);

  useEffect(() => {
    const theme = Appearance.getColorScheme();
    if (theme === "light") {
      setStyles(lightTheme);
    }
    else {
      setStyles(darkTheme);
    }

    Appearance.addChangeListener(() => {
      const theme = Appearance.getColorScheme();
      if (theme === "light") {
        setStyles(lightTheme);
      }
      else {
        setStyles(darkTheme);
      }
    });
  }, []);


  useEffect(() => {
    updatePassaroList();
  }, []);

  useEffect(() => {
    let list = [...passaroList];

    if (sortByFavorite) {
      list = list.filter(item => item.favorite)
    }

    if (searchText !== "") {
      if (sortByType)
        list = list.filter(item =>
          item.nome_popular.toLowerCase().includes(searchText.toLowerCase()) ||
          item.nome_binomial.toLowerCase().includes(searchText.toLowerCase())
        );
    }

    list.sort((a, b) => {
      if (!sortAscending) {
        let x = a;
        a = b;
        b = x;
      }

      switch (sortByType) {
        case "nome_popular":
          return a.nome_popular.localeCompare(b.nome_popular);
        case "nome_binomial":
          return a.nome_binomial.localeCompare(b.nome_binomial);
        case "envergadura_cm":
          return a.envergadura_cm.localeCompare(b.envergadura_cm);
        case "estado_conservacao":
          return a.estado_conservacao.localeCompare(b.estado_conservacao);
        default:
      }
    });

    setFilteredPassaroList(list);
  }, [searchText, searchFilter, sortAscending, sortByFavorite, sortByType, passaroListViewStyle, passaroList]);

  useEffect(() => {
    displayPassaroList();
  }, [filteredPassaroList]);

  return (
    <View style={styles.mainView}>
      <ScrollView
        style={styles.mainScrollView}
        nestedScrollEnabled={true}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        <SafeAreaView
          style={styles.headerSafeArea}
          edges={["top", "right", "left"]}
        >
          <View
            style={styles.topHeader}
          >
            <View style={styles.searchBar}>
              <View style={styles.searchBarIcon}>
                <MaterialIcons name="search" size={30} style={styles.vectorIcon} />
              </View>
              <TextInput
                placeholder="Pesquisar por nome"
                onChangeText={setSearchText}
                value={searchText}
                style={styles.searchBarInput}
              />
            </View>

            <TouchableOpacity
              style={styles.filterButton}
              onPress={() => {
              }}
            >
              <MaterialIcons name="filter-alt" size={40} style={styles.vectorIcon} />
            </TouchableOpacity>
          </View>

          <View style={styles.sortHeader}>
            <Text style={styles.passarosExibidos}>Pássaros exibidos: {passaroCounter}</Text>

            <TouchableOpacity
              style={styles.sortByButton}
              onPress={toggleSortByFavorite}
            >
              <Ionicons name={sortByFavoriteIcon} size={30} style={styles.vectorIcon} />
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.sortByButton}
              onPress={toggleAscending}
            >
              <Ionicons name={sortByAscendingIcon} size={30} style={styles.vectorIcon} />
            </TouchableOpacity>

            <SelectPopup
              options={[
                { label: "Nome Popular", value: "nome_popular" },
                { label: "Nome Binomial", value: "nome_binomial" },
                { label: "Estado de Conservação", value: "estado_conservacao" },
                { label: "Envergadura", value: "envergadura_cm" },
              ]}
              variable={sortByType}
              setVariable={setSortByType}
              ref={selectPopupRef}
            />
            <TouchableOpacity
              style={styles.sortByButton}
              onPress={() => { selectPopupRef.current.open() }}
            >
              <MaterialIcons name="sort-by-alpha" size={30} style={styles.vectorIcon} />
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.sortByButton}
              onPress={toggleGridView}
            >
              <MaterialIcons name={toggleGridViewIcon} size={30} style={styles.vectorIcon} />
            </TouchableOpacity>
          </View>
        </SafeAreaView>


        <ScrollView style={styles.listScrollView}>
          {isLoading ? <Load /> : passaroListView}
        </ScrollView>
      </ScrollView>
    </View>
  );
}

export default Passaros;
