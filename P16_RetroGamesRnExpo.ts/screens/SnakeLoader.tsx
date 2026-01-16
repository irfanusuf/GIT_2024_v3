import { View, Text, Pressable, StyleSheet, Animated } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useEffect, useRef, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";




export default function SnakeLoader({ navigation  }) {
  const pulse = useRef(new Animated.Value(0)).current;
  const float = useRef(new Animated.Value(0)).current;

  const [highScore , setHighScore] = useState<number>(0)


 useEffect(() => {
      loadHighScore();
    }, []);
  
    const loadHighScore = async () => {
      try {
        const savedScore = await AsyncStorage.getItem("snake_high_score");
        if (savedScore) {
          setHighScore(parseInt(savedScore, 10));
        }
      } catch (error) {
        console.error("Failed to load high score:", error);
      } 
    };
  


  useEffect(() => {
    // Pulse animation
    Animated.loop(
      Animated.sequence([
        Animated.timing(pulse, {
          toValue: 1,
          duration: 900,
          useNativeDriver: true,
        }),
        Animated.timing(pulse, {
          toValue: 0,
          duration: 900,
          useNativeDriver: true,
        }),
      ])
    ).start();

    // Floating animation
    Animated.loop(
      Animated.sequence([
        Animated.timing(float, {
          toValue: -8,
          duration: 1200,
          useNativeDriver: true,
        }),
        Animated.timing(float, {
          toValue: 8,
          duration: 1200,
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, []);






  const glowOpacity = pulse.interpolate({
    inputRange: [0, 1],
    outputRange: [0.4, 1],
  });

  return (
    <LinearGradient
      colors={["#020202", "#050505", "#020202"]}
      style={styles.container}
    >
      {/* Fake Grid Background */}
      <View style={styles.grid}>
        {Array.from({ length: 120 }).map((_, i) => (
          <View key={i} style={styles.gridCell} />
        ))}
      </View>

      {/* Snake Head */}
      <Animated.View
        style={[
          styles.snake,
          {
            opacity: glowOpacity,
            transform: [{ translateY: float }],
          },
        ]}
      />

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
        SNAKE XENGIA
      </Animated.Text>


      <Animated.Text
        style={[
          styles.title,
          {
            opacity: glowOpacity,
            transform: [{ translateY: float }],
          },
        ]}
      >
      Highest Score : {highScore}
      </Animated.Text>


      {/* CTA */}
      <Pressable
        style={styles.button}
        onPress={() => navigation.navigate("Snake")}
      >
        <Text style={styles.buttonText}>TAP TO START</Text>
      </Pressable>
    </LinearGradient>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },

  grid: {
    position: "absolute",
    width: "100%",
    height: "100%",
    flexDirection: "row",
    flexWrap: "wrap",
    opacity: 0.08,
  },

  gridCell: {
    width: "10%",
    height: "10%",
    borderWidth: 0.5,
    borderColor: "#00ff88",
  },

  snake: {
    width: 120,
    height: 18,
    borderRadius: 10,
    backgroundColor: "#00ff88",
    marginBottom: 20,
    shadowColor: "#00ff88",
    shadowOpacity: 0.9,
    shadowRadius: 20,
  },

  title: {
    fontSize: 34,
    fontWeight: "900",
    color: "#00ff88",
    letterSpacing: 4,
    marginBottom: 40,
  },

  button: {
    borderWidth: 2,
    borderColor: "#00ff88",
    borderRadius: 30,
    paddingHorizontal: 42,
    paddingVertical: 14,
  },

  buttonText: {
    color: "#00ff88",
    fontSize: 16,
    letterSpacing: 2,
  },
});
