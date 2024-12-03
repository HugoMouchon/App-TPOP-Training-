import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, StatusBar } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { FontAwesome } from '@expo/vector-icons';
import BackgroundSvg from './../images/backgroundTop.svg'; // Importez le fichier SVG pour l'arrière-plan
import BottomLeftSvg from './../images/backgroundBottom.svg'; // Importez le fichier SVG que vous voulez en bas à gauche

export default function ScoresScreen({ route, navigation }) {
  const { points, playerName = 'Sans nom' } = route.params; // Récupère les points depuis la route
  const [scores, setScores] = useState([]);
  const displayName = playerName && playerName.trim() !== "" ? playerName : "Sans nom"; // Si playerName est vide ou undefined, on met "Sans nom"

  const resetScores = async () => {
    try {
      // Supprime les scores de AsyncStorage
      await AsyncStorage.removeItem('scores');
      // Réinitialiser les scores à un tableau vide
      setScores([]);
    } catch (error) {
      console.error('Erreur lors de la réinitialisation des scores :', error);
    }
  };

  useEffect(() => {
    const saveAndLoadScores = async () => {
      try {
        const storedScores = await AsyncStorage.getItem('scores');
        const parsedScores = storedScores ? JSON.parse(storedScores) : [];
        const updatedScores = [
          ...parsedScores.map((score) => ({ ...score, isCurrentScore: false })),
          { name: displayName, score: points, isCurrentScore: true },  // Utilisation de displayName
        ];
        updatedScores.sort((a, b) => b.score - a.score);
        await AsyncStorage.setItem('scores', JSON.stringify(updatedScores));
        setScores(updatedScores);
      } catch (error) {
        console.error('Erreur lors de la sauvegarde ou du chargement des scores :', error);
      }
    };

    saveAndLoadScores();
  }, [points]);


  const getTrophyColor = (rank) => {
    if (rank === 1) return 'gold';
    if (rank === 2) return 'silver';
    if (rank === 3) return '#cd7f32';
    return '#333';
  };

  const renderScoreItem = ({ item, index }) => (
    <View
      style={[styles.scoreRow, item.isCurrentScore && styles.highlightedUserRow]}
    >
      {index < 3 && (
        <FontAwesome
          name="trophy"
          size={30}
          color={getTrophyColor(index + 1)}
          style={styles.trophyIcon}
        />
      )}
      <Text style={[styles.scoreText, item.isCurrentScore && styles.highlightedUserText]}>
        {item.name}
      </Text>
      <Text style={[styles.pointsText, item.isCurrentScore && styles.highlightedUserText]}>
        {item.score} points
      </Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff7dd" translucent={false} />
      {/* SVG en haut à droite */}
      <View style={styles.topRightSvgContainer}>
        <BackgroundSvg style={styles.topRightSvg} />
      </View>
      {/* SVG en bas à gauche */}
      <View style={styles.bottomLeftSvgContainer}>
        <BottomLeftSvg style={styles.bottomLeftSvg} />
      </View>
      <Text style={styles.title}>Tableau de scores</Text>
      <Text style={styles.points}>
        Bravo, vous avez obtenu <Text style={styles.highlightedPoints}>{points}</Text> points !
      </Text>
      <View style={styles.scoreTableContainer}>
        <FlatList
          data={scores}
          renderItem={renderScoreItem}
          keyExtractor={(item, index) => index.toString()}
        />

        <TouchableOpacity
          style={styles.resetButton}
          onPress={resetScores}
        >
          <View style={styles.buttonContent}>
            <FontAwesome name="trash" size={20} color="#b22a00" style={styles.icon} />
            <Text style={styles.resetButtonText}>Réinitialiser les scores</Text>
          </View>
        </TouchableOpacity>
      </View>
      <TouchableOpacity
        style={styles.restartButton}
        onPress={() => {
          // Lors du redémarrage, on passe le paramètre resetGame à true
          navigation.navigate('Game', { resetGame: true });
        }}
      >
        <View style={styles.buttonContent}>
          <FontAwesome name="refresh" size={20} color="#145952" style={styles.iconRestart} />
          <Text style={styles.restartButtonText}>Recommencer</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#fff7dd',
    position: 'relative',  // Position relative pour permettre au SVG d'être positionné absolument
  },
  topRightSvgContainer: {
    position: 'absolute',
    top: 0,     // Positionné en haut
    right: 0,   // Positionné à droite
    zIndex: 0,  // Le SVG est derrière les autres éléments
    pointerEvents: 'none',
  },
  topRightSvg: {
    width: 100,  // Ajustez la taille du SVG
    height: 100, // Ajustez la taille du SVG
  },
  bottomLeftSvgContainer: {
    position: 'absolute',
    bottom: 0,  // Positionné en bas
    left: 0,    // Positionné à gauche
    zIndex: 0,  // Assurez-vous qu'il est derrière les autres éléments interactifs
    pointerEvents: 'none', // Le SVG ne bloque pas les interactions utilisateur
  },
  bottomLeftSvg: {
    width: 100,  // Ajustez la taille du SVG
    height: 100, // Ajustez la taille du SVG
  },
  title: {
    marginTop: 40,
    fontSize: 24,
    fontWeight: 'bold',
    zIndex: 1,  // Le titre sera au-dessus du SVG
  },
  points: {
    fontSize: 18,
    marginBottom: 20,
    fontWeight: 'bold',
    color: '#006400',
    paddingBottom: 10,
    zIndex: 1,  // Les points seront au-dessus du SVG
  },
  scoreTableContainer: {
    height: 450, // Taille fixe pour la liste des scores
    width: '100%',
    padding: 10,
    marginBottom: 20,
    backgroundColor: '#fff7dd',
    zIndex: 1,  // Le tableau sera également au-dessus du SVG
  },
  scoreRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: 15,
    paddingHorizontal: 10,
    flexWrap: 'nowrap', // Assure que le contenu reste sur la même ligne
  },
  trophyIcon: {
    marginRight: 10,
  },
  scoreText: {
    fontSize: 18,
    color: '#333',
    flex: 1, // Utilise l'espace restant disponible pour le nom
    textAlign: 'left',
  },
  pointsText: {
    fontSize: 18,
    color: '#333',
    flex: 1, // Utilise l'espace restant disponible pour les points
    textAlign: 'right',
    overflow: 'hidden', // Cache le texte qui dépasse (si besoin)
    whiteSpace: 'nowrap', // Assurez-vous que le texte ne se divise pas en plusieurs lignes
  },
  highlightedUserRow: {
    backgroundColor: '#d1f7c4',
    borderRadius: 15,
    padding: 3,
  },
  highlightedUserText: {
    fontWeight: 'bold',
    color: '#006400',
  },
  restartButton: {
    backgroundColor: '#145952',
    paddingVertical: 15,
    paddingHorizontal: 40,
    borderRadius: 10,
    marginTop: 10,
  },
  restartButtonText: {
    color: '#fff7dd',
    fontSize: 15,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  buttonContent: {
    flexDirection: 'row', // Pour aligner l'icône et le texte côte à côte
    alignItems: 'center', // Pour centrer l'icône et le texte verticalement
    justifyContent: 'center', // Centrer horizontalement
  },
  icon: {
    marginRight: 10, // Ajouter un petit espacement entre l'icône et le texte
  },

  iconRestart: {
    marginRight: 10,
    color: '#fff7dd',
  },

  resetButton: {
    backgroundColor: 'transparent',
    paddingVertical: 15,
    paddingHorizontal: 40,
    borderRadius: 10,
    marginTop: 20,  // Vous pouvez ajuster l'espacement selon vos préférences
  },
  resetButtonText: {
    color: '#b22a00',
    fontSize: 13,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
