import React, { useState, useRef } from "react";
import { StyleSheet, View, Image, TouchableOpacity, Modal, Animated, StatusBar, Text } from "react-native";
import { Video } from "expo-av";
import { useNavigation } from '@react-navigation/native';
import questions from "../questions.json";
import { Checkbox } from 'react-native-paper';

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
  });

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
    if (character === "Cindy") {
      videoFile = require("../assets/videos/lol3.mp4");
      setVideoSource(videoFile);
      setKey(key + 1);
      setIsVideoVisible(true);
      scaleAnim.setValue(1);
      translateAnim.setValue(0);

      // Ajouter une vie et passer à l'écran de jeu après la vidéo
      setCurrentQuestion(null);
      setIsQuestionModalVisible(false);
      return;
    }
    if (character === "Fred") {
      videoFile = require("../assets/videos/lol9.mp4");
    } else if (character === "Nicolas") {
      videoFile = require("../assets/videos/lol8.mp4");
    }

    setVideoSource(videoFile);
    setKey(key + 1);
    setIsVideoVisible(true);
    scaleAnim.setValue(1);
    translateAnim.setValue(0);

    if (character === "Fred" || character === "Nicolas") {
      const questionsForCharacter = questions[character.toLowerCase()];
      const randomIndex = Math.floor(Math.random() * questionsForCharacter.length);
      const selectedQuestion = questionsForCharacter[randomIndex];
      setCurrentQuestion(selectedQuestion);
    }
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
      const correctAnswers = currentQuestion.correctAnswer.split(",");
      const selectedOptionsArray = Array.isArray(selectedOption) ? selectedOption : [selectedOption];
      isCorrect = selectedOptionsArray.every((option) => correctAnswers.includes(option));
    } else {
      isCorrect = userAnswer.trim().toLowerCase() === currentQuestion.correctAnswer.toLowerCase();
    }

    setFeedback(isCorrect ? "correct" : "incorrect");

    setTimeout(() => {
      if (isCorrect) {
        onAddLife();
        playLifeGainAnimation(); // Déclenche l'animation de gain de vie
      } else {
        onSubtractLife();
        playLifeLossAnimation(); // Déclenche l'animation de perte de vie
      }
    }, 2000);

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

      <View style={styles.buttonContainer}>
        <View style={styles.buttonWrapper}>
          <TouchableOpacity
            style={styles.roundButton}
            onPress={() => handleFirstButtonPress("Cindy")}
            disabled={usedBonuses.Cindy} // Désactive le bouton si déjà utilisé
          >
            <Image
              source={
                usedBonuses.Cindy
                  ? require("../images/CindyBW.png") // Noir et blanc si utilisé
                  : require("../images/Cindy.png")   // Couleur si disponible
              }
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
              source={
                usedBonuses.Fred
                  ? require("../images/FredBW.png")
                  : require("../images/Fred.png")
              }
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
              source={
                usedBonuses.Nicolas
                  ? require("../images/NicolasBW.png")
                  : require("../images/Nicolas2.png")
              }
              style={styles.avatar}
            />
          </TouchableOpacity>
          <Text style={styles.nameText}>Nicolas</Text>
        </View>
      </View>
      {lifeGainTextVisible && (
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
          +10
        </Animated.Text>
      )}

      {lifeLossTextVisible && (
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
          -10
        </Animated.Text>
      )}
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
          style={[styles.questionModal, {
            opacity: questionOpacityAnim,
            transform: [{ translateY: modalTranslateYAnim }]
          }]}
        >
          <View style={styles.questionModal}>
            <Text style={styles.questionText}>{currentQuestion?.question}</Text>

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
              <Text style={styles.errorText}>{errorMessage}</Text>  // Affiche l'erreur
            ) : null}

            <TouchableOpacity style={styles.valider} onPress={handleAnswerSubmit}>
              <Text style={styles.validerText}>Valider</Text>
            </TouchableOpacity>
          </View>
        </Animated.View>
      </Modal>

    </View>
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
});
