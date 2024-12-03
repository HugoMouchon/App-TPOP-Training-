import React, { useState, useEffect } from 'react';
import { View, ActivityIndicator, StatusBar } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import * as Font from 'expo-font';
import SplashVideo from './screens/SplashVideo'; // Importez le composant vidéo
import HomeScreen from './screens/HomeScreen'; // Importez votre HomeScreen
import GameScreen from './screens/GameScreen';
import ScoresScreen from './screens/ScoresScreen';
import { Easing } from 'react-native';

const Stack = createStackNavigator();

export default function App() {
  const [fontsLoaded, setFontsLoaded] = useState(false);
  const [isSplashFinished, setSplashFinished] = useState(false);

  useEffect(() => {
    const loadFonts = async () => {
      await Font.loadAsync({
        'Poppins-Regular': require('./assets/fonts/Poppins-Regular.ttf'),
        'Poppins-Bold': require('./assets/fonts/Poppins-Bold.ttf'),
      });
      setFontsLoaded(true);
    };

    loadFonts();
  }, []);

  if (!fontsLoaded) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  if (!isSplashFinished) {
    return <SplashVideo onFinish={() => setSplashFinished(true)} />;
  }

  return (
    <NavigationContainer>
      <StatusBar
        translucent={true}
        backgroundColor="transparent"
        barStyle="dark-content"
      />
      <Stack.Navigator
        initialRouteName="Home"
        screenOptions={{
          headerShown: false, // Masquer l'en-tête
          cardStyle: { backgroundColor: '#fff' }, // Fond par défaut
          cardOverlayEnabled: true, // Option pour ajouter une couche sur la transition
          gestureEnabled: true,  // Permet le glissement pour revenir en arrière
          // Placez ici le transitionSpec pour gérer les animations de transition
          transitionSpec: {
            open: {
              animation: 'timing',
              config: {
                duration: 400, // Durée réduite pour améliorer la fluidité
                easing: Easing.inOut(Easing.ease),
                useNativeDriver: true, // Utilisation du moteur natif pour l'animation
              },
            },
            close: {
              animation: 'timing',
              config: {
                duration: 400, // Durée réduite pour améliorer la fluidité
                easing: Easing.inOut(Easing.ease),
                useNativeDriver: true, // Utilisation du moteur natif pour l'animation
              },
            },
          },
          cardStyleInterpolator: ({ current, layouts }) => {
            const translateY = current.progress.interpolate({
              inputRange: [0, 1],
              outputRange: [layouts.screen.height, 0], // Déplace l'écran du bas vers le haut
            });
            return {
              cardStyle: {
                transform: [{ translateY }],
              },
            };
          },
        }}
      >
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Game" component={GameScreen} />
        <Stack.Screen name="Scores" component={ScoresScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
