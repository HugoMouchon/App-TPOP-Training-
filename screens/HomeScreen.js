import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import Logo from './../assets/logo/tpopBlanc.svg';
import LottieView from 'lottie-react-native'; // Importer Lottie


export default function HomeScreen({ navigation }) {
    return (
        <View style={styles.container}>
            {/* <Text style={styles.titleText}>Quizz Reco TPOP</Text> */}
            <View style={styles.redSection}>
                <View style={styles.bottomTopCorner}>
                    <View style={styles.logoContainer}>
                        <LottieView
                            source={require('./../assets/lottie/Animation.json')} // Chemin vers l'animation JSON
                            autoPlay // Lancer l'animation automatiquement
                            loop // Faire boucler l'animation
                            style={styles.lottieAnimation} // Style mis à jour
                        />
                        <Logo style={styles.logo} />
                        <View style={styles.bite}>
                            <FontAwesome name="lightbulb-o" size={25} style={styles.ideaIcon} />
                            <Text style={styles.welcomeText}>Application d'entrainement destiné à
                                l’examen de reconnaissance en végétaux et parasitologie. </Text>
                        </View>
                    </View>
                </View>
            </View>
            <View style={styles.blueSection}>
                <TouchableOpacity
                    style={styles.button}
                    onPress={() => navigation.navigate('Game')}
                >
                    <Text style={styles.buttonText}>Jouer</Text>
                    <FontAwesome name="arrow-right" size={20} marginTop="3" style={styles.arrowIcon} />
                </TouchableOpacity>
                <View style={styles.bottomMidCorner}>
                    <View style={styles.halfCircle} />
                </View>
            </View>
            <View style={styles.greenSection}>
                <View style={styles.bottomBottomCorner}>
                    <View style={styles.containerImage}>
                        <LottieView
                            source={require('./../assets/lottie/Moulin.json')} // Chemin vers l'animation JSON
                            autoPlay // Lancer l'animation automatiquement
                            loop // Faire boucler l'animation
                            style={styles.lottiePlante} // Style mis à jour
                        />
                    </View>
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    input: {
        width: 200,
    },
    bite: {
        flexDirection: 'column',
        alignItems: 'center',
        paddingRight: 10,
        paddingLeft: 10,
    },
    container: {
        flex: 1,
        backgroundColor: '#fff7dd',
        position: 'relative',
    },
    redSection: {
        flex: 5,
    },
    blueSection: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
    },
    greenSection: {
        flex: 2,
    },

    welcomeText: {
        fontFamily: 'Poppins-SemiBold',
        fontWeight: 'bold',
        color: '#145952',
        fontSize: 16,
        textAlign: 'justify',
        margin: 0,
        paddingRight: 20,
        paddingLeft: 20,
    },

    footerText: {
        fontSize: 18,
        color: '#fff',
    },
    bottomTopCorner: {
        position: 'absolute',
        bottom: 0,
        right: 0,
        width: "90%",
        height: "70%",
        backgroundColor: '#8ad09e',
        borderTopLeftRadius: 20,
        borderBottomLeftRadius: 20,
        zIndex: 1,
    },
    bottomMidCorner: {
        position: 'absolute',
        bottom: 0,
        right: 0,
        width: "45%",
        height: "100%",
        backgroundColor: '#8ad09e',
        borderTopLeftRadius: 20,
        borderBottomLeftRadius: 20,
        overflow: 'hidden',
    },
    halfCircle: {
        position: 'absolute',
        left: -30,
        top: 0,
        width: 90,
        height: 95,
        backgroundColor: '#fff7dd',
        borderRadius: 50,
    },

    button: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 10,
        borderRadius: 5,
        marginRight: 70,
    },
    buttonText: {
        color: '#ec693d',
        fontFamily: 'Poppins-SemiBold',
        fontSize: 25,
        paddingRight: 10,
    },
    arrowIcon: {
        color: '#ec693d',
    },

    ideaIcon: {
        color: '#145952',
    },

    bottomBottomCorner: {
        position: 'absolute',
        bottom: 0,
        right: 0,
        width: '70%',
        height: '100%',
        backgroundColor: '#8ad09e',
        borderTopLeftRadius: 20,
        borderBottomLeftRadius: 20,
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'visible',
    },

    image: {
        width: 200,
        height: '100%',
        resizeMode: 'cover',
        marginRight: -20,
        marginLeft: -40,
        marginTop: 15,
    },

    logoContainer: {
        width: '100%', // Prend toute la largeur du parent
        height: '100%', // Prend toute la hauteur du parent
        flexDirection: 'column',
        justifyContent: 'center', // Centre verticalement
        alignItems: 'center', // Centre horizontalement
        paddingBottom: 170,
    },
    logo: {
        height: 100,
        width: 200, // Ajoutez une largeur pour éviter qu'il ne s'étire
        resizeMode: 'contain', // Pour conserver les proportions du logo
        marginTop: -10, // Ajoutez ou ajustez la marge ici
        marginBottom: 0,

    },
    lottieAnimation: {
        width: 300, // Ajustez la taille selon vos besoins
        height: 250,
    },

    containerImage: {
        position: 'relative',
        width: '100%',
        height: '100%',
        flexDirection: 'row', // Dispose les éléments horizontalement
        justifyContent: 'flex-end', // Aligne les enfants sur la droite
        alignItems: 'flex-end', // Aligne verticalement les enfants en bas
        overflow: 'visible',
    },

    lottiePlante: {
        position: 'absolute',
        bottom: -15, // Positionne en bas du conteneur parent
        right: -55, // Positionne à droite du conteneur parent
        width: '130%', // Taille de l'animation
        height: '130%',
    },

    text: {
        fontSize: 16,
        color: '#FFF',
        width: '100%',
        flexWrap: 'wrap',
        overflow: 'hidden',
    },
});
