import React, { useState, useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, Modal, ScrollView, KeyboardAvoidingView, Platform, StatusBar } from 'react-native';
import { Button, ListItem } from 'react-native-elements';
import { FontAwesome } from '@expo/vector-icons';
import ImageView from 'react-native-image-viewing';
import { TextInput } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import vegetaux from './../data.json';
import LottieView from 'lottie-react-native';
import { ProgressBar } from 'react-native-paper';
import Animated, { withTiming, useSharedValue, useAnimatedStyle, opacity } from 'react-native-reanimated';
import ComponentButton from '../components/ComponentButton';
import { Keyboard } from 'react-native';



const imageMap = {
  "taxusBaccata": [
    { uri: Image.resolveAssetSource(require('./../assets/photos/taxusbaccatafeuille.png')).uri },
    { uri: Image.resolveAssetSource(require('./../assets/photos/Taxusbaccata1.jpg')).uri },
    { uri: Image.resolveAssetSource(require('./../assets/photos/Taxusbaccata2.jpg')).uri },
    { uri: Image.resolveAssetSource(require('./../assets/photos/Taxusbaccata3.jpg')).uri }
  ],
  "Epiceaabies": [
    { uri: Image.resolveAssetSource(require('./../assets/photos/Epiceaabiesarbre.png')).uri },
    { uri: Image.resolveAssetSource(require('./../assets/photos/Epiceaabies1.jpg')).uri },
    { uri: Image.resolveAssetSource(require('./../assets/photos/Epiceaabies2.jpg')).uri },
    { uri: Image.resolveAssetSource(require('./../assets/photos/Epiceaabies3.jpg')).uri }
  ],
  "Abiespinsapo": [
    { uri: Image.resolveAssetSource(require('./../assets/photos/abiespinsapofeuille.png')).uri },
    { uri: Image.resolveAssetSource(require('./../assets/photos/Abiespinsapo1.jpg')).uri },
    { uri: Image.resolveAssetSource(require('./../assets/photos/Abiespinsapo2.jpg')).uri },
    { uri: Image.resolveAssetSource(require('./../assets/photos/Abiespinsapo3.jpg')).uri }
  ],
  "Cedrusdeodora": [
    { uri: Image.resolveAssetSource(require('./../assets/photos/cedrusdeodarafeuille.png')).uri },
    { uri: Image.resolveAssetSource(require('./../assets/photos/Cedrusdeodara1.jpg')).uri },
    { uri: Image.resolveAssetSource(require('./../assets/photos/Cedrusdeodara2.jpg')).uri },
    { uri: Image.resolveAssetSource(require('./../assets/photos/Cedrusdeodara3.jpg')).uri }
  ],
  "Pinussylvestris": [
    { uri: Image.resolveAssetSource(require('./../assets/photos/pinussylvestrisfeuille.png')).uri },
    { uri: Image.resolveAssetSource(require('./../assets/photos/Pinussylvestris1.jpg')).uri },
    { uri: Image.resolveAssetSource(require('./../assets/photos/Pinussylvestris2.jpg')).uri },
    { uri: Image.resolveAssetSource(require('./../assets/photos/Pinussylvestris3.jpg')).uri }
  ],
  "Araucariaaraucana": [
    { uri: Image.resolveAssetSource(require('./../assets/photos/araucariaaraucanafeuille.png')).uri },
    { uri: Image.resolveAssetSource(require('./../assets/photos/Araucariaaraucana1.jpg')).uri },
    { uri: Image.resolveAssetSource(require('./../assets/photos/Araucariaaraucana2.jpg')).uri },
    { uri: Image.resolveAssetSource(require('./../assets/photos/Araucariaaraucana3.jpg')).uri }
  ],
  "Ginkgobiloba": [
    { uri: Image.resolveAssetSource(require('./../assets/photos/gingkofeuille.png')).uri },
    { uri: Image.resolveAssetSource(require('./../assets/photos/Ginkgobiloba1.jpg')).uri },
    { uri: Image.resolveAssetSource(require('./../assets/photos/Ginkgobiloba2.jpg')).uri },
    { uri: Image.resolveAssetSource(require('./../assets/photos/Ginkgobiloba3.jpg')).uri }
  ],
  "Prunuslaurocerasus": [
    { uri: Image.resolveAssetSource(require('./../assets/photos/prunuslaurocerasusfeuille.png')).uri },
    { uri: Image.resolveAssetSource(require('./../assets/photos/Prunuslaurocerasus1.jpg')).uri },
    { uri: Image.resolveAssetSource(require('./../assets/photos/Prunuslaurocerasus2.jpg')).uri },
    { uri: Image.resolveAssetSource(require('./../assets/photos/Prunuslaurocerasus3.jpg')).uri }
  ],
  "Aucubajaponica": [
    { uri: Image.resolveAssetSource(require('./../assets/photos/aucubajaponicafeuille.png')).uri },
    { uri: Image.resolveAssetSource(require('./../assets/photos/Aucubajaponica1.jpg')).uri },
    { uri: Image.resolveAssetSource(require('./../assets/photos/Aucubajaponica2.jpg')).uri },
    { uri: Image.resolveAssetSource(require('./../assets/photos/Aucubajaponica3.jpg')).uri }
  ],
  "Choisyaternata": [
    { uri: Image.resolveAssetSource(require('./../assets/photos/choisyaternatafeuille.png')).uri },
    { uri: Image.resolveAssetSource(require('./../assets/photos/Choisyaternata1.jpg')).uri },
    { uri: Image.resolveAssetSource(require('./../assets/photos/Choisyaternata2.jpg')).uri },
    { uri: Image.resolveAssetSource(require('./../assets/photos/Choisyaternata3.jpg')).uri }
  ],
  "Photinia": [
    { uri: Image.resolveAssetSource(require('./../assets/photos/photiniafeuille2.png')).uri },
    { uri: Image.resolveAssetSource(require('./../assets/photos/PhotiniaxfraseriRedRobin1.jpg')).uri },
    { uri: Image.resolveAssetSource(require('./../assets/photos/PhotiniaxfraseriRedRobin2.jpg')).uri },
    { uri: Image.resolveAssetSource(require('./../assets/photos/PhotiniaxfraseriRedRobin3.jpg')).uri }
  ],
  "Cotoneasterlacteus": [
    { uri: Image.resolveAssetSource(require('./../assets/photos/cotoneasterlacteusfeuille.png')).uri },
    { uri: Image.resolveAssetSource(require('./../assets/photos/Cotoneasterlacteus1.jpg')).uri },
    { uri: Image.resolveAssetSource(require('./../assets/photos/Cotoneasterlacteus2.jpg')).uri },
    { uri: Image.resolveAssetSource(require('./../assets/photos/Cotoneasterlacteus3.jpg')).uri }
  ],
  "Loniceranitida": [
    { uri: Image.resolveAssetSource(require('./../assets/photos/loniceranitidafeuille.png')).uri },
    { uri: Image.resolveAssetSource(require('./../assets/photos/Loniceranitida1.jpg')).uri },
    { uri: Image.resolveAssetSource(require('./../assets/photos/Loniceranitida2.jpg')).uri },
    { uri: Image.resolveAssetSource(require('./../assets/photos/Loniceranitida3.jpg')).uri }
  ],
  "Viburnumrhytidophyllum": [
    { uri: Image.resolveAssetSource(require('./../assets/photos/viburnumrhytidophyllumfeuille.png')).uri },
    { uri: Image.resolveAssetSource(require('./../assets/photos/Viburnumrhytidophyllum1.jpg')).uri },
    { uri: Image.resolveAssetSource(require('./../assets/photos/Viburnumrhytidophyllum2.jpg')).uri },
    { uri: Image.resolveAssetSource(require('./../assets/photos/Viburnumrhytidophyllum3.jpg')).uri }
  ],
  "Ilexaquifolium": [
    { uri: Image.resolveAssetSource(require('./../assets/photos/ilexaquifoliumfeuille.png')).uri },
    { uri: Image.resolveAssetSource(require('./../assets/photos/Ilexaquifolium1.jpg')).uri },
    { uri: Image.resolveAssetSource(require('./../assets/photos/Ilexaquifolium2.jpg')).uri },
    { uri: Image.resolveAssetSource(require('./../assets/photos/Ilexaquifolium3.jpg')).uri }
  ],
  "Mahoniaaquifolium": [
    { uri: Image.resolveAssetSource(require('./../assets/photos/mahoniaaquifoliumfeuille.png')).uri },
    { uri: Image.resolveAssetSource(require('./../assets/photos/Mahoniaaquifolium1.jpg')).uri },
    { uri: Image.resolveAssetSource(require('./../assets/photos/Mahoniaaquifolium2.jpg')).uri },
    { uri: Image.resolveAssetSource(require('./../assets/photos/Mahoniaaquifolium3.jpg')).uri }
  ],
  "Viburnumtinus": [
    { uri: Image.resolveAssetSource(require('./../assets/photos/viburnumtinusfeuille.png')).uri },
    { uri: Image.resolveAssetSource(require('./../assets/photos/Viburnumtinus1.jpg')).uri },
    { uri: Image.resolveAssetSource(require('./../assets/photos/Viburnumtinus2.jpg')).uri },
    { uri: Image.resolveAssetSource(require('./../assets/photos/Viburnumtinus3.jpg')).uri }
  ],
  "Euonymusjaponicus": [
    { uri: Image.resolveAssetSource(require('./../assets/photos/euonymusjaponicusfeuille.png')).uri },
    { uri: Image.resolveAssetSource(require('./../assets/photos/Euonymusjaponicus1.jpg')).uri },
    { uri: Image.resolveAssetSource(require('./../assets/photos/Euonymusjaponicus2.jpg')).uri },
    { uri: Image.resolveAssetSource(require('./../assets/photos/Euonymusjaponicus3.jpg')).uri }
  ],
  "Eleagnusxebbingei": [
    { uri: Image.resolveAssetSource(require('./../assets/photos/eleagnusebbingeifeuille.png')).uri },
    { uri: Image.resolveAssetSource(require('./../assets/photos/Eleagnusxebbingei1.jpg')).uri },
    { uri: Image.resolveAssetSource(require('./../assets/photos/Eleagnusxebbingei2.jpg')).uri },
    { uri: Image.resolveAssetSource(require('./../assets/photos/Eleagnusxebbingei3.jpg')).uri }
  ],
  "Cornusalba": [
    { uri: Image.resolveAssetSource(require('./../assets/photos/cornusalbafeuille.png')).uri },
    { uri: Image.resolveAssetSource(require('./../assets/photos/Cornusalba1.jpg')).uri },
    { uri: Image.resolveAssetSource(require('./../assets/photos/Cornusalba2.jpg')).uri },
    { uri: Image.resolveAssetSource(require('./../assets/photos/Cornusalba3.jpg')).uri }
  ],
  "Corylusavellana": [
    { uri: Image.resolveAssetSource(require('./../assets/photos/corylusavellanafeuille.png')).uri },
    { uri: Image.resolveAssetSource(require('./../assets/photos/Corylusavellana1.jpg')).uri },
    { uri: Image.resolveAssetSource(require('./../assets/photos/Corylusavellana2.jpg')).uri },
    { uri: Image.resolveAssetSource(require('./../assets/photos/Corylusavellana3.jpg')).uri }
  ],
  "Forsythia": [
    { uri: Image.resolveAssetSource(require('./../assets/photos/forsythiafeuille.png')).uri },
    { uri: Image.resolveAssetSource(require('./../assets/photos/Forsythiaxintermedia1.jpg')).uri },
    { uri: Image.resolveAssetSource(require('./../assets/photos/Forsythiaxintermedia2.jpg')).uri },
    { uri: Image.resolveAssetSource(require('./../assets/photos/Forsythiaxintermedia3.jpg')).uri }
  ],
  "Sambucusnigra": [
    { uri: Image.resolveAssetSource(require('./../assets/photos/sambucusnigrafeuille.png')).uri },
    { uri: Image.resolveAssetSource(require('./../assets/photos/Sambucusnigra1.jpg')).uri },
    { uri: Image.resolveAssetSource(require('./../assets/photos/Sambucusnigra2.jpg')).uri },
    { uri: Image.resolveAssetSource(require('./../assets/photos/Sambucusnigra3.jpg')).uri }
  ],
  "Hederahelix": [
    { uri: Image.resolveAssetSource(require('./../assets/photos/hederafeuille.png')).uri },
    { uri: Image.resolveAssetSource(require('./../assets/photos/Hederahelix1.jpg')).uri },
    { uri: Image.resolveAssetSource(require('./../assets/photos/Hederahelix2.jpg')).uri },
    { uri: Image.resolveAssetSource(require('./../assets/photos/Hederahelix3.jpg')).uri }
  ],
  "Carpinusbetulus": [
    { uri: Image.resolveAssetSource(require('./../assets/photos/carpinusfeuille2.png')).uri },
    { uri: Image.resolveAssetSource(require('./../assets/photos/Carpinusbetulus1.jpg')).uri },
    { uri: Image.resolveAssetSource(require('./../assets/photos/Carpinusbetulus2.jpg')).uri },
    { uri: Image.resolveAssetSource(require('./../assets/photos/Carpinusbetulus3.jpg')).uri }
  ],
  "Crataegusmonogyna": [
    { uri: Image.resolveAssetSource(require('./../assets/photos/crataegusfeuille.png')).uri },
    { uri: Image.resolveAssetSource(require('./../assets/photos/Crataegusmonogyna1.jpg')).uri },
    { uri: Image.resolveAssetSource(require('./../assets/photos/Crataegusmonogyna2.jpg')).uri },
    { uri: Image.resolveAssetSource(require('./../assets/photos/Crataegusmonogyna3.jpg')).uri }
  ],
  "Ligustrumvulgare": [
    { uri: Image.resolveAssetSource(require('./../assets/photos/ligustrumfeuille.png')).uri },
    { uri: Image.resolveAssetSource(require('./../assets/photos/Ligustrumvulgare1.jpeg')).uri },
    { uri: Image.resolveAssetSource(require('./../assets/photos/Ligustrumvulgare2.jpg')).uri },
    { uri: Image.resolveAssetSource(require('./../assets/photos/Ligustrumvulgare3.jpg')).uri }
  ],
  "Castaneasavita": [
    { uri: Image.resolveAssetSource(require('./../assets/photos/castaneafeuille.png')).uri },
    { uri: Image.resolveAssetSource(require('./../assets/photos/Castaneasativa1.jpg')).uri },
    { uri: Image.resolveAssetSource(require('./../assets/photos/Castaneasativa2.jpg')).uri },
    { uri: Image.resolveAssetSource(require('./../assets/photos/Castaneasativa3.jpg')).uri }
  ],
  "Aesculus": [
    { uri: Image.resolveAssetSource(require('./../assets/photos/aesculusxcarneafeuille.png')).uri },
    { uri: Image.resolveAssetSource(require('./../assets/photos/Aesculusxcarnea1.jpg')).uri },
    { uri: Image.resolveAssetSource(require('./../assets/photos/Aesculusxcarnea2.jpg')).uri },
    { uri: Image.resolveAssetSource(require('./../assets/photos/Aesculusxcarnea3.jpg')).uri }
  ],
  "Juglansregia": [
    { uri: Image.resolveAssetSource(require('./../assets/photos/juglansregiafeuille.png')).uri },
    { uri: Image.resolveAssetSource(require('./../assets/photos/Juglansregia1.jpg')).uri },
    { uri: Image.resolveAssetSource(require('./../assets/photos/Juglansregia2.jpg')).uri },
    { uri: Image.resolveAssetSource(require('./../assets/photos/Juglansregia3.jpg')).uri }
  ],
  "Acercampestris": [
    { uri: Image.resolveAssetSource(require('./../assets/photos/acercampestrisfeuille.png')).uri },
    { uri: Image.resolveAssetSource(require('./../assets/photos/Acercampestris1.jpg')).uri },
    { uri: Image.resolveAssetSource(require('./../assets/photos/Acercampestris2.jpg')).uri },
    { uri: Image.resolveAssetSource(require('./../assets/photos/Acercampestris3.jpg')).uri }
  ],
  "Tiliahenryana": [
    { uri: Image.resolveAssetSource(require('./../assets/photos/tiliahenryanafeuille.png')).uri },
    { uri: Image.resolveAssetSource(require('./../assets/photos/Tiliahenryana1.jpg')).uri },
    { uri: Image.resolveAssetSource(require('./../assets/photos/Tiliahenryana2.jpg')).uri },
    { uri: Image.resolveAssetSource(require('./../assets/photos/Tiliahenryana3.jpg')).uri }
  ],
  "Catalpa": [
    { uri: Image.resolveAssetSource(require('./../assets/photos/catalpabignonioïdesfeuille.png')).uri },
    { uri: Image.resolveAssetSource(require('./../assets/photos/Catalpabignonioïdes1.jpg')).uri },
    { uri: Image.resolveAssetSource(require('./../assets/photos/Catalpabignonioïdes2.jpg')).uri },
    { uri: Image.resolveAssetSource(require('./../assets/photos/Catalpabignonioïdes3.jpg')).uri }
  ],
  "Fraxinusexcelsior": [
    { uri: Image.resolveAssetSource(require('./../assets/photos/fraxinusexcelsiorfeuille.png')).uri },
    { uri: Image.resolveAssetSource(require('./../assets/photos/Fraxinusexcelsior1.jpg')).uri },
    { uri: Image.resolveAssetSource(require('./../assets/photos/Fraxinusexcelsior2.jpg')).uri },
    { uri: Image.resolveAssetSource(require('./../assets/photos/Fraxinusexcelsior3.jpg')).uri }
  ],
  "Robinia": [
    { uri: Image.resolveAssetSource(require('./../assets/photos/robiniapseudoacaciafeuille.png')).uri },
    { uri: Image.resolveAssetSource(require('./../assets/photos/Robiniapseudoacacia1.jpg')).uri },
    { uri: Image.resolveAssetSource(require('./../assets/photos/Robiniapseudoacacia2.jpg')).uri },
    { uri: Image.resolveAssetSource(require('./../assets/photos/Robiniapseudoacacia3.jpg')).uri }
  ],
  "Liriodendron": [
    { uri: Image.resolveAssetSource(require('./../assets/photos/liriodendrontulipiferafeuille.png')).uri },
    { uri: Image.resolveAssetSource(require('./../assets/photos/Liriodendrontulipifera1.jpg')).uri },
    { uri: Image.resolveAssetSource(require('./../assets/photos/Liriodendrontulipifera2.jpg')).uri },
    { uri: Image.resolveAssetSource(require('./../assets/photos/Liriodendrontulipifera3.jpg')).uri }
  ],
  "Salixbabylonica": [
    { uri: Image.resolveAssetSource(require('./../assets/photos/salixbabylonicafeuille.png')).uri },
    { uri: Image.resolveAssetSource(require('./../assets/photos/Salixbabylonica1.jpg')).uri },
    { uri: Image.resolveAssetSource(require('./../assets/photos/Salixbabylonica2.jpg')).uri },
    { uri: Image.resolveAssetSource(require('./../assets/photos/Salixbabylonica3.jpg')).uri }
  ],
  "Betula": [
    { uri: Image.resolveAssetSource(require('./../assets/photos/betulaverruquosafeuille.png')).uri },
    { uri: Image.resolveAssetSource(require('./../assets/photos/Betulaverruquosa1.jpg')).uri },
    { uri: Image.resolveAssetSource(require('./../assets/photos/Betulaverruquosa2.jpg')).uri },
    { uri: Image.resolveAssetSource(require('./../assets/photos/Betulaverruquosa3.jpg')).uri }
  ],
  "Fagussylvatica": [
    { uri: Image.resolveAssetSource(require('./../assets/photos/fagussylvaticafeuille.png')).uri },
    { uri: Image.resolveAssetSource(require('./../assets/photos/Fagussylvatica1.jpg')).uri },
    { uri: Image.resolveAssetSource(require('./../assets/photos/Fagussylvatica2.jpg')).uri },
    { uri: Image.resolveAssetSource(require('./../assets/photos/Fagussylvatica3.jpg')).uri }
  ],
  "Quercusrobur": [
    { uri: Image.resolveAssetSource(require('./../assets/photos/quercusroburfeuille.png')).uri },
    { uri: Image.resolveAssetSource(require('./../assets/photos/Quercusrobur1.jpg')).uri },
    { uri: Image.resolveAssetSource(require('./../assets/photos/Quercusrobur2.jpg')).uri },
    { uri: Image.resolveAssetSource(require('./../assets/photos/Quercusrobur3.jpg')).uri }
  ]
};



export default function GameScreen({ navigation }) {
  const scrollViewRef = useRef(null); // Référence pour le ScrollView
  const [visible, setIsVisible] = useState(false);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [currentPlantIndex, setCurrentPlantIndex] = useState(
    Math.floor(Math.random() * vegetaux.length)
  );
  const plant = vegetaux[currentPlantIndex]; // L'arbre actuel basé sur l'index
  const imageSource = plant.arbre ? imageMap[plant.arbre][0] : null;
  const [images, setImages] = useState([]); // Ajout de l'état pour les images
  const [nomBotanique, setNomBotanique] = useState(''); // État pour stocker la valeur de l'input
  const [nomVerniculaire, setNomVerniculaire] = useState(''); // État pour l'input Nom Verniculaire
  const [showLottie, setShowLottie] = useState(false);
  const [animationType, setAnimationType] = useState(null); // Ajout de l'état pour le type d'animation
  const [pointsVie, setPointsVie] = useState(100); // Points de vide l'utilisateur
  const [goodAnswersPoints, setGoodAnswersPoints] = useState([]); // Tableau pour stocker les points des bonnes réponses
  const [isGameOver, setIsGameOver] = useState(false);
  const [playerName, setPlayerName] = useState('');
  const [foundPlants, setFoundPlants] = useState([]);
  const [correctAnswers, setCorrectAnswers] = useState({ botanique: '', vernaculaire: '' });
  const [showWinnerLottie, setShowWinnerLottie] = useState(false);



  const addLifePoints = () => {
    console.log('addLifePoints a été appelé'); // Pour vérifier l'appel de la fonction

    setPointsVie(prevPoints => {
      const validPrevPoints = Math.floor(prevPoints); // S'assurer que prevPoints est un entier
      const newPoints = Math.min(validPrevPoints + 20, 100);
      console.log("Points de vie après ajout:", newPoints);
      return newPoints;
    });
  };

  const subtractLifePoints = () => {
    console.log('subtractLifePoints a été appelé'); // Pour vérifier l'appel de la fonction

    setPointsVie(prevPoints => {
      const validPrevPoints = Math.floor(prevPoints); // S'assurer que prevPoints est un entier
      const newPoints = Math.max(validPrevPoints - 20, 0); // Ne pas descendre en dessous de 0
      console.log("Points de vie après retrait:", newPoints);
      return newPoints;
    });
  };

  console.log(goodAnswersPoints);
  console.log(plant.arbre);

  // Initialiser la position à gauche hors de l'écran
  const animationPositionDown = useSharedValue(-300);

  // Créer une fonction qui génère une animation avec une durée spécifique
  const createAnimatedStyle = (duration) => {
    return useAnimatedStyle(() => {
      return {
        transform: [
          { translateX: withTiming(animationPositionDown.value, { duration }) }, // Animation gauche-droite
        ],
      };
    });
  };

  // Utiliser la fonction pour créer différents styles avec des durées variées
  const animatedStyleDown = createAnimatedStyle(200);
  const animatedStyleDown2 = createAnimatedStyle(250);
  const animatedStyleDown3 = createAnimatedStyle(300);
  const animatedStyleDown4 = createAnimatedStyle(350);
  const animatedStyleDown5 = createAnimatedStyle(400);

  useEffect(() => {
    // Déclencher l'animation lorsque le composant est monté
    animationPositionDown.value = 0; // Anime vers la position finale
  }, []);

  // Input Nom
  const animationPosition = useSharedValue(800); // Position initiale à 300 (en bas)

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        { translateY: withTiming(animationPosition.value, { duration: 400 }) }, // Animation de bas en haut
      ],
    };
  });

  // Animation Arbre/Feuille
  const positionX = useSharedValue(800); // Position de départ hors écran (à droite)

  const animatedStyleArbre = useAnimatedStyle(() => {
    return {
      transform: [
        { translateX: withTiming(positionX.value, { duration: 300 }) }, // Animation droite-gauche
      ],
    };
  });

  useEffect(() => {
    // Réinitialiser la position à droite avant de lancer l'animation
    positionX.value = 1500; // Repositionne hors écran à droite
    animationPositionDown.value = -300; // Repositionne hors écran vers le haut

    // Ajouter un délai d'apparition
    setTimeout(() => {
      // Animation horizontale vers le centre
      positionX.value = 0;

      // Animation verticale vers la position souhaitée
      animationPositionDown.value = 0; // (ou toute autre valeur pour le mouvement vertical)

    }, 400); // Petite pause pour éviter un effet instantané

  }, [currentPlantIndex]); // Déclenche chaque fois qu'une nouvelle plante est affichée



  useEffect(() => {
    if (isGameOver) {
      animationPosition.value = 0; // Lorsque le jeu est terminé, on anime vers le haut
    }
  }, [isGameOver]);

  const updateImages = () => {
    const currentPlant = vegetaux[currentPlantIndex];
    if (currentPlant && currentPlant.arbre) {
      const plantImages = imageMap[currentPlant.arbre];
      console.log('Images de la plante:', plantImages); // Doit afficher un tableau valide
      setImages(plantImages); // plantImages doit avoir le bon format
    }
  };

  // Calculer la somme des points de bonnes réponses
  const totalPoints = goodAnswersPoints.reduce((acc, points) => acc + Math.floor(points), 0);


  useEffect(() => {
    // Mettre à jour les images à chaque fois que la plante change
    updateImages();
  }, [currentPlantIndex]);


  const handleNextPlant = () => {
    const currentPlant = vegetaux[currentPlantIndex];
    const botaniquePoints = 10; // Valeur dynamique pour botanique
    const vernaculairePoints = 10; // Valeur dynamique pour vernaculaire

    let newPointsVie = pointsVie;
    let correctPoints = 0;

    // Ferme le clavier avant d'exécuter la logique
    Keyboard.dismiss();

    if (!currentPlant || !currentPlant.nameBotanique || !currentPlant.nameVerniculaire) {
      console.error('currentPlant invalide :', currentPlant);
      return;
    }

    // Vérification des réponses
    if (nomBotanique.trim().toLowerCase() === currentPlant.nameBotanique.toLowerCase()) {
      correctPoints += botaniquePoints;
    } else {
      newPointsVie -= botaniquePoints;
    }

    if (nomVerniculaire.trim().toLowerCase() === currentPlant.nameVerniculaire.toLowerCase()) {
      correctPoints += vernaculairePoints;
    } else {
      newPointsVie -= vernaculairePoints;
    }

    let updatedPointsVie = Math.max(0, Math.min(100, Math.floor(newPointsVie))); // Assurez-vous d'utiliser Math.floor ici
    setPointsVie(updatedPointsVie);

    // Si les points de vie tombent à 0, le jeu est terminé
    if (updatedPointsVie === 0) {
      setIsGameOver(true);  // Détecte la fin du jeu
      setShowLottie(true);  // Affiche l'animation de GameOver
      return;  // Sort de la fonction
    }

    setGoodAnswersPoints((prevPoints) => [...prevPoints, correctPoints]);

    // Ajoutez la gestion des bonnes réponses en cas d'erreur
    if (
      nomBotanique.trim().toLowerCase() !== currentPlant.nameBotanique.toLowerCase() ||
      nomVerniculaire.trim().toLowerCase() !== currentPlant.nameVerniculaire.toLowerCase()
    ) {
      // Mettez à jour les bonnes réponses dans l'état
      setCorrectAnswers({
        botanique: currentPlant.nameBotanique,
        vernaculaire: currentPlant.nameVerniculaire,
      });
    }

    // Déterminez si la réponse est bonne ou mauvaise pour jouer l'animation correspondante
    setAnimationType(
      nomBotanique.trim().toLowerCase() === currentPlant.nameBotanique.toLowerCase() &&
        nomVerniculaire.trim().toLowerCase() === currentPlant.nameVerniculaire.toLowerCase()
        ? 'good'
        : 'wrong'
    );

    setShowLottie(true);

    setTimeout(() => {
      setShowLottie(false);

      // Passez au prochain végétal
      setCurrentPlantIndex((prevIndex) => {
        let newIndex;

        const availableIndices = vegetaux
          .map((_, index) => index)
          .filter((index) => !foundPlants.includes(index));

        if (availableIndices.length === 0) {
          setIsGameOver(true);  // Si tous les végétaux ont été trouvés, le jeu est terminé
          return prevIndex;
        }

        do {
          newIndex = availableIndices[Math.floor(Math.random() * availableIndices.length)];
        } while (newIndex === prevIndex);

        return newIndex;
      });

      setNomBotanique(''); // Réinitialise les champs
      setNomVerniculaire('');
      updateImages();
      scrollViewRef.current?.scrollTo({ y: 0, animated: true });
    }, 6000);
  };



  useEffect(() => {
    console.log('foundPlants:', foundPlants.length);
    console.log('vegetaux.length:', vegetaux.length);
    if (foundPlants.length === vegetaux.length) {
      setIsGameOver(true);
      setShowWinnerLottie(true);  // Affiche l'animation de victoire
    }
  }, [foundPlants]);


  const openImage = (index) => {
    console.log('Index sélectionné dans les 3 dernières images:', index);
    setSelectedImageIndex(index);
    setIsVisible(true);
  };

  useEffect(() => {
    if (visible) {
      StatusBar.setHidden(true, 'fade'); // Masquer la barre de statut
    } else {
      StatusBar.setHidden(false, 'fade'); // Réafficher la barre de statut
    }
  }, [visible]);


  // useEffect(() => {
  //   setFoundPlants(vegetaux.map((_, index) => index)); // Simule que tous les végétaux sont trouvés
  // }, []);

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? undefined : undefined} // Testez sans comportement pour voir
      keyboardVerticalOffset={Platform.OS === 'ios' ? 80 : 0} // Ajustez la valeur ici
    >
      <ScrollView
        ref={scrollViewRef}
        contentContainerStyle={{ flexGrow: 1, paddingBottom: 0 }} // Évite l'espacement en bas
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.container}>
          <View style={styles.redSection}>
            <View style={styles.backgroundTop}>
              <View style={styles.listItem}>
                <Text style={styles.listTitle}>Identification</Text>
                <View style={styles.identiteetarbre}>
                  <View style={styles.listContainer}>

                    <Animated.View style={[animatedStyleDown, styles.animatedItem]}>
                      <ListItem containerStyle={{ backgroundColor: 'transparent', paddingBottom: 5 }}>
                        <FontAwesome name="leaf" size={25} marginTop="3" color={'#145952'} />
                        <ListItem.Content>
                          <ListItem.Title>Catégories</ListItem.Title>
                          <ListItem.Subtitle>{plant && plant.Catégories ? plant.Catégories : "Non défini"}</ListItem.Subtitle>
                        </ListItem.Content>
                      </ListItem>
                    </Animated.View>

                    <Animated.View style={[animatedStyleDown2, styles.animatedItem]}>
                      <ListItem containerStyle={{ backgroundColor: 'transparent', paddingBottom: 5, }}>
                        <FontAwesome name="pagelines" size={25} marginTop="3" color={'#145952'} />
                        <ListItem.Content>
                          <ListItem.Title>Bourgeons</ListItem.Title>
                          <ListItem.Subtitle>{plant && plant.Bourgeon ? plant.Bourgeon : "Non défini"}</ListItem.Subtitle>
                        </ListItem.Content>
                      </ListItem>
                    </Animated.View>

                    <Animated.View style={[animatedStyleDown3, styles.animatedItem]}>
                      <ListItem containerStyle={{ backgroundColor: 'transparent', paddingBottom: 5 }}>
                        <Icon name="leaf-maple" size={25} marginTop="3" color="#145952" />
                        <ListItem.Content>
                          <ListItem.Title>Bord de limbe</ListItem.Title>
                          <ListItem.Subtitle>{plant && plant.Limbe ? plant.Limbe : "Non défini"}</ListItem.Subtitle>
                        </ListItem.Content>
                      </ListItem>
                    </Animated.View>

                    <Animated.View style={[animatedStyleDown4, styles.animatedItem]}>
                      <ListItem containerStyle={{ backgroundColor: 'transparent', paddingBottom: 5 }}>
                        <Icon name="palette" size={25} marginTop="3" color="#145952" />
                        <ListItem.Content>
                          <ListItem.Title>Couleur</ListItem.Title>
                          <ListItem.Subtitle>
                            {plant && plant.Couleur ? (plant.Couleur.length > 50 ? plant.Couleur.substring(0, 30) + '...' : plant.Couleur) : "Non défini"}
                          </ListItem.Subtitle>
                        </ListItem.Content>
                      </ListItem>
                    </Animated.View>


                    <Animated.View style={[animatedStyleDown5, styles.animatedItem]}>
                      <ListItem containerStyle={{ backgroundColor: 'transparent', paddingBottom: 5 }}>
                        <FontAwesome name="bullseye" size={25} marginTop="3" marginRight="0" color={'#145952'} />
                        <ListItem.Content>
                          <ListItem.Title>Spécificité</ListItem.Title>
                          <ListItem.Subtitle>
                            {plant && plant.Spécial ? (plant.Spécial.length > 50 ? plant.Spécial.substring(0, 30) + '...' : plant.Spécial) : "Non défini"}
                          </ListItem.Subtitle>
                        </ListItem.Content>
                      </ListItem>
                    </Animated.View>

                  </View>
                  <Animated.View style={[styles.arbreContainer, animatedStyleArbre]}>
                    <Image
                      source={imageSource} // Charge l'image d'arbre dynamique
                      style={styles.imageArbre} // Ajoutez le style animé ici
                    />
                  </Animated.View>
                </View>
              </View>
            </View>
          </View>

          <View style={styles.blueSection}>
            <View style={styles.containerBonus}>
              <View style={styles.containerProgressBar}>
                <FontAwesome name="heart" size={17} marginRight="3" color={'#b00224'} />
                <ProgressBar
                  progress={pointsVie / 100} // Ex: Si pointsVie = 20, cela donne 0.5
                  color={pointsVie > 50 ? '#4CAF50' : pointsVie > 20 ? '#FF9800' : '#F44336'}
                  style={styles.progressBar}
                />
                <Text style={styles.pointsText}>{pointsVie}/100</Text> {/* Affichage du texte */}
              </View>
              <ComponentButton
                onAddLife={addLifePoints}
                onSubtractLife={subtractLifePoints}
                isGameOver={isGameOver}
              />
            </View>



            <Text style={styles.photosTitle}>Photos</Text>

            <View style={styles.containerPhotos}>
              {Array.isArray(images) && images.length > 0 ? (
                images.slice(-3).map((image, index) => {
                  const realIndex = images.length - 3 + index; // Calcule l'index réel
                  return (
                    <TouchableOpacity key={realIndex} onPress={() => openImage(index)}>
                      <Image source={image} style={styles.thumbnail} />
                    </TouchableOpacity>
                  );
                })
              ) : (
                <Text>Aucune image disponible</Text>
              )}
            </View>

            <ImageView
              images={images.slice(-3)}  // Seulement les 3 dernières images
              imageIndex={selectedImageIndex}  // Index de l'image actuellement ouverte
              visible={visible}  // État de la visibilité
              onRequestClose={() => setIsVisible(false)}  // Ferme la vue
            />
          </View>

          <View style={styles.greenSection}>
            <View style={styles.inputContainer}>
              <TextInput
                mode="outlined"
                label="Nom Botanique"
                placeholder="Nom Botanique"
                style={styles.input}
                activeOutlineColor="#1a776d"
                inactiveOutlineColor="#fff7dd"
                textColor="#1a776d"
                placeholderTextColor="#1a776d"
                value={nomBotanique} // Valeur liée à l'état
                onChangeText={setNomBotanique} // Met à jour l'état à chaque frappe
              />
              <TextInput
                mode="outlined"
                label="Nom Vernaculaire"
                placeholder="Nom Vernaculaire"
                style={styles.input}
                activeOutlineColor="#1a776d"
                inactiveOutlineColor="#fff7dd"
                textColor="#1a776d"
                placeholderTextColor="#1a776d"
                value={nomVerniculaire} // Liaison avec le state
                onChangeText={setNomVerniculaire} // Mise à jour du state à chaque frappe
              />
            </View>
            <TouchableOpacity style={styles.nextButton} onPress={handleNextPlant}>
              <Text style={styles.nextButtonText}>Valider</Text>
            </TouchableOpacity>

            <Modal
              animationType="fade"
              transparent={true}
              visible={showWinnerLottie}
              onRequestClose={() => setShowWinnerLottie(false)}
            >
              <View style={styles.modalContainerWinner}>
                <LottieView
                  source={require('./../assets/lottie/Winner2.json')}
                  autoPlay
                  loop={true}
                  style={styles.lottieAnimation}
                />
                <View style={styles.textContainerWinner}>
                  <Text style={styles.textWinner}>Félicitations, vous avez trouvé tous les végétaux ainsi que tous les parasites !</Text>
                </View>
                <View style={styles.inputGroup}>
                  <TextInput
                    placeholder="Entrez votre nom"
                    value={playerName}
                    onChangeText={setPlayerName}
                    style={styles.nameInput}
                    placeholderTextColor="#fff"
                    textColor="#fff"
                  />
                  <TouchableOpacity
                    onPress={() => {
                      console.log(playerName); // Ajouter un log pour voir ce qui est entré
                      navigation.navigate('Scores', { points: totalPoints, playerName });
                    }}
                    style={styles.submitButton}
                  >
                    <Text style={[styles.submitButtonText, { color: '#fff' }]}>Confirmer</Text>
                  </TouchableOpacity>

                </View>
              </View>
            </Modal>

            <Modal
              animationType="fade"
              transparent={true}
              visible={showLottie}
              onRequestClose={() => setShowLottie(false)}
            >

              <StatusBar
                translucent={true}
                backgroundColor={isGameOver ? '#fff7dd' : (animationType === 'good' ? '#8ad09e' : '#fff7dd')}
                barStyle={isGameOver ? 'dark-content' : 'light-content'}
              />

              <View
                style={[
                  styles.modalContainer,
                  { backgroundColor: isGameOver ? '#fff7dd' : (animationType === 'good' ? '#8ad09e' : '#fff7dd') },
                ]}
              >

                {isGameOver && (
                  <LottieView
                    source={require('./../assets/lottie/GameOver.json')}
                    autoPlay
                    loop={false}
                    style={styles.lottieAnimation}
                    speed={0.7}
                  />
                )}


                {!isGameOver && animationType === 'good' && (
                  <LottieView
                    source={require('./../assets/lottie/Good.json')}
                    autoPlay
                    loop={false}
                    style={styles.lottieAnimation}
                  />
                )}


                {!isGameOver && animationType === 'wrong' && (
                  <LottieView
                    source={require('./../assets/lottie/Wrong.json')}
                    autoPlay
                    loop={false}
                    style={styles.lottieAnimation}
                  />
                )}

                <Text style={styles.textValidation}>
                  {isGameOver
                    ? ''
                    : animationType === 'good'
                      ? 'Bravo, Vous avez correctement identifié le végétal !'
                      : ''}
                </Text>

                {/* Affichage des bonnes réponses uniquement si le jeu n'est pas terminé et en cas de mauvaise réponse */}
                {animationType === 'wrong' && !isGameOver && (
                  <>
                    <View style={styles.correctAnswersContainer}>
                      <Text style={styles.correctAnswerText}>Nom Botanique : </Text>
                      <Text style={[styles.correctAnswerText, { color: 'green', fontStyle: 'italic' }]}>
                        {correctAnswers.botanique}
                      </Text>
                    </View>

                    <View style={styles.correctAnswersContainer}>
                      <Text style={styles.correctAnswerText}>Nom Vernaculaire : </Text>
                      <Text style={[styles.correctAnswerText, { color: 'green', fontStyle: 'italic' }]}>
                        {correctAnswers.vernaculaire}
                      </Text>
                    </View>
                  </>
                )}


                {isGameOver && (
                  <View style={styles.inputGroup}>
                    <TextInput
                      placeholder="Entrez votre nom"
                      value={playerName}
                      onChangeText={setPlayerName}
                      style={styles.nameInput}
                      placeholderTextColor="#fff"
                      textColor="#fff"
                    />
                    <TouchableOpacity
                      onPress={() => {
                        navigation.navigate('Scores', { points: totalPoints, playerName });
                      }}
                      style={styles.submitButton}
                    >
                      <Text style={[styles.submitButtonText, { color: '#fff' }]}>Confirmer</Text>
                    </TouchableOpacity>

                  </View>
                )}
              </View>
            </Modal>
          </View>
        </View>
      </ScrollView >
    </KeyboardAvoidingView >
  );
}

const styles = StyleSheet.create({

  inputGroup: {
    width: '100%',
    alignItems: 'center', // Centrer les éléments horizontalement
    marginVertical: 10, // Espacement vertical autour du groupe
  },

  nameInputContainer: {
    alignItems: 'center',
    marginTop: 20,
  },

  identiteetarbre: {
    flexDirection: 'row',
  },

  nameInput: {
    flexDirection: 'row',
    backgroundColor: '#8ad09e',
    width: 300
  },

  submitButton: {
    flexDirection: 'row',
    backgroundColor: '#1a776d',
    width: 300,
    marginTop: 10,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    color: '#fff',
  },

  containerProgressBar: {
    flexDirection: 'row',
    alignItems: 'center', // Centrer les éléments verticalement
    justifyContent: 'center', // Centrer les éléments horizontalement
    height: 20, // Ajuster selon le besoin
    // Ne pas définir de largeur fixe si tu veux que cela s'adapte au contenu
  },

  progressBar: {
    height: 10, // Définir l'épaisseur de la barre
    borderTopRightRadius: 5, // Rendre les bords arrondis (optionnel)
    borderBottomRightRadius: 5,
    width: 250, // Prendre toute la largeur du parent
  },

  pointsText: {
    marginLeft: 10, // Espacement entre la barre et le texte
    fontSize: 16,
    fontWeight: 'bold',
    color: '#b00224', // Vous pouvez personnaliser la couleur ici
  },

  lottieAnimation: {
    width: 300,
    height: 300,
    alignSelf: 'center',
  },

  modalContainer: {
    width: '100%',
    height: '100%',  // S'assure que le modal prend toute la hauteur
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#8ad09e',
    position: 'absolute',  // Assure que le modal est en position absolue par rapport à son parent
    top: 0,  // Positionne en haut de l'écran
    left: 0,  // Positionne à gauche de l'écran
    zIndex: 1000,
  },

  textValidation: {
    fontFamily: 'Poppins-SemiBold',
    fontWeight: 'bold',
    color: '#fff7dd',
    fontSize: 16,
    textAlign: 'center'
  },

  container: {
    flex: 1,
    backgroundColor: '#fff7dd',
  },

  redSection: {
    flex: 5,
    zIndex: 0,
  },

  blueSection: {
    flex: 1.5,
    paddingLeft: 10,
    paddingRight: 10,
    marginTop: 55,
  },

  greenSection: {
    flex: 1.8,
    zIndex: 25,
    marginTop: 20,
  },

  backgroundTop: {
    top: 0,
    left: 0,
    width: '95%',
    height: '110%',
    backgroundColor: '#8ad09e',
    borderBottomRightRadius: 20,
    borderBottomLeftRadius: 20,
    zIndex: 1,
  },

  listContainer: {
    flexDirection: 'column',
    width: 170,
  },

  listItem: {
    width: '100%',
    marginLeft: 15,
    marginTop: 30,
    alignContent: 'flex-start'
  },

  listTitle: {
    fontFamily: 'Poppins-SemiBold',
    fontWeight: 'bold',
    color: '#fff7dd',
    fontSize: 16,
    textAlign: 'left',
  },

  descriptionContainer: {
    width: 200,
    marginLeft: 20,
  },

  descriptionTitle: {
    fontFamily: 'Poppins-SemiBold',
    fontWeight: 'bold',
    color: '#fff7dd',
    fontSize: 16,
  },

  description: {
    marginLeft: 20,

  },

  photosTitle: {
    fontFamily: 'Poppins-SemiBold',
    fontWeight: 'bold',
    color: '#ec693d',
    fontSize: 16,
    marginTop: 10,
    marginBottom: 10,
    marginLeft: 5,
  },

  containerPhotos: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  thumbnail: {
    width: 100,
    height: 100,
    borderRadius: 10,
  },

  inputContainer: {
    paddingLeft: 40,
    paddingRight: 40,
  },
  input: {
    backgroundColor: '#fff7dd',
  },

  arbreContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 20,
  },
  imageArbre: {
    width: '100%', // S'adapte à l'espace disponible
    height: undefined,
    aspectRatio: 0.7,
    resizeMode: 'cover',
  },

  nextButton: {
    backgroundColor: '#1a776d',
    padding: 10,
    marginTop: 5,
    marginBottom: 15,
    alignItems: 'center',
    borderRadius: 5,
    marginHorizontal: 40
  },

  nextButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold'
  },

  wrongTitle: {
    fontFamily: 'Poppins-SemiBold',
    fontWeight: 'bold',
    color: '#fff7dd',
    fontSize: 25,
    marginBottom: 10,
  },

  correctAnswersContainer: {
    marginTop: 10,
    padding: 10,
    backgroundColor: 'transparent',
    alignItems: 'center',
  },
  correctAnswerText: {
    fontSize: 20,
    color: '#145952',
    marginVertical: 5,
    fontWeight: 'bold',
  },
  modalContainerWinner: {
    flex: 1,
    justifyContent: 'center',  // Centrer l'animation et le texte
    alignItems: 'center',
    backgroundColor: '#fff7dd',  // Fond semi-transparent pour le modal
  },

  textContainerWinner: {
    fontFamily: 'Poppins-Bold',
    fontWeight: 'bold',
    color: '#fff7dd',
    padding: 10,
    marginBottom: 20,
  },
  textWinner: {
    fontSize: 22,
    color: '#145952',  // Couleur du texte
    textAlign: 'center',
  },
});
