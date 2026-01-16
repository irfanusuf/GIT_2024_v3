import { View, Text, Pressable, StyleSheet, ScrollView, Image } from "react-native";
import { LinearGradient } from "expo-linear-gradient";


export default function GameHub({ navigation }) {
  const games = [
    {
      id: 1,
      title: "SNAKE XENGIA",
      icon: "🐍",
      color: "#00ff88",
      description: "Classic snake with a neon twist",
      route: "SnakeLoader",
      score: 2450,
      gradient: ["#003300", "#00ff88"]
    },
    {
      id: 2,
      title: "SPACE INVADERZ",
      icon: "👾",
      color: "#ff0066",
      description: "Defend Earth from alien invasion",
      route: "SpaceInvaderzLoader",
      score: 1800,
      gradient: ["#330033", "#ff0066"]
    },
    {
      id: 3,
      title: "PAC-MANIA",
      icon: "👻",
      color: "#ffff00",
      description: "Navigate mazes, eat dots, avoid ghosts",
      route: "PacMan",
      score: 3200,
      gradient: ["#333300", "#ffff00"]
    },
    {
      id: 4,
      title: "TETRIX BLOCKS",
      icon: "🧊",
      color: "#00ccff",
      description: "Rotate and fit falling blocks",
      route: "Tetris",
      score: 15000,
      gradient: ["#003333", "#00ccff"]
    },
    {
      id: 5,
      title: "BREAKOUT 8BIT",
      icon: "🟨",
      color: "#ff8800",
      description: "Smash bricks with bouncing ball",
      route: "Breakout",
      score: 7500,
      gradient: ["#331100", "#ff8800"]
    },
    {
      id: 6,
      title: "DINO RUNNER",
      icon: "🦖",
      color: "#44ff44",
      description: "Jump over cacti, survive as long as you can",
      route: "DinoRunner",
      score: 5200,
      gradient: ["#113311", "#44ff44"]
    },
    {
      id: 7,
      title: "FROGGER CROSSING",
      icon: "🐸",
      color: "#ff44ff",
      description: "Help the frog cross safely",
      route: "Frogger",
      score: 2800,
      gradient: ["#331133", "#ff44ff"]
    },
    {
      id: 8,
      title: "PIXEL RACER",
      icon: "🏎️",
      color: "#4488ff",
      description: "Avoid traffic in high-speed chase",
      route: "Racer",
      score: 8900,
      gradient: ["#001133", "#4488ff"]
    }
  ];

  return (
    <LinearGradient
      colors={["#0a0a0a", "#111111", "#0a0a0a"]}
      style={styles.container}
    >
      {/* 8-bit Pixel Background */}
      <View style={styles.pixelBackground}>
        {Array.from({ length: 200 }).map((_, i) => (
          <View 
            key={i} 
            style={[
              styles.pixel,
              { 
                backgroundColor: i % 5 === 0 ? "#00ff88" : 
                                i % 3 === 0 ? "#ff0066" : 
                                i % 7 === 0 ? "#00ccff" : "#222222" 
              }
            ]} 
          />
        ))}
      </View>

      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>🎮 8-BIT ARCADE HUB</Text>
        <Text style={styles.headerSubtitle}>RETRO GAMES COLLECTION</Text>
      </View>

      {/* Games Grid */}
      <ScrollView 
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.gamesGrid}>
          {games.map((game) => (
            <Pressable
              key={game.id}
              style={styles.gameCard}
              onPress={() => navigation.navigate(game.route)}
            >
              <LinearGradient
                colors={game.gradient as [string, string, ...string[]]}
                style={styles.gameCardGradient}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
              >
                {/* Game Icon */}
                <Text style={styles.gameIcon}>{game.icon}</Text>
                
                {/* Game Info */}
                <View style={styles.gameInfo}>
                  <Text style={styles.gameTitle}>{game.title}</Text>
                  <Text style={styles.gameDescription}>{game.description}</Text>
                  
                  {/* High Score */}
                  <View style={styles.scoreContainer}>
                    <Text style={styles.scoreLabel}>HIGH SCORE</Text>
                    <Text style={styles.scoreValue}>{game.score.toLocaleString()}</Text>
                  </View>
                </View>

                {/* 8-bit Pixel Border Effect */}
                <View style={styles.pixelBorderTop} />
                <View style={styles.pixelBorderRight} />
                <View style={styles.pixelBorderBottom} />
                <View style={styles.pixelBorderLeft} />
              </LinearGradient>
            </Pressable>
          ))}
        </View>
      </ScrollView>

      {/* Footer */}
      <View style={styles.footer}>
        <Text style={styles.footerText}>SELECT A GAME TO BEGIN</Text>
        <Text style={styles.footerSubtext}>↕️ SCROLL TO VIEW ALL ↕️</Text>
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 50,
  },
  pixelBackground: {
    position: "absolute",
    width: "100%",
    height: "100%",
    flexDirection: "row",
    flexWrap: "wrap",
    opacity: 0.03,
  },
  pixel: {
    width: 20,
    height: 20,
    margin: 1,
  },
  header: {
    alignItems: "center",
    marginBottom: 20,
    paddingHorizontal: 20,
  },
  headerTitle: {
    fontSize: 32,
    fontWeight: "900",
    color: "#00ff88",
    letterSpacing: 2,
    textShadowColor: "#00ff88",
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 10,
    marginBottom: 5,
  },
  headerSubtitle: {
    fontSize: 14,
    color: "#888",
    letterSpacing: 4,
    fontWeight: "700",
  },
  scrollView: {
    flex: 1,
    paddingHorizontal: 20,
  },
  gamesGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    paddingBottom: 30,
  },
  gameCard: {
    width: "48%",
    height: 220,
    marginBottom: 15,
    borderRadius: 8,
    overflow: "hidden",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.5,
    shadowRadius: 10,
    elevation: 5,
  },
  gameCardGradient: {
    flex: 1,
    padding: 12,
    justifyContent: "space-between",
    position: "relative",
  },
  gameIcon: {
    fontSize: 40,
    textAlign: "center",
    marginTop: 10,
    textShadowColor: "rgba(0,0,0,0.5)",
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 2,
  },
  gameInfo: {
    flex: 1,
    justifyContent: "flex-end",
  },
  gameTitle: {
    fontSize: 14,
    fontWeight: "900",
    color: "#fff",
    letterSpacing: 1,
    marginBottom: 5,
    textAlign: "center",
    textShadowColor: "rgba(0,0,0,0.8)",
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 1,
  },
  gameDescription: {
    fontSize: 10,
    color: "rgba(255,255,255,0.8)",
    textAlign: "center",
    marginBottom: 10,
    lineHeight: 12,
    fontWeight: "500",
  },
  scoreContainer: {
    backgroundColor: "rgba(0,0,0,0.4)",
    borderRadius: 6,
    padding: 6,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.2)",
  },
  scoreLabel: {
    fontSize: 8,
    color: "rgba(255,255,255,0.7)",
    fontWeight: "700",
    letterSpacing: 1,
  },
  scoreValue: {
    fontSize: 16,
    color: "#fff",
    fontWeight: "900",
    marginTop: 2,
    textShadowColor: "rgba(0,0,0,0.8)",
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 1,
  },
  // 8-bit pixel border styles
  pixelBorderTop: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    height: 4,
    backgroundColor: "rgba(255,255,255,0.3)",
  },
  pixelBorderRight: {
    position: "absolute",
    top: 0,
    right: 0,
    bottom: 0,
    width: 4,
    backgroundColor: "rgba(255,255,255,0.2)",
  },
  pixelBorderBottom: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: 4,
    backgroundColor: "rgba(0,0,0,0.3)",
  },
  pixelBorderLeft: {
    position: "absolute",
    top: 0,
    left: 0,
    bottom: 0,
    width: 4,
    backgroundColor: "rgba(0,0,0,0.2)",
  },
  footer: {
    padding: 20,
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
    borderTopWidth: 2,
    borderTopColor: "#00ff88",
  },
  footerText: {
    color: "#00ff88",
    fontSize: 14,
    fontWeight: "700",
    letterSpacing: 2,
    marginBottom: 5,
  },
  footerSubtext: {
    color: "#888",
    fontSize: 10,
    letterSpacing: 1,
  },
});