import React, { useRef, useEffect } from 'react';
import { StyleSheet, View, StatusBar, Platform } from 'react-native';
import { Video } from 'expo-av';

export default function SplashVideo({ onFinish }) {
  const videoRef = useRef(null);

  useEffect(() => {
    // Masquer la barre d'état et changer son style
    StatusBar.setHidden(true, 'fade');
    StatusBar.setBarStyle('light-content');

    // Lancer la vidéo dès que le composant est monté
    if (videoRef.current) {
      videoRef.current.playAsync();
    }

    // Restaurer les paramètres d'origine à la fin
    return () => {
      StatusBar.setHidden(false, 'fade');
      StatusBar.setBarStyle('dark-content');
    };
  }, []);

  return (
    <View style={styles.container}>
      <Video
        ref={videoRef}
        source={require('../assets/videos/intro5.mp4')} // Remplacez par le chemin vers votre vidéo
        style={styles.video}
        resizeMode="contain"
        shouldPlay
        isLooping={false}
        onPlaybackStatusUpdate={(status) => {
          if (status.didJustFinish) {
            onFinish();
          }
        }}
      />
      {Platform.OS === 'android' && (
        <View style={styles.navBarOverlay} />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
    justifyContent: 'center',
    alignItems: 'center',
  },
  video: {
    width: '100%',
    height: '100%',
  },
  navBarOverlay: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    height: 48, // Hauteur de la barre de navigation Android
    backgroundColor: 'black',
  },
});
