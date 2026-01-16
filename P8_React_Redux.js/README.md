


npx create-react-app sticker-smash



npx @tailwindcss/cli -i ./src/styles/input.css -o ./src/styles/output.css --watch




 const [count, setCount] = useState(40);


  const [explosionCounter, SetEXplosionCounter] = useState(10)


  function handleIncrement() {
    setCount((count) => count + 1);
  }

  function handleDecrement() {
    if (count > 0) {
      setCount((count) => count - 1);
    }
  }


  useEffect(() => {

    SetEXplosionCounter((explosionCounter) => explosionCounter - 1)

  } , [] )
