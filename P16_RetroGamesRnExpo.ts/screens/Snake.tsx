import React, { useEffect, useState, useRef, useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  Animated,
  Easing,
  StatusBar,
  BackHandler,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import AsyncStorage from '@react-native-async-storage/async-storage';
// import { PanGestureHandler, State } from 'react-native-gesture-handler';

const { width, height } = Dimensions.get('window');
const CELL_SIZE = Math.min(width * 0.025, height * 0.025);
const BOARD_SIZE = 28;

// Cyberpunk Colors
const COLORS = {
  matrixGreen: '#00ff41',
  neonPink: '#ff00ff',
  cyberBlue: '#00ffff',
  darkBg: '#000814',
  gridBlue: '#003366',
  snakeHead: '#ff0066',
  snakeBody: '#00ffcc',
  foodColor: '#ffde00',
  uiBg: 'rgba(0, 20, 40, 0.9)',
  scoreHighlight: '#ff3300',
  powerUp: '#ff00ff',
};

type Position = { x: number; y: number };
type Direction = 'UP' | 'DOWN' | 'LEFT' | 'RIGHT';



export default function Snake() {
  const [snake, setSnake] = useState<Position[]>([
    { x: 14, y: 14 },
    { x: 13, y: 14 },
    { x: 12, y: 14 },
  ]);
  const [food, setFood] = useState<Position>({ x: 5, y: 5 });
  const [direction, setDirection] = useState<Direction>('RIGHT');
  const [gameOver, setGameOver] = useState(false);
  const [score, setScore] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [combo, setCombo] = useState(0);
  const [foodAnim] = useState(new Animated.Value(0));
  const [scoreAnim] = useState(new Animated.Value(1));
  const [gameSpeed, setGameSpeed] = useState(150);
  const [highScore, setHighScore] = useState<number>(0);
  
  const moveInterval = useRef<NodeJS.Timeout | null>(null);
  const lastDirection = useRef<Direction>('RIGHT');
  // const swipeX = useRef(0);
  // const swipeY = useRef(0);
  const headGlowAnim = useRef(new Animated.Value(0)).current;



  
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
  
  


  // save high Score 
  const saveHighScore = async (score: number) => {
    try {
      if (score > highScore) {
        await AsyncStorage.setItem("snake_high_score", score.toString());
      }
    } catch (error) {
      console.error("Failed to save high score:", error);
    }
  };


  // Food animation
  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(foodAnim, {
          toValue: 1,
          duration: 800,
          easing: Easing.inOut(Easing.sin),
          useNativeDriver: true,
        }),
        Animated.timing(foodAnim, {
          toValue: 0,
          duration: 800,
          easing: Easing.inOut(Easing.sin),
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, []);

  // Generate random food NOT on snake
  const generateFood = useCallback((snakePositions: Position[]): Position => {
    let newFood: Position;
    let attempts = 0;
    do {
      newFood = {
        x: Math.floor(Math.random() * BOARD_SIZE),
        y: Math.floor(Math.random() * BOARD_SIZE),
      };
      attempts++;
      if (attempts > 1000) break; // Prevent infinite loop
    } while (
      snakePositions.some(pos => pos.x === newFood.x && pos.y === newFood.y)
    );
    return newFood;
  }, []);

  // Animate score increase
  const animateScore = () => {
    Animated.sequence([
      Animated.timing(scoreAnim, {
        toValue: 1.3,
        duration: 100,
        useNativeDriver: true,
      }),
      Animated.timing(scoreAnim, {
        toValue: 1,
        duration: 100,
        useNativeDriver: true,
      }),
    ]).start();
  };

  // Animate snake head glow
  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(headGlowAnim, {
          toValue: 1,
          duration: 1000,
          easing: Easing.inOut(Easing.sin),
          useNativeDriver: true,
        }),
        Animated.timing(headGlowAnim, {
          toValue: 0.3,
          duration: 1000,
          easing: Easing.inOut(Easing.sin),
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, []);

  // Move snake one step in current direction
  const moveSnake = useCallback(() => {
    if (isPaused || gameOver) return;

    setSnake(prevSnake => {
      const head = prevSnake[0];
      let newHead: Position;

      switch (direction) {
        case 'UP':
          newHead = { x: head.x, y: head.y - 1 };
          break;
        case 'DOWN':
          newHead = { x: head.x, y: head.y + 1 };
          break;
        case 'LEFT':
          newHead = { x: head.x - 1, y: head.y };
          break;
        case 'RIGHT':
          newHead = { x: head.x + 1, y: head.y };
          break;
        default:
          newHead = head;
      }

      // Check wall collision - wrap around
      if (newHead.x < 0) newHead.x = BOARD_SIZE - 1;
      if (newHead.x >= BOARD_SIZE) newHead.x = 0;
      if (newHead.y < 0) newHead.y = BOARD_SIZE - 1;
      if (newHead.y >= BOARD_SIZE) newHead.y = 0;

      // Check self collision
      if (
        prevSnake.some(
          (segment, index) => 
            index > 3 && 
            segment.x === newHead.x && 
            segment.y === newHead.y
        )
      ) {
        setGameOver(true);
        if (moveInterval.current) clearInterval(moveInterval.current);
        setTimeout(() => saveHighScore(score), 1000);
        return prevSnake;
      }

      let newSnake = [newHead, ...prevSnake];

      // If food eaten
      if (newHead.x === food.x && newHead.y === food.y) {
        setFood(generateFood(newSnake));
        const newScore = score + 10 * (combo + 1);
        setScore(newScore);
        setCombo(prev => prev + 1);
        animateScore();
        
        // Increase speed every 5 foods
        if (newScore % 50 === 0 && gameSpeed > 50) {
          setGameSpeed(prev => prev - 10);
        }
        
        // Animate food collection
        foodAnim.setValue(0);
        Animated.timing(foodAnim, {
          toValue: 1,
          duration: 200,
          useNativeDriver: true,
        }).start();
      } else {
        newSnake.pop();
        if (combo > 0) setCombo(0);
      }

      return newSnake;
    });
  }, [direction, isPaused, gameOver, score, combo, gameSpeed]);

  // Game loop interval
  useEffect(() => {
    if (!gameOver && !isPaused) {
      if (moveInterval.current) clearInterval(moveInterval.current);
      moveInterval.current = setInterval(moveSnake, gameSpeed);
    }
    
    return () => {
      if (moveInterval.current) clearInterval(moveInterval.current);
    };
  }, [moveSnake, gameOver, isPaused, gameSpeed]);

  // Change direction, disallow reverse
  const changeDirection = useCallback((newDirection: Direction) => {
    if (
      (lastDirection.current === 'UP' && newDirection === 'DOWN') ||
      (lastDirection.current === 'DOWN' && newDirection === 'UP') ||
      (lastDirection.current === 'LEFT' && newDirection === 'RIGHT') ||
      (lastDirection.current === 'RIGHT' && newDirection === 'LEFT')
    ) {
      return;
    }
    setDirection(newDirection);
    lastDirection.current = newDirection;
  }, []);

  // // Gesture handling for swipe controls
  // const onGestureEvent = useCallback((event: any) => {
  //   const { translationX, translationY } = event.nativeEvent;
    
  //   if (Math.abs(translationX) > Math.abs(translationY)) {
  //     if (translationX > 30) changeDirection('RIGHT');
  //     else if (translationX < -30) changeDirection('LEFT');
  //   } else {
  //     if (translationY > 30) changeDirection('DOWN');
  //     else if (translationY < -30) changeDirection('UP');
  //   }
  // }, [changeDirection]);

  // Handle pause/resume
  const togglePause = () => {
    setIsPaused(!isPaused);
  };

  // Restart game
  const restartGame = () => {
    setSnake([
      { x: 14, y: 14 },
      { x: 13, y: 14 },
      { x: 12, y: 14 },
    ]);
    setFood({ x: 5, y: 5 });
    setDirection('RIGHT');
    lastDirection.current = 'RIGHT';
    setGameOver(false);
    setScore(0);
    setCombo(0);
    setGameSpeed(150);
    setIsPaused(false);
  };

  // Render the board with glow effects
  const renderBoard = () => {
    let rows = [];
    const boardWidth = CELL_SIZE * BOARD_SIZE;
    const boardHeight = CELL_SIZE * BOARD_SIZE;

    // Background grid
    for (let y = 0; y < BOARD_SIZE; y++) {
      let cells = [];
      for (let x = 0; x < BOARD_SIZE; x++) {
        const isSnake = snake.some((pos, index) => {
          if (index === 0) return pos.x === x && pos.y === y; // Head
          return pos.x === x && pos.y === y;
        });
        const isSnakeHead = snake[0].x === x && snake[0].y === y;
        const isFood = food.x === x && food.y === y;

        const foodScale = foodAnim.interpolate({
          inputRange: [0, 1],
          outputRange: [0.8, 1.2],
        });

        const foodOpacity = foodAnim.interpolate({
          inputRange: [0, 1],
          outputRange: [0.7, 1],
        });

        cells.push(
          <View key={`${x}-${y}`} style={styles.cell}>
            {isFood ? (
              <Animated.View
                style={[
                  styles.foodCell,
                  {
                    transform: [{ scale: foodScale }],
                    opacity: foodOpacity,
                  },
                ]}
              >
                <LinearGradient
                  colors={[COLORS.foodColor, '#ff9900']}
                  style={StyleSheet.absoluteFill}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 1 }}
                />
                <View style={styles.foodGlow} />
              </Animated.View>
            ) : isSnakeHead ? (
              <Animated.View
                style={[
                  styles.snakeHeadCell,
                  {
                    opacity: headGlowAnim.interpolate({
                      inputRange: [0, 1],
                      outputRange: [0.8, 1],
                    }),
                  },
                ]}
              >
                <LinearGradient
                  colors={[COLORS.snakeHead, '#ff3399']}
                  style={StyleSheet.absoluteFill}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 1 }}
                />
                <Animated.View
                  style={[
                    styles.headGlow,
                    {
                      opacity: headGlowAnim,
                    },
                  ]}
                />
              </Animated.View>
            ) : isSnake ? (
              <LinearGradient
                colors={[COLORS.snakeBody, '#00cc99']}
                style={styles.snakeBodyCell}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
              />
            ) : null}
          </View>
        );
      }
      rows.push(
        <View key={`row-${y}`} style={styles.row}>
          {cells}
        </View>
      );
    }

    return (
      <View style={[styles.boardContainer, { width: boardWidth, height: boardHeight }]}>
        {/* Grid lines */}
        <View style={styles.gridOverlay} pointerEvents="none">
          {Array.from({ length: BOARD_SIZE + 1 }).map((_, i) => (
            <React.Fragment key={i}>
              <View style={[styles.gridLine, { left: i * CELL_SIZE }]} />
              <View style={[styles.gridLineHorizontal, { top: i * CELL_SIZE }]} />
            </React.Fragment>
          ))}
        </View>
        
        {/* Snake and food */}
        {rows}
        
        {/* Border glow */}
        <View style={styles.boardGlow} />
      </View>
    );
  };

  // Handle back button to pause
  useEffect(() => {
    const backAction = () => {
      if (!gameOver) {
        togglePause();
        return true;
      }
      return false;
    };

    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction
    );

    return () => backHandler.remove();
  }, [gameOver, isPaused]);

  return (
    <View style={styles.container}>
      <StatusBar hidden />
      
      {/* Background Pattern */}
      <View style={styles.backgroundPattern} />
      
      {/* Scan line effect */}
      <View style={styles.scanLine} />

      {/* Game Header */}
      <View style={styles.header}>
        <View style={styles.scoreContainer}>
          <LinearGradient
            colors={['rgba(0, 40, 80, 0.9)', 'rgba(0, 20, 40, 0.9)']}
            style={styles.scoreCard}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
          >
            <View style={styles.scoreRow}>
              <View>
                <Text style={styles.scoreLabel}>SCORE</Text>
                <Animated.View style={{ transform: [{ scale: scoreAnim }] }}>
                  <Text style={styles.scoreValue}>{score.toString().padStart(6, '0')}</Text>
                </Animated.View>
              </View>
              
              <View style={styles.vsDivider} />
              
              <View>
                <Text style={styles.scoreLabel}>HIGH SCORE</Text>
                <Text style={styles.highScoreValue}>{highScore.toString().padStart(6, '0')}</Text>
              </View>
            </View>
            
            {combo > 0 && (
              <View style={styles.comboContainer}>
                <Text style={styles.comboText}>COMBO x{combo + 1}!</Text>
                <View style={styles.comboGlow} />
              </View>
            )}
          </LinearGradient>
        </View>

        <View style={styles.headerRight}>
          <TouchableOpacity style={styles.pauseButton} onPress={togglePause}>
            <LinearGradient
              colors={isPaused ? ['#00ff41', '#00cc00'] : ['#ff0066', '#ff3399']}
              style={styles.pauseButtonGradient}
            >
              <Text style={styles.pauseButtonText}>
                {isPaused ? '▶' : '⏸'}
              </Text>
            </LinearGradient>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.restartButton} onPress={restartGame}>
            <Text style={styles.restartButtonText}>↻</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Game Board */}
      {/* <PanGestureHandler
        onGestureEvent={onGestureEvent}
        onHandlerStateChange={onGestureEvent}
      > */}
        <View style={styles.gameArea}>
          {renderBoard()}
          
          {isPaused && (
            <View style={styles.pauseOverlay}>
              <LinearGradient
                colors={['rgba(0, 0, 0, 0.8)', 'rgba(0, 20, 40, 0.9)']}
                style={styles.pauseMessage}
              >
                <Text style={styles.pauseTitle}>GAME PAUSED</Text>
                <Text style={styles.pauseSubtitle}>Tap to resume</Text>
              </LinearGradient>
            </View>
          )}
          
          {gameOver && (
            <View style={styles.gameOverOverlay}>
              <LinearGradient
                colors={['rgba(255, 0, 102, 0.9)', 'rgba(153, 0, 51, 0.9)']}
                style={styles.gameOverMessage}
              >
                <Text style={styles.gameOverTitle}>GAME OVER</Text>
                <Text style={styles.gameOverScore}>SCORE: {score}</Text>
                <Text style={styles.gameOverHighScore}>
                  BEST: {Math.max(score, highScore)}
                </Text>
                <TouchableOpacity
                  style={styles.gameOverButton}
                  onPress={restartGame}
                >
                  <LinearGradient
                    colors={['#00ff41', '#00cc00']}
                    style={styles.gameOverButtonGradient}
                  >
                    <Text style={styles.gameOverButtonText}>PLAY AGAIN</Text>
                  </LinearGradient>
                </TouchableOpacity>
              </LinearGradient>
            </View>
          )}
        </View>
      {/* </PanGestureHandler> */}

      {/* Controls Panel */}
      <View style={styles.controlsPanel}>
        <LinearGradient
          colors={['rgba(0, 20, 40, 0.8)', 'rgba(0, 10, 30, 0.9)']}
          style={styles.controlsGradient}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
        >
          <Text style={styles.controlsTitle}>CONTROLS</Text>
          
          <View style={styles.controlsGrid}>
            <View style={styles.controlRow}>
              <TouchableOpacity
                style={styles.controlButton}
                onPress={() => changeDirection('UP')}
              >
                <LinearGradient
                  colors={['#00ffff', '#0099cc']}
                  style={styles.controlButtonGradient}
                >
                  <Text style={styles.controlButtonText}>↑</Text>
                </LinearGradient>
              </TouchableOpacity>
            </View>
            
            <View style={styles.controlRow}>
              <TouchableOpacity
                style={styles.controlButton}
                onPress={() => changeDirection('LEFT')}
              >
                <LinearGradient
                  colors={['#00ffff', '#0099cc']}
                  style={styles.controlButtonGradient}
                >
                  <Text style={styles.controlButtonText}>←</Text>
                </LinearGradient>
              </TouchableOpacity>
              
              <View style={styles.controlCenter} />
              
              <TouchableOpacity
                style={styles.controlButton}
                onPress={() => changeDirection('RIGHT')}
              >
                <LinearGradient
                  colors={['#00ffff', '#0099cc']}
                  style={styles.controlButtonGradient}
                >
                  <Text style={styles.controlButtonText}>→</Text>
                </LinearGradient>
              </TouchableOpacity>
            </View>
            
            <View style={styles.controlRow}>
              <TouchableOpacity
                style={styles.controlButton}
                onPress={() => changeDirection('DOWN')}
              >
                <LinearGradient
                  colors={['#00ffff', '#0099cc']}
                  style={styles.controlButtonGradient}
                >
                  <Text style={styles.controlButtonText}>↓</Text>
                </LinearGradient>
              </TouchableOpacity>
            </View>
          </View>
          
          <Text style={styles.swipeHint}>Or swipe to move</Text>
        </LinearGradient>
      </View>

      {/* Speed Indicator */}
      <View style={styles.speedIndicator}>
        <Text style={styles.speedText}>SPEED: {Math.round(1500 / gameSpeed)}</Text>
        <View style={styles.speedBar}>
          <View 
            style={[
              styles.speedFill, 
              { width: `${Math.min(100, (gameSpeed - 50) / 100 * 100)}%` }
            ]} 
          />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.darkBg,
  },
  backgroundPattern: {
    ...StyleSheet.absoluteFillObject,
    opacity: 0.05,
    backgroundColor: 'transparent',
    //  backgroundSize: '30px 30px',
    // backgroundImage: `radial-gradient(circle at 25% 25%, ${COLORS.gridBlue} 1px, transparent 1px)`,
   
  },
  scanLine: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 1,
    backgroundColor: 'rgba(0, 255, 255, 0.3)',
    shadowColor: COLORS.cyberBlue,
    shadowOffset: { width: 0, height: 0 },
    shadowRadius: 10,
    shadowOpacity: 0.5,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 10,
    paddingBottom: 20,
  },
  scoreContainer: {
    flex: 1,
  },
  scoreCard: {
    padding: 15,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: COLORS.cyberBlue,
  },
  scoreRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  scoreLabel: {
    fontSize: 14,
    color: COLORS.cyberBlue,
    fontFamily: 'Courier New',
    letterSpacing: 1,
    marginBottom: 5,
  },
  scoreValue: {
    fontSize: 32,
    fontWeight: '900',
    color: COLORS.matrixGreen,
    fontFamily: 'Courier New',
    letterSpacing: 2,
    textShadowColor: 'rgba(0, 255, 65, 0.8)',
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 10,
  },
  highScoreValue: {
    fontSize: 32,
    fontWeight: '900',
    color: COLORS.scoreHighlight,
    fontFamily: 'Courier New',
    letterSpacing: 2,
    textShadowColor: 'rgba(255, 51, 0, 0.8)',
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 10,
  },
  vsDivider: {
    width: 2,
    height: 40,
    backgroundColor: COLORS.cyberBlue,
    opacity: 0.5,
  },
  comboContainer: {
    position: 'absolute',
    top: -15,
    alignSelf: 'center',
    backgroundColor: COLORS.neonPink,
    paddingHorizontal: 15,
    paddingVertical: 5,
    borderRadius: 15,
    borderWidth: 2,
    borderColor: 'white',
  },
  comboText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 14,
    fontFamily: 'Courier New',
    letterSpacing: 1,
  },
  comboGlow: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: COLORS.neonPink,
    borderRadius: 15,
    opacity: 0.3,
    transform: [{ scale: 1.2 }],
  },
  headerRight: {
    flexDirection: 'row',
    gap: 10,
  },
  pauseButton: {
    width: 50,
    height: 50,
    borderRadius: 25,
    overflow: 'hidden',
  },
  pauseButtonGradient: {
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  pauseButtonText: {
    fontSize: 24,
    color: 'white',
    fontWeight: 'bold',
  },
  restartButton: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: COLORS.uiBg,
    borderWidth: 2,
    borderColor: COLORS.cyberBlue,
    alignItems: 'center',
    justifyContent: 'center',
  },
  restartButtonText: {
    fontSize: 24,
    color: COLORS.cyberBlue,
    fontWeight: 'bold',
  },
  gameArea: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  boardContainer: {
    backgroundColor: 'rgba(0, 10, 20, 0.8)',
    borderRadius: 12,
    borderWidth: 3,
    borderColor: COLORS.cyberBlue,
    overflow: 'hidden',
    position: 'relative',
  },
  gridOverlay: {
    ...StyleSheet.absoluteFillObject,
    pointerEvents: 'none',
  },
  gridLine: {
    position: 'absolute',
    width: 1,
    height: '100%',
    backgroundColor: 'rgba(0, 255, 255, 0.1)',
  },
  gridLineHorizontal: {
    position: 'absolute',
    width: '100%',
    height: 1,
    backgroundColor: 'rgba(0, 255, 255, 0.1)',
  },
  boardGlow: {
    ...StyleSheet.absoluteFillObject,
    borderWidth: 2,
    borderColor: COLORS.cyberBlue,
    borderRadius: 12,
    opacity: 0.5,
    shadowColor: COLORS.cyberBlue,
    shadowOffset: { width: 0, height: 0 },
    shadowRadius: 20,
    shadowOpacity: 0.8,
  },
  cell: {
    width: CELL_SIZE,
    height: CELL_SIZE,
  },
  row: {
    flexDirection: 'row',
  },
  snakeHeadCell: {
    width: CELL_SIZE,
    height: CELL_SIZE,
    borderRadius: CELL_SIZE / 4,
    overflow: 'hidden',
    position: 'relative',
  },
  headGlow: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: COLORS.snakeHead,
    borderRadius: CELL_SIZE / 4,
    opacity: 0.5,
    transform: [{ scale: 1.5 }],
  },
  snakeBodyCell: {
    width: CELL_SIZE,
    height: CELL_SIZE,
    borderRadius: CELL_SIZE / 4,
  },
  foodCell: {
    width: CELL_SIZE,
    height: CELL_SIZE,
    borderRadius: CELL_SIZE / 2,
    overflow: 'hidden',
    position: 'relative',
  },
  foodGlow: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: COLORS.foodColor,
    borderRadius: CELL_SIZE / 2,
    opacity: 0.3,
    transform: [{ scale: 1.5 }],
  },
  pauseOverlay: {
    ...StyleSheet.absoluteFillObject,
    alignItems: 'center',
    justifyContent: 'center',
  },
  pauseMessage: {
    padding: 30,
    borderRadius: 20,
    alignItems: 'center',
    borderWidth: 3,
    borderColor: COLORS.cyberBlue,
  },
  pauseTitle: {
    fontSize: 36,
    fontWeight: '900',
    color: COLORS.cyberBlue,
    marginBottom: 10,
    fontFamily: 'Courier New',
    letterSpacing: 3,
  },
  pauseSubtitle: {
    fontSize: 18,
    color: 'white',
    fontFamily: 'Courier New',
  },
  gameOverOverlay: {
    ...StyleSheet.absoluteFillObject,
    alignItems: 'center',
    justifyContent: 'center',
  },
  gameOverMessage: {
    padding: 40,
    borderRadius: 20,
    alignItems: 'center',
    borderWidth: 4,
    borderColor: COLORS.snakeHead,
    shadowColor: COLORS.snakeHead,
    shadowOffset: { width: 0, height: 0 },
    shadowRadius: 30,
    shadowOpacity: 1,
  },
  gameOverTitle: {
    fontSize: 48,
    fontWeight: '900',
    color: 'white',
    marginBottom: 20,
    fontFamily: 'Courier New',
    letterSpacing: 4,
  },
  gameOverScore: {
    fontSize: 28,
    color: COLORS.matrixGreen,
    marginBottom: 10,
    fontFamily: 'Courier New',
    letterSpacing: 2,
  },
  gameOverHighScore: {
    fontSize: 24,
    color: COLORS.scoreHighlight,
    marginBottom: 30,
    fontFamily: 'Courier New',
    letterSpacing: 2,
  },
  gameOverButton: {
    width: 200,
    height: 50,
    borderRadius: 25,
    overflow: 'hidden',
  },
  gameOverButtonGradient: {
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  gameOverButtonText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
    fontFamily: 'Courier New',
    letterSpacing: 2,
  },
  controlsPanel: {
    padding: 20,
    paddingBottom: 30,
  },
  controlsGradient: {
    padding: 20,
    borderRadius: 20,
    borderWidth: 2,
    borderColor: COLORS.cyberBlue,
  },
  controlsTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: COLORS.cyberBlue,
    textAlign: 'center',
    marginBottom: 20,
    fontFamily: 'Courier New',
    letterSpacing: 2,
  },
  controlsGrid: {
    alignItems: 'center',
  },
  controlRow: {
    flexDirection: 'row',
    marginBottom: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  controlButton: {
    width: 70,
    height: 70,
    marginHorizontal: 10,
  },
  controlButtonGradient: {
    width: '100%',
    height: '100%',
    borderRadius: 35,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 3,
    borderColor: 'white',
  },
  controlButtonText: {
    fontSize: 32,
    color: 'white',
    fontWeight: 'bold',
  },
  controlCenter: {
    width: 40,
  },
  swipeHint: {
    textAlign: 'center',
    color: COLORS.cyberBlue,
    marginTop: 15,
    fontFamily: 'Courier New',
    fontSize: 14,
  },
  speedIndicator: {
    position: 'absolute',
    bottom: 10,
    right: 10,
    backgroundColor: 'rgba(0, 20, 40, 0.8)',
    padding: 10,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: COLORS.cyberBlue,
  },
  speedText: {
    color: COLORS.cyberBlue,
    fontSize: 12,
    fontFamily: 'Courier New',
    marginBottom: 5,
  },
  speedBar: {
    width: 100,
    height: 4,
    backgroundColor: 'rgba(0, 255, 255, 0.2)',
    borderRadius: 2,
    overflow: 'hidden',
  },
  speedFill: {
    height: '100%',
    backgroundColor: COLORS.matrixGreen,
    borderRadius: 2,
  },
});