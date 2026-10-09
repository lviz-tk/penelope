import React, { useState, useEffect, useRef } from "react";
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
import { useNavigation } from "@react-navigation/core";
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import Carousel, { Pagination } from "react-native-reanimated-carousel";
import { useSharedValue } from "react-native-reanimated";
import { useAudioPlayer, useAudioPlayerStatus } from 'expo-audio';
import Slider from '@react-native-community/slider';

import api from "../../../services/api";
import url from "../../../services/url";
import { darkTheme, lightTheme } from "./style";

import Load from "../../components/Load"

const Artigo = ({route}) => {
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

  const [isLoading, setIsLoading] = useState(true);
  const [dimensionWidth, setDimensionWidth] = useState(Dimensions.get('window').width);
  const { passaro_id } = route.params;

  const carouselRef = useRef(null);
  const carouselProgress = useSharedValue(0);
  const carouselPaginationPress = (index: number) => {
    carouselRef.current?.scrollTo({
      count: index - carouselProgress.value,
      animated: true
    });
  };
  const handleCarouselProgress = (index: number) => {
    carouselProgress.value = index;
  }

  const [cantoFilepath, setCantoFilepath] = useState();
  const audioVisualizerRef = useRef(null);
  const audioPlayer = useAudioPlayer({uri: cantoFilepath});
  const audioPlayerStatus = useAudioPlayerStatus(audioPlayer);
  const [playerButtonIcon, setPlayerButtonIcon] = useState((<Ionicons name="play" size={40} style={styles.vectorIcon}/>));

  const [passaroImagens, setPassaroImagens] = useState([]);
  const [nomePopular, setNomePopular] = useState("");
  const [nomeBinomial, setNomeBinomial] = useState("");
  const [estadoConservacao, setEstadoConservacao] = useState("");
  const [envergadura, setEnvergadura] = useState(0);
  const [descricao, setDescricao] = useState("");
  const [avistamentoImgCount, setAvistamentoImgCount] = useState(0);
  const [avistamentoAudioCount, setAvistamentoAudioCount] = useState(0);
  const [avistamentoVideoCount, setAvistamentoVideoCount] = useState(0);

  async function updatePassaroArtigo(){
    try {
      const request = await api.get(`backend_penelope/get_passaro_artigo.php?passaro_id=${passaro_id}`);
      const artigo = request.data.artigo;

      let imagens = Object.values(artigo.img_passaro);
      setPassaroImagens(imagens);

      setNomePopular(artigo.nome_popular);
      setNomeBinomial(artigo.nome_binomial);
      setEstadoConservacao(artigo.estado_conservacao);
      setEnvergadura(artigo.envergadura_cm);
      setDescricao(artigo.passaro_descricao);
      setCantoFilepath(url + artigo.canto_filepath);
      setAvistamentoImgCount(artigo.avistamento_img_count);
      setAvistamentoAudioCount(artigo.avistamento_audio_count);
      setAvistamentoVideoCount(artigo.avistamento_video_count);
    }
    catch (error){
      console.log("Request error: " + error);
    }
    finally{
      setIsLoading(false);
    }
  }

  function estadoConservacaoView(){
    let englishText = "";
    let portugueseText = "";
    let badgeColor = "";

    switch (estadoConservacao){
      case "LC":
        englishText = "Least Concern";
        portugueseText = "Pouco Preocupante";
        badgeColor = "#217944";
        break;
      case "NT":
        englishText = "Near Threatened";
        portugueseText = "Quase ameaçado";
        badgeColor = "#006666";
        break;
      case "VU":
        englishText = "Vunerable";
        portugueseText = "Vunerável";
        badgeColor = "#cd9a00";
        break;
      case "EN":
        englishText = "Endangered";
        portugueseText = "Em perigo";
        badgeColor = "#cc6630";
        break;
      case "CR":
        englishText = "Critically Endangered";
        portugueseText = "Criticamente em perigo";
        badgeColor = "#cd3030";
        break;
      case "EW":
        englishText = "Extinct in the Wild";
        portugueseText = "Extinto na natureza";
        badgeColor = "#050505";
        break;
      case "EX":
        englishText = "Extinct";
        portugueseText = "Extinto";
        badgeColor = "#050505";
        break;
    }

    return (
      <View style={styles.estadoConservacaoContainer}>
        <View style={[styles.estadoConservacaoBadge, {backgroundColor: badgeColor}]}>
          <Text style={styles.estadoConservacaoSigla}>{estadoConservacao}</Text>
        </View>
        <View style={styles.estadoConservacaoNomes}>
          <Text style={styles.estadoConservacaoEnglish}>{englishText}</Text>
          <Text style={styles.estadoConservacaoPortuguese}>{portugueseText}</Text>
        </View>
      </View>
    );
  }

  function playerButtonPress(){
    if(audioPlayerStatus.didJustFinish){
      audioPlayer.seekTo(0);
      audioPlayer.play();
      setPlayerButtonIcon(<Ionicons name="pause" size={40} style={styles.vectorIcon}/>);
    }
    else if(audioPlayer.paused || !audioPlayer.playing){
      audioPlayer.play();
      setPlayerButtonIcon(<Ionicons name="pause" size={40} style={styles.vectorIcon}/>);
    }
    else{
      audioPlayer.pause();
      setPlayerButtonIcon(<Ionicons name="play" size={40} style={styles.vectorIcon}/>);
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
  })

  useEffect(() => {
    updatePassaroArtigo();
  }, []);

  useEffect(() => {
    const subscription = BackHandler.addEventListener( 'hardwareBackPress', () => {
      navigation.goBack();
    });
    subscription.remove();
  }, []);

  useEffect(() => {
    const subscription = Dimensions.addEventListener('change', ({ window }) => {
      setDimensionWidth(window.width);
    });
    return () => subscription.remove();
  }, []);

  useEffect(() => {
    if(audioPlayerStatus.didJustFinish){
      setPlayerButtonIcon(<Ionicons name="reload" size={40} style={styles.vectorIcon}/>);
      audioPlayer.pause();
    }
  }, [audioPlayerStatus.didJustFinish]);

  return (

    <View style={styles.mainView}>
      <SafeAreaView 
        style={styles.header}
        edges={["top", "right", "left"]}
      >
        <TouchableOpacity
          style={styles.headerButton}
          onPress={() => {navigation.goBack()}}
        >
          <MaterialIcons name="keyboard-return" size={40} style={styles.headerVectorIcon} />
        </TouchableOpacity>

        <Text style={styles.headerTitle}>{nomePopular}</Text>

        <TouchableOpacity
          style={styles.headerButton}
          onPress={() => {navigation.goBack()}}
        >
          <Ionicons name="star" size={40} style={styles.headerVectorIcon} />
        </TouchableOpacity>
      </SafeAreaView>

      {isLoading ? <Load /> :
        <ScrollView>
          <View style={styles.passaroCarouselContainer}>
            <Carousel
              ref={carouselRef}
              loop={false}
              autoplay={true}
              width={dimensionWidth}
              height={dimensionWidth * (16 / 9)}
              data={passaroImagens}
              onProgressChange={(_, absoluteProgress) => {handleCarouselProgress(Math.round(absoluteProgress));}}
              renderItem={({ item }) => (
                <Image source={{uri: url + item}} style={styles.passaroCarouselImage} />
              )}
            />
          </View>

          <View style={styles.passaroCarouselPaginationBar}>
            <Pagination.Basic
              progress={carouselProgress}
              data={passaroImagens}
              dotStyle={styles.passaroCarouselPaginationDot}
              activeDotStyle={styles.passaroCarouselPaginationActiveDot}
              containerStyle={styles.passaroCarouselPagination}
              onPress={carouselPaginationPress}
            />
          </View>

          <View style={styles.artigoInfoContainer}>
            <View style={styles.artigoNomesContainer}>
              <Text style={styles.artigoNomePopular}>{nomePopular}</Text>
              <Text style={styles.artigoNomeBinomial}>{nomeBinomial}</Text>
            </View>
            {estadoConservacaoView()}
          </View>

          <View style={styles.artigoDescricaoContainer}>
            <Text style={styles.artigoDescricaoTitle}>Sobre o Pássaro</Text>
            <Text style={styles.artigoDescricao}>{descricao}</Text>
          </View>

          <View style={styles.artigoCantoContainer}>
            <View style={styles.artigoCantoTitleContainer}>
              <Text style={styles.artigoDescricaoTitle}>Ouvir Canto </Text>
              <Ionicons name="volume-high" style={styles.ouvirCantoIcon}/>
            </View>

            <View style={styles.cantoPlayer}>
              <View style={styles.playerButtonContainer}>
                <TouchableOpacity
                  style={styles.playerButton}
                  onPress={playerButtonPress}
                >
                  {playerButtonIcon}
                </TouchableOpacity>
              </View>
              <View style={styles.playerProgressBarContainer}>
                <Slider
                  style={styles.playerProgressBar}
                  minimumValue={0}
                  maximumValue={audioPlayerStatus.duration}
                  value={audioPlayerStatus.currentTime}
                  onValueChange={(value) => {
                    if(audioPlayerStatus.didJustFinish){
                      setPlayerButtonIcon(<Ionicons name="play" size={40} style={styles.vectorIcon}/>);
                    }
                    audioPlayer.seekTo(value)
                  }}
                  minimumTrackTintColor={"#f0f0f0"}
                  maximumTrackTintColor={"#000000"}
                  thumbSize={32}
                  thumbTintColor={"#117656"}
                />
              </View>
            </View>
          </View>

          <View style={styles.artigoAvistamentosContainer}>
            <View style={styles.artigoAvistamentosTitleContainer}>
              <Text style={styles.artigoAvistamentosTitle}>Avistamentos</Text>
              <Ionicons name="eye" style={styles.artigoAvistamentosIcon}/>
            </View>

            <TouchableOpacity 
              style={styles.artigoAvistamentosInnerContainer}
              onPress={() => {
                navigation.navigate("AvistamentoLista", {
                  passaro_id: passaro_id,
                  nomePopular: nomePopular
                });
              }}
            >
              <View style={styles.avistamentosTotaisContainer}>

                <View style={styles.avistamentosTotaisImagem}>
                  <Text style={styles.avistamentosTotais}>
                    <Ionicons name="image" style={styles.avistamentosTotaisIcon}/> Imagens:  {avistamentoImgCount}
                  </Text>
                </View>

                <View style={styles.avistamentosTotaisAudio}>
                  <Text style={styles.avistamentosTotais}>
                    <Ionicons name="mic" style={styles.avistamentosTotaisIcon}/> Áudios: {avistamentoAudioCount}
                  </Text>
                </View>

                <View style={styles.avistamentosTotaisVideo}>
                  <Text style={styles.avistamentosTotais}>
                    <Ionicons name="play" style={styles.avistamentosTotaisIcon}/> Videos: {avistamentoVideoCount}
                  </Text>
                </View>

              </View>
              <View style={styles.gotoAvistamentosIconContainer}>
                <Ionicons name="log-in-outline" style={styles.gotoAvistamentosIcon}/>
              </View>
            </TouchableOpacity>

          </View>
        </ScrollView>
      }
    </View>
  );
}

export default Artigo;
