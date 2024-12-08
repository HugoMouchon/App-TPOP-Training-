import React, { useState, useRef } from "react";
import { StyleSheet, View, Image, TouchableOpacity, Modal, Animated, StatusBar, Text } from "react-native";
import { Video } from "expo-av";
import { useNavigation } from '@react-navigation/native';
import questions from "../questions.json";
import { Checkbox } from 'react-native-paper';
import FredVideo from "../assets/videos/lol15.mp4";
import NicolasVideo from "../assets/videos/lol8.mp4";
import ThomasVideo from "../assets/videos/lol9.mp4";
import YannickVideo from "../assets/videos/lol10.mp4";

export default function ComponentButton({ onAddLife, onSubtractLife }) {
  const [isVideoVisible, setIsVideoVisible] = useState(false);
  const [key, setKey] = useState(0);
  const scaleAnim = useRef(new Animated.Value(1)).current;
  const translateAnim = useRef(new Animated.Value(0)).current;
  const navigation = useNavigation();
  const [videoSource, setVideoSource] = useState(null);
  const [isQuestionModalVisible, setIsQuestionModalVisible] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(null);
  const [selectedOption, setSelectedOption] = useState("");
  const [userAnswer, setUserAnswer] = useState("");
  const [feedback, setFeedback] = useState(null);
  const questionOpacityAnim = useRef(new Animated.Value(0)).current;
  const modalTranslateYAnim = useRef(new Animated.Value(200)).current; // Y translation for modal entrance and exit
  const [lifeGainAnim, setLifeGainAnim] = useState(new Animated.Value(0));
  const [lifeTextVisible, setLifeTextVisible] = useState(false);
  const [lifeTextPosition, setLifeTextPosition] = useState({ x: 0, y: 0 }); // Position for the life gain text
  const [lifeLossAnim] = useState(new Animated.Value(0));
  const [lifeLossTextVisible, setLifeLossTextVisible] = useState(false);
  const [lifeLossTextPosition, setLifeLossTextPosition] = useState({ x: 0, y: 0 });
  const [lifeGainTextVisible, setLifeGainTextVisible] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const [usedBonuses, setUsedBonuses] = useState({
    Cindy: false,
    Fred: false,
    Nicolas: false,
    Thomas: false,
    Yannick: false, // Ajout de Yannick
  });


  const thomasImages = {
    ardoise: require("../images/Paves/ardoise.png"),
    argile: require("../images/Paves/argile.jpg"),
    autoblocant: require("../images/Paves/autoblocant.png"),
    beton_drainant: require("../images/Paves/beton_drainant.png"),
    beton_presse: require("../images/Paves/beton_presse.png"),
    beton_vieilli: require("../images/Paves/beton_vieilli.png"),
    ecologique: require("../images/Paves/ecologique.png"),
    granit: require("../images/Paves/granit.png"),
    klinker: require("../images/Paves/klinker.png"),
    marbre_noir: require("../images/Paves/marbre_noir.png"),
    mosaique: require("../images/Paves/mosaique.png"),
    pierre_bleue: require("../images/Paves/pierre_bleue.png"),
    pierre_calcaire: require("../images/Paves/pierre_calcaire.png"),
    porphyre: require("../images/Paves/porphyre.png"),
    terre_cuite: require("../images/Paves/terre_cuite.png"),
    verre: require("../images/Paves/verre.png"),
  };

  const yannickImages = {
    anemometre: require("../images/arrosage/anemometre.png"),
    bouchon: require("../images/arrosage/bouchon.png"),
    buse: require("../images/arrosage/buse.png"),
    coude: require("../images/arrosage/coude.png"),
    crochet: require("../images/arrosage/crochet.png"),
    electrovanne: require("../images/arrosage/electrovanne.png"),
    goutteur: require("../images/arrosage/goutteur.png"),
    capteur_humidite: require("../images/arrosage/humidite.png"),
    module_programmateur: require("../images/arrosage/module.png"),
    pluviometre: require("../images/arrosage/pluviometre.png"),
    programmateur: require("../images/arrosage/programmateur.png"),
    regard: require("../images/arrosage/regard.png"),
    te: require("../images/arrosage/Te.png"),
    ruban_teflon: require("../images/arrosage/teflon.png"),
    turbine: require("../images/arrosage/turbine.png"),
    tuyere: require("../images/arrosage/tuyere.png"),
  };

  const shuffleArray = (array) => {
    return array
      .map((value) => ({ value, sort: Math.random() }))
      .sort((a, b) => a.sort - b.sort)
      .map(({ value }) => value);
  };


  const playLifeGainAnimation = () => {
    setLifeGainTextVisible(true);
    Animated.timing(lifeGainAnim, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    }).start(() => {
      setTimeout(() => {
        Animated.timing(lifeGainAnim, {
          toValue: 0,
          duration: 500,
          useNativeDriver: true,
        }).start(() => setLifeGainTextVisible(false));
      }, 500);
    });
  };

  const playLifeLossAnimation = () => {
    setLifeLossTextVisible(true);
    Animated.timing(lifeLossAnim, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    }).start(() => {
      setTimeout(() => {
        Animated.timing(lifeLossAnim, {
          toValue: 0,
          duration: 500,
          useNativeDriver: true,
        }).start(() => setLifeLossTextVisible(false));
      }, 500);
    });
  };

  const handleFirstButtonPress = (character) => {
    // Vérifier si le bonus a déjà été utilisé
    if (usedBonuses[character]) {
      alert(`${character} a déjà été utilisé !`);
      return;
    }

    // Marquer le bonus comme utilisé
    setUsedBonuses((prevState) => ({
      ...prevState,
      [character]: true,
    }));

    let videoFile;
    let imageForQuestion = null; // Variable pour l'image à afficher dans la question

    // Sélectionner la vidéo selon le personnage
    if (character === "Cindy") {
      videoFile = require("../assets/videos/lol3.mp4");
      setVideoSource(videoFile);
      setKey(key + 1);
      setIsVideoVisible(true);
      scaleAnim.setValue(1);
      translateAnim.setValue(0);
      setCurrentQuestion(null);
      setIsQuestionModalVisible(false);
      return;
    } else if (character === "Fred") {
      videoFile = FredVideo;
    } else if (character === "Nicolas") {
      videoFile = NicolasVideo;
    } else if (character === "Thomas") {
      videoFile = ThomasVideo;
    } else if (character === "Yannick") { // Ajout de Yannick
      videoFile = YannickVideo; // Assure-toi d'avoir une vidéo pour Yannick
    }

    if (videoFile) {
      setVideoSource(videoFile);
    }

    // Logique pour récupérer une question et son image pour Fred, Nicolas, Thomas, ou Yannick
    const questionsForCharacter = questions[character.toLowerCase()];
    const randomIndex = Math.floor(Math.random() * questionsForCharacter.length);
    const selectedQuestion = questionsForCharacter[randomIndex];

    // Vérifier si c'est Yannick et récupérer l'image correspondante
    if (character === "Yannick") {
      const imageKey = selectedQuestion.image;
      console.log("Clé de l'image Yannick:", imageKey);  // Log plus spécifique pour Yannick
      if (yannickImages[imageKey]) {
        imageForQuestion = yannickImages[imageKey];
        console.log("Image Yannick trouvée:", imageForQuestion);
      } else {
        console.warn(`Aucune image trouvée pour ${imageKey} dans yannickImages.`);
      }
    }

    if (character === "Thomas") {
      const imageKey = selectedQuestion.image;
      console.log("Clé de l'image:", imageKey);  // Vérification dans le log
      if (thomasImages[imageKey]) {
        imageForQuestion = thomasImages[imageKey];  // Charge l'image en utilisant la clé
        console.log("Image trouvée:", imageForQuestion);  // Vérification dans le log
      } else {
        console.warn(`Aucune image trouvée pour ${imageKey}. Vérifie la clé dans thomasImages.`);
      }
    }

    // Appliquer les animations
    setKey(key + 1);
    setIsVideoVisible(true);
    scaleAnim.setValue(1);
    translateAnim.setValue(0);

    // Ajouter l'image récupérée à la question
    setCurrentQuestion({
      ...selectedQuestion,
      options: shuffleArray(selectedQuestion.options), // Mélange les options
      image: imageForQuestion, // Ajoute l'image ici
    });

    // Vérification du changement d'état
    console.log("Question sélectionnée:", selectedQuestion);
    console.log("Image mise à jour dans la question:", imageForQuestion);
  };








  const handleVideoEnd = () => {
    Animated.parallel([
      Animated.timing(scaleAnim, {
        toValue: 12,
        duration: 100,
        useNativeDriver: true,
      }),
      Animated.timing(translateAnim, {
        toValue: -StatusBar.currentHeight,
        duration: 100,
        useNativeDriver: true,
      }),
    ]).start(() => {
      if (currentQuestion) {
        setTimeout(() => {
          setIsVideoVisible(false);
          Animated.timing(questionOpacityAnim, {
            toValue: 1,
            duration: 300,
            useNativeDriver: true,
          }).start(() => setIsQuestionModalVisible(true));

          Animated.timing(modalTranslateYAnim, {
            toValue: 0,
            duration: 300,
            useNativeDriver: true,
          }).start();
        }, 100);
      } else {
        // Ajouter une vie et lancer l'animation
        setIsVideoVisible(false);
        onAddLife();
        playLifeGainAnimation(); // Assurez-vous que l'animation est appelée
        navigation.navigate("Game");
      }
    });
  };


 const handleAnswerSubmit = () => {
  if (selectedOption === "" || (Array.isArray(selectedOption) && selectedOption.length === 0)) {
    setErrorMessage("Une réponse doit être obligatoirement choisie.");
    return; // Empêche de continuer si aucune option n'est sélectionnée
  }

  // Remettre le message d'erreur vide une fois une réponse choisie
  setErrorMessage("");

  let isCorrect = false;

  if (currentQuestion?.type === "trueFalse") {
    isCorrect = selectedOption.trim().toLowerCase() === currentQuestion.correctAnswer.toLowerCase();
  } else if (currentQuestion?.type === "multipleChoice") {
    // Correspondance pour les réponses multiples
    const correctAnswers = currentQuestion.correctAnswer.split(",").map((ans) => ans.trim().toLowerCase());
    const selectedOptionsArray = Array.isArray(selectedOption) 
      ? selectedOption.map((ans) => ans.trim().toLowerCase()) 
      : [selectedOption.trim().toLowerCase()];

    isCorrect = correctAnswers.length === selectedOptionsArray.length && 
                selectedOptionsArray.every((option) => correctAnswers.includes(option));
  } else {
    // Vérification pour les réponses ouvertes (textuelles)
    isCorrect = userAnswer.trim().toLowerCase() === currentQuestion.correctAnswer.toLowerCase();
  }

  setFeedback(isCorrect ? "correct" : "incorrect");

  // Déclenchement des animations
  setTimeout(() => {
    if (isCorrect) {
      onAddLife();
      playLifeGainAnimation(); // Animation de gain de vie
    } else {
      onSubtractLife();
      playLifeLossAnimation(); // Animation de perte de vie
    }
  }, 2000);

  // Réinitialisation et navigation après soumission
  setTimeout(() => {
    setIsQuestionModalVisible(false);
    setFeedback(null);
    setSelectedOption("");
    setUserAnswer("");
    navigation.navigate("Game");
  }, 1500);
};




  return (
    <View style={styles.container}>
      <StatusBar
        translucent={isVideoVisible}
        backgroundColor="#fff7dd"
        barStyle={isVideoVisible ? "light-content" : "dark-content"}
      />

      {/* Première ligne avec 3 boutons */}
      <View style={styles.buttonRow}>
        <View style={styles.buttonWrapper}>
          <TouchableOpacity
            style={styles.roundButton}
            onPress={() => handleFirstButtonPress("Cindy")}
            disabled={usedBonuses.Cindy}
          >
            <Image
              source={usedBonuses.Cindy ? require("../images/CindyBW.png") : require("../images/Cindy.png")}
              style={styles.avatar}
            />
          </TouchableOpacity>
          <Text style={styles.nameText}>Cindy</Text>
        </View>

        <View style={styles.buttonWrapper}>
          <TouchableOpacity
            style={styles.roundButton}
            onPress={() => handleFirstButtonPress("Fred")}
            disabled={usedBonuses.Fred}
          >
            <Image
              source={usedBonuses.Fred ? require("../images/FredBW.png") : require("../images/Fred.png")}
              style={styles.avatar}
            />
          </TouchableOpacity>
          <Text style={styles.nameText}>Fred</Text>
        </View>

        <View style={styles.buttonWrapper}>
          <TouchableOpacity
            style={styles.roundButton}
            onPress={() => handleFirstButtonPress("Nicolas")}
            disabled={usedBonuses.Nicolas}
          >
            <Image
              source={usedBonuses.Nicolas ? require("../images/NicolasBW.png") : require("../images/Nicolas2.png")}
              style={styles.avatar}
            />
          </TouchableOpacity>
          <Text style={styles.nameText}>Nicolas</Text>
        </View>
      </View>

      {/* Deuxième ligne avec 2 boutons */}
      <View style={[styles.buttonRow, { marginTop: 20 }]}>
        <View style={styles.buttonWrapper}>
          <TouchableOpacity
            style={styles.roundButton}
            onPress={() => handleFirstButtonPress("Thomas")}
            disabled={usedBonuses.Thomas}
          >
            <Image
              source={usedBonuses.Thomas ? require("../images/ThomasBW.png") : require("../images/Thomas.png")}
              style={styles.avatar}
            />
          </TouchableOpacity>
          <Text style={styles.nameText}>Thomas</Text>
        </View>

        <View style={styles.buttonWrapper}>
          <TouchableOpacity
            style={styles.roundButton}
            onPress={() => handleFirstButtonPress("Yannick")}
            disabled={usedBonuses.Yannick}
          >
            <Image
              source={usedBonuses.Yannick ? require("../images/YannickBW.png") : require("../images/Yannick.png")}
              style={styles.avatar}
            />
          </TouchableOpacity>
          <Text style={styles.nameText}>Yannick</Text>
        </View>

      </View>
      {
        lifeGainTextVisible && (
          <Animated.Text
            style={[
              styles.lifeGainText,
              {
                opacity: lifeGainAnim,
                transform: [
                  { translateY: lifeGainAnim.interpolate({ inputRange: [0, 1], outputRange: [30, -10] }) },
                ],
              },
            ]}
          >
            +20
          </Animated.Text>
        )
      }

      {
        lifeLossTextVisible && (
          <Animated.Text
            style={[
              styles.lifeLossText,
              {
                opacity: lifeLossAnim,
                transform: [
                  { translateY: lifeLossAnim.interpolate({ inputRange: [0, 1], outputRange: [30, -10] }) },
                ],
              },
            ]}
          >
            -20
          </Animated.Text>
        )
      }
      <Modal visible={isVideoVisible} transparent={true} animationType="slide" key={key}>
        <View style={styles.videoModal}>
          <Animated.View
            style={[styles.zoomWrapper, {
              transform: [
                { scale: scaleAnim },
                { translateY: translateAnim }
              ]
            }]}
          >
            <Video
              source={videoSource}
              rate={1.0}
              volume={1.0}
              isMuted={false}
              resizeMode="cover"
              shouldPlay
              style={styles.video}
              onPlaybackStatusUpdate={(status) => {
                if (status.didJustFinish) {
                  handleVideoEnd();
                }
              }}
            />
          </Animated.View>
        </View>
      </Modal>

      <Modal visible={isQuestionModalVisible} transparent={true} animationType="none">
        <Animated.View
          style={[styles.questionModal, { opacity: questionOpacityAnim, transform: [{ translateY: modalTranslateYAnim }] }]}
        >
          <View style={styles.questionModal}>
            {/* Affiche l'image si elle existe */}
            {currentQuestion?.image && (
              <Image source={currentQuestion.image} style={styles.modalImage} />
            )}

            <Text style={styles.questionText}>{currentQuestion?.question}</Text>

            {/* Options de réponse */}
            <View style={styles.optionsContainer}>
              {currentQuestion?.options.map((option, index) => {
                let optionStyle = styles.optionText;
                if (feedback) {
                  if (currentQuestion.correctAnswer.split(",").includes(option)) {
                    optionStyle = { ...optionStyle, color: "green", fontWeight: "bold" };
                  } else if (selectedOption.includes(option) || selectedOption === option) {
                    optionStyle = { ...optionStyle, color: "red", textDecorationLine: "line-through" };
                  }
                }

                return (
                  <View key={index} style={styles.checkboxWrapper}>
                    <Checkbox
                      disabled={feedback !== null}
                      status={
                        Array.isArray(selectedOption)
                          ? selectedOption.includes(option)
                            ? "checked"
                            : "unchecked"
                          : selectedOption === option
                            ? "checked"
                            : "unchecked"
                      }
                      onPress={() => {
                        if (feedback === null) {
                          if (Array.isArray(selectedOption)) {
                            setSelectedOption(
                              selectedOption.includes(option)
                                ? selectedOption.filter((o) => o !== option)
                                : [...selectedOption, option]
                            );
                          } else {
                            setSelectedOption(option);
                          }
                        }
                      }}
                      color="green"
                    />
                    <Text style={optionStyle}>{option}</Text>
                  </View>
                );
              })}
            </View>

            {errorMessage ? (
              <Text style={styles.errorText}>{errorMessage}</Text>
            ) : null}

            <TouchableOpacity style={styles.valider} onPress={handleAnswerSubmit}>
              <Text style={styles.validerText}>Valider</Text>
            </TouchableOpacity>
          </View>
        </Animated.View>
      </Modal>
    </View >
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff7dd",
    marginTop: 10,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "80%",
  },
  roundButton: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: "#fff7dd",
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 7,
  },
  avatar: {
    width: 70,
    height: 70,
    borderRadius: 35,
    resizeMode: 'contain'
  },

  buttonRow: {
    flexDirection: "row",
    justifyContent: "center", // Pour espacer les boutons uniformément
    gap: 20,
    width: "100%", // Pour occuper toute la largeur de l'écran
    paddingHorizontal: 10, // Optionnel, ajuste l'espacement entre les boutons
  },

  buttonWrapper: {
    alignItems: "center",
  },

  nameText: {
    marginTop: 3, // Ajoute un peu de marge pour l'espacement
    textAlign: 'center', // Centrer le texte horizontalement
    fontSize: 14, // Assure-toi que la taille du texte est appropriée
    fontWeight: 'bold',
    color: "#145952", // Assure-toi que la couleur du texte est visible
  },

  videoModal: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.8)",
  },
  zoomWrapper: {
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    height: "100%",
  },
  video: {
    width: "100%",
    height: "100%",
  },
  checkboxContainer: {
    marginTop: 20,
  },
  checkboxWrapper: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
    marginLeft: 70,
    marginRight: 20,
  },

  optionText: {
    flexWrap: 'wrap', // Permet de passer à la ligne
    width: '100%',    // Pour occuper toute la largeur de l'élément parent
    lineHeight: 20,   // Ajuste l'espacement entre les lignes
    textAlign: 'left', // Pour aligner le texte à gauche
    paddingRight: 70,
  },

  questionModal: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff7dd",
  },
  questionText: {
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
    marginLeft: 20,
    marginRight: 20,
    color: "#145952",
  },
  valider: {
    backgroundColor: '#145952',
    paddingVertical: 15,
    paddingHorizontal: 40,
    borderRadius: 10,
    marginTop: 10,
  },
  validerText: {
    color: '#fff7dd',
    fontSize: 15,
    fontWeight: 'bold',
    textAlign: 'center',
  },

  lifeGainText: {
    position: "absolute",
    top: -75, // Ajustez selon votre mise en page
    left: "50%",
    transform: [{ translateX: -50 }], // Centrer horizontalement
    fontSize: 30,
    fontWeight: "bold",
    color: "green",
  },

  lifeLossText: {
    position: "absolute",
    top: -75,  // Augmenter cette valeur pour déplacer le texte plus haut
    left: "50%",
    transform: [{ translateX: -50 }],  // Centrer horizontalement
    fontSize: 30,
    fontWeight: "bold",
    color: "red",  // Changer la couleur en rouge pour la perte de vie
  },

  errorText: {
    color: "red",
    fontSize: 14,
    marginBottom: 10,
    textAlign: "center",
    fontWeight: "bold",
  },

  modalImage: {
    width: 300, // Nouvelle largeur plus grande
    height: 250, // Nouvelle hauteur plus grande
    resizeMode: "contain",
    marginBottom: 20,
  },
});
