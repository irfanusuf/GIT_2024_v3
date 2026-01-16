import { View, Text, Pressable, StyleSheet, Animated, Image } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useEffect, useRef, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function SpaceInvaderzLoader({ navigation }) {
  const pulse = useRef(new Animated.Value(0)).current;
  const float = useRef(new Animated.Value(0)).current;
  const invaderMove = useRef(new Animated.Value(0)).current;
  
  const [highScore, setHighScore] = useState<number>(0);

  useEffect(() => {
    loadHighScore();
  }, []);

  const loadHighScore = async () => {
    try {
      const savedScore = await AsyncStorage.getItem("space_invaderz_high_score");
      if (savedScore) {
        setHighScore(parseInt(savedScore, 10));
      }
    } catch (error) {
      console.error("Failed to load high score:", error);
    }
  };

  useEffect(() => {
    // Glow pulse animation
    Animated.loop(
      Animated.sequence([
        Animated.timing(pulse, {
          toValue: 1,
          duration: 800,
          useNativeDriver: true,
        }),
        Animated.timing(pulse, {
          toValue: 0,
          duration: 800,
          useNativeDriver: true,
        }),
      ])
    ).start();

    // Floating animation for title
    Animated.loop(
      Animated.sequence([
        Animated.timing(float, {
          toValue: -6,
          duration: 1000,
          useNativeDriver: true,
        }),
        Animated.timing(float, {
          toValue: 6,
          duration: 1000,
          useNativeDriver: true,
        }),
      ])
    ).start();

    // Invader side-to-side movement
    Animated.loop(
      Animated.sequence([
        Animated.timing(invaderMove, {
          toValue: 1,
          duration: 1500,
          useNativeDriver: true,
        }),
        Animated.timing(invaderMove, {
          toValue: 0,
          duration: 1500,
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, []);

  const glowOpacity = pulse.interpolate({
    inputRange: [0, 1],
    outputRange: [0.3, 0.9],
  });

  const invaderTranslateX = invaderMove.interpolate({
    inputRange: [0, 1],
    outputRange: [-20, 20],
  });

  // Space Invader pixel art pattern (8x8 grid)
  const invaderPattern = [
    [0,0,1,1,1,1,0,0],
    [0,1,1,1,1,1,1,0],
    [1,1,0,1,1,0,1,1],
    [1,1,1,1,1,1,1,1],
    [0,1,0,1,1,0,1,0],
    [1,0,0,0,0,0,0,1],
    [0,1,0,0,0,0,1,0],
    [0,0,1,1,1,1,0,0],
  ];

  return (
    <LinearGradient
      colors={["#0a0020", "#150045", "#0a0020"]}
      style={styles.container}
    >
      {/* Starfield Background */}
      <View style={styles.starfield}>
        {Array.from({ length: 60 }).map((_, i) => (
          <View
            key={i}
            style={[
              styles.star,
              {
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                width: Math.random() * 3 + 1,
                height: Math.random() * 3 + 1,
                opacity: Math.random() * 0.7 + 0.3,
              },
            ]}
          />
        ))}
      </View>

      {/* Animated Lasers */}
      <View style={styles.laserContainer}>
        {Array.from({ length: 4 }).map((_, i) => (
          <Animated.View
            key={i}
            style={[
              styles.laser,
              {
                left: `${i * 25 + 10}%`,
                backgroundColor: i % 2 === 0 ? "#ff0066" : "#00ccff",
                opacity: pulse.interpolate({
                  inputRange: [0, 1],
                  outputRange: [0.2, 0.8],
                }),
              },
            ]}
          />
        ))}
      </View>

      {/* Space Invader Character */}
      <Animated.View
        style={[
          styles.invaderContainer,
          {
            transform: [{ translateX: invaderTranslateX }],
          },
        ]}
      >
        <View style={styles.invaderGrid}>
          {invaderPattern.map((row, rowIndex) => (
            <View key={rowIndex} style={styles.row}>
              {row.map((cell, colIndex) => (
                <View
                  key={`${rowIndex}-${colIndex}`}
                  style={[
                    styles.pixel,
                    {
                      backgroundColor: cell === 1 ? "#ff0066" : "transparent",
                      shadowColor: cell === 1 ? "#ff0066" : "transparent",
                    },
                  ]}
                />
              ))}
            </View>
          ))}
        </View>
      </Animated.View>

      {/* Player Ship */}
      <View style={styles.playerShip}>
        <View style={styles.shipBody} />
        <View style={styles.shipCockpit} />
        <View style={styles.shipWingLeft} />
        <View style={styles.shipWingRight} />
      </View>

      {/* Title */}
      <Animated.Text
        style={[
          styles.title,
          {
            opacity: glowOpacity,
            transform: [{ translateY: float }],
          },
        ]}
      >
        SPACE INVADERZ
      </Animated.Text>

      {/* Subtitle */}
      <Animated.Text
        style={[
          styles.subtitle,
          {
            opacity: glowOpacity,
          },
        ]}
      >
        DEFEND EARTH FROM ALIEN ATTACK
      </Animated.Text>

      {/* High Score */}
      <Animated.View
        style={[
          styles.scoreContainer,
          {
            opacity: glowOpacity,
          },
        ]}
      >
        <Text style={styles.scoreLabel}>GALACTIC HIGH SCORE</Text>
        <Text style={styles.scoreValue}>{highScore.toLocaleString()}</Text>
      </Animated.View>

      {/* Controls Hint */}
      <View style={styles.controlsHint}>
        <Text style={styles.controlsText}>← → MOVE</Text>
        <View style={styles.separator} />
        <Text style={styles.controlsText}>SPACE FIRE</Text>
        <View style={styles.separator} />
        <Text style={styles.controlsText}>P PAUSE</Text>
      </View>

      {/* CTA Button */}
      <Pressable
        style={styles.button}
        onPress={() => navigation.navigate("SpaceInvaderzGame")}
      >
        <LinearGradient
          colors={["#ff0066", "#ff3399", "#ff0066"]}
          style={styles.buttonGradient}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
        >
          <Text style={styles.buttonText}>LAUNCH DEFENSE</Text>
          <Text style={styles.buttonSubtext}>TAP TO BEGIN</Text>
        </LinearGradient>
      </Pressable>

      {/* Back Button */}
      <Pressable
        style={styles.backButton}
        onPress={() => navigation.goBack()}
      >
        <Text style={styles.backButtonText}>← BACK TO ARCADE</Text>
      </Pressable>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 20,
  },
  starfield: {
    position: "absolute",
    width: "100%",
    height: "100%",
  },
  star: {
    position: "absolute",
    backgroundColor: "#ffffff",
    borderRadius: 1,
  },
  laserContainer: {
    position: "absolute",
    width: "100%",
    height: "100%",
  },
  laser: {
    position: "absolute",
    width: 2,
    height: "100%",
    opacity: 0.3,
  },
  invaderContainer: {
    marginBottom: 30,
  },
  invaderGrid: {
    width: 120,
    height: 120,
    backgroundColor: "rgba(255, 0, 102, 0.1)",
    borderWidth: 2,
    borderColor: "rgba(255, 0, 102, 0.3)",
    borderRadius: 8,
    padding: 8,
  },
  row: {
    flexDirection: "row",
    flex: 1,
  },
  pixel: {
    flex: 1,
    margin: 1,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.8,
    shadowRadius: 4,
    elevation: 4,
  },
  playerShip: {
    position: "absolute",
    bottom: 180,
    width: 60,
    height: 40,
    alignItems: "center",
  },
  shipBody: {
    width: 40,
    height: 20,
    backgroundColor: "#00ccff",
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    shadowColor: "#00ccff",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.8,
    shadowRadius: 8,
    elevation: 8,
  },
  shipCockpit: {
    width: 20,
    height: 10,
    backgroundColor: "#ffffff",
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5,
    marginTop: -5,
  },
  shipWingLeft: {
    position: "absolute",
    left: -15,
    top: 10,
    width: 20,
    height: 10,
    backgroundColor: "#00ccff",
    transform: [{ skewY: "20deg" }],
  },
  shipWingRight: {
    position: "absolute",
    right: -15,
    top: 10,
    width: 20,
    height: 10,
    backgroundColor: "#00ccff",
    transform: [{ skewY: "-20deg" }],
  },
  title: {
    fontSize: 36,
    fontWeight: "900",
    color: "#ff0066",
    letterSpacing: 3,
    marginBottom: 10,
    textAlign: "center",
    textShadowColor: "#ff0066",
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 10,
  },
  subtitle: {
    fontSize: 14,
    color: "#00ccff",
    letterSpacing: 2,
    fontWeight: "700",
    marginBottom: 30,
    textAlign: "center",
  },
  scoreContainer: {
    backgroundColor: "rgba(255, 0, 102, 0.1)",
    borderWidth: 2,
    borderColor: "rgba(255, 0, 102, 0.3)",
    borderRadius: 12,
    paddingHorizontal: 20,
    paddingVertical: 10,
    marginBottom: 30,
    alignItems: "center",
  },
  scoreLabel: {
    fontSize: 12,
    color: "#00ccff",
    letterSpacing: 2,
    fontWeight: "700",
    marginBottom: 5,
  },
  scoreValue: {
    fontSize: 28,
    color: "#ffffff",
    fontWeight: "900",
    textShadowColor: "#ff0066",
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 5,
  },
  controlsHint: {
    flexDirection: "row",
    backgroundColor: "rgba(0, 0, 0, 0.4)",
    borderRadius: 20,
    paddingHorizontal: 15,
    paddingVertical: 10,
    marginBottom: 40,
    borderWidth: 1,
    borderColor: "rgba(0, 204, 255, 0.3)",
  },
  controlsText: {
    fontSize: 11,
    color: "#00ccff",
    fontWeight: "700",
    letterSpacing: 1,
  },
  separator: {
    width: 1,
    height: "100%",
    backgroundColor: "rgba(0, 204, 255, 0.3)",
    marginHorizontal: 15,
  },
  button: {
    width: "100%",
    maxWidth: 300,
    borderRadius: 25,
    overflow: "hidden",
    shadowColor: "#ff0066",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.8,
    shadowRadius: 10,
    elevation: 10,
    marginBottom: 20,
  },
  buttonGradient: {
    paddingVertical: 18,
    alignItems: "center",
    borderRadius: 25,
  },
  buttonText: {
    color: "#ffffff",
    fontSize: 20,
    fontWeight: "900",
    letterSpacing: 2,
    marginBottom: 5,
  },
  buttonSubtext: {
    color: "rgba(255, 255, 255, 0.8)",
    fontSize: 12,
    letterSpacing: 1,
  },
  backButton: {
    marginTop: 10,
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  backButtonText: {
    color: "rgba(255, 255, 255, 0.6)",
    fontSize: 14,
    fontWeight: "700",
    letterSpacing: 1,
  },
});