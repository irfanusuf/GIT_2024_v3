// import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { useEffect, useState, useRef } from 'react';
import { View, Text, StyleSheet, Button, TouchableOpacity } from 'react-native';
// import { RootStackParamList } from '../App';

// type Props = NativeStackScreenProps<RootStackParamList, 'Snake'>;

const CELL_SIZE = 10;
const BOARD_SIZE = 30          ;

type Position = { x: number; y: number };



type Direction = 'UP' | 'DOWN' | 'LEFT' | 'RIGHT';

export default function Snake() {



  const [snake, setSnake] = useState<Position[]>    ([{ x: 0, y: 0 }]);
  const [score , setScore] = useState(0)
  const [food, setFood] = useState<Position>({ x: 3, y: 3 });
  const [direction, setDirection] = useState<Direction>('RIGHT');
  const [gameOver, setGameOver] = useState(false);
  const moveInterval = useRef<ReturnType<typeof setInterval> | null>(null);

  // Generate random food NOT on snake // need some Work
  const generateFood = (snakePositions: Position[]): Position => {
    let newFood: Position;
    do {
      newFood = {
        x: Math.floor(Math.random() * BOARD_SIZE),
        y: Math.floor(Math.random() * BOARD_SIZE),
      };
    } while (
      snakePositions.some(pos => pos.x === newFood.x && pos.y === newFood.y)
    );
    return newFood;
  };

  // Move snake one step in current direction
  const moveSnake = () => {
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

      // Check wall collision
      if (
        newHead.x < 0 ||
        newHead.x >= BOARD_SIZE ||
        newHead.y < 0 ||
        newHead.y >= BOARD_SIZE
      ) {
        setGameOver(true);
        if (moveInterval.current) clearInterval(moveInterval.current);
        return prevSnake;
      }

      // Check self collision
      if (
        prevSnake.some(
          segment => segment.x === newHead.x && segment.y === newHead.y,
        )
      ) {
        setGameOver(true);
        if (moveInterval.current) clearInterval(moveInterval.current);
        return prevSnake;
      }



      let newSnake = [newHead, ...prevSnake];

      // If food eaten, grow snake, else remove tail
      if (newHead.x === food.x && newHead.y === food.y) {
        setFood(generateFood(newSnake));
        setScore(score => score + 10 )
      } else {
        newSnake.pop();
      }

      return newSnake;
    });
  };

  // Game loop interval
  useEffect(() => {
    if (!gameOver) {
      moveInterval.current = setInterval(moveSnake, 100);
      return () => {
        if (moveInterval.current) clearInterval(moveInterval.current);
      };
    }
  }, [direction, gameOver]);

  // Change direction, disallow reverse
  const changeDirection = (newDirection: Direction) => {
    if (
      (direction === 'UP' && newDirection === 'DOWN') ||
      (direction === 'DOWN' && newDirection === 'UP') ||
      (direction === 'LEFT' && newDirection === 'RIGHT') ||
      (direction === 'RIGHT' && newDirection === 'LEFT')
    ) {
      return;
    }
    setDirection(newDirection);
  };

  const restartGame = () => {
    setSnake([{ x: 7, y: 7 }]);
    setFood({ x: 3, y: 3 });
    setDirection('RIGHT');
    setGameOver(false);
  };

  // Render the board rows and cells for clearer grid
  const renderBoard = () => {
    let rows = [];
    for (let y = 0; y < BOARD_SIZE; y++) {
      let cells = [];
      for (let x = 0; x < BOARD_SIZE; x++) {
        const isSnake = snake.some(pos => pos.x === x && pos.y === y);
        const isFood = food.x === x && food.y === y;
        cells.push(
          <View
            key={`${x}-${y}`}
            style={[
              styles.cell,
              isSnake && styles.snakeCell,
              isFood && styles.foodCell,
            ]}
          />,
        );
      }
      rows.push(
        <View key={`row-${y}`} style={styles.row}>
          {cells}
        </View>,
      );
    }
    return rows;
  };

  return (
    <>
      <View style={styles.container}>
        <Text style={styles.title}>Snake Game  Score  : {score}</Text>

        <View style={styles.board}>{renderBoard()}</View>

        {gameOver && (
          <View style={styles.gameOverContainer}>
            <Text style={styles.gameOverText}>Game Over!</Text>
            <Button title="Restart" onPress={restartGame} />
          </View>
        )}

      </View>

      <View style={styles.controls}>
          <TouchableOpacity
            onPress={() => changeDirection('UP')}
            style={styles.controlButton}
          >
            <Text style={styles.controlText}>↑</Text>
          </TouchableOpacity>
      

        <View style={styles.controlRow}>
          <TouchableOpacity
            onPress={() => changeDirection('LEFT')}
            style={styles.controlButton}
          >
            <Text style={styles.controlText}>←</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => changeDirection('RIGHT')}
            style={styles.controlButton}
          >
            <Text style={styles.controlText}>→</Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity
          onPress={() => changeDirection('DOWN')}
          style={styles.controlButton}
        >
          <Text style={styles.controlText}>↓</Text>
        </TouchableOpacity>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 40,
    alignItems: 'center',
    backgroundColor: '#222',
  },
  title: { fontSize: 28, fontWeight: 'bold', color: 'white', marginBottom: 20 },
  board: {
    backgroundColor: '#333',
    borderWidth: 2,
    borderColor: 'white',
  },
  row: {
    flexDirection: 'row',
  },
  cell: {
    width: CELL_SIZE,
    height: CELL_SIZE,
    borderWidth: 0.5,
    borderColor: '#555',
  },
  snakeCell: {
    backgroundColor: 'lime',
  },
  foodCell: {
    backgroundColor: 'red',
  },
  controls: {
    marginVertical: 30,
    width: CELL_SIZE * 16,
    margin : "auto",
    display : "flex",
    justifyContent : "center",
    alignItems : "center",
  },
  controlRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 5,
    width: 180,
  },
  controlButton: {
    backgroundColor: '#555',
    padding: 15,
    borderRadius: 8,
    width: 60,
    alignItems: 'center',
  },

  controlText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 22,
  },
  gameOverContainer: {
    marginTop: 20,
    alignItems: 'center',
  },
  gameOverText: {
    fontSize: 24,
    color: 'red',
    marginBottom: 10,
  },
});
