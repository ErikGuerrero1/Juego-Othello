import { useState, useEffect } from "react";
import "./App.css"; // Importa el archivo CSS

const App = () => {
  const [board, setBoard] = useState<string[] | null>(null); // Estado del tablero
  const [turn, setTurn] = useState<string>(""); // Turno actual
  const [fichasNegras, setFichasNegras] = useState<string>("0");
  const [fichasBlancas, setFichasBlancas] = useState<string>("0");
  const [numMovimientos, setNumMovimientos] = useState<string | null>(null);
  const [movimientos, setMovimientos] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const [gameActive, setGameActive] = useState<boolean>(false); // Controla si el juego está activo
  let estado: boolean = false;


  // Cargar el tablero al montar el componente (inicial)
  useEffect(() => {
    fetchReinicar();
    fetchBoard(); // Cargar el estado del tablero
  }, []);  // Este useEffect solo se ejecuta una vez, al montar el componente

  // Función para obtener el estado del tablero actual
  const fetchBoard = async () => {
    try {
      const response = await fetch("https://juego-othello.onrender.com/board");
      if (!response.ok) {
        throw new Error("Failed to fetch board data");
      }
      const data = await response.json();
      setBoard(data.tablero);
      setTurn(data.turno);
    } catch (err) {
      console.error("Error fetching board:", err);
      setError("Error fetching board state.");
    }
  };

  // Función para obtener el estado del tablero actual
  const fetchBoard2 = async () => {
    try {
      const response = await fetch("https://juego-othello.onrender.com/boardVariant");
      if (!response.ok) {
        throw new Error("Failed to fetch board data");
      }
      const data = await response.json();
      estado=true;
      setBoard(data.tablero);
      setTurn(data.turno);
    } catch (err) {
      console.error("Error fetching board:", err);
      setError("Error fetching board state.");
    }
  };

  // Función para reiniciar el tablero
  const fetchReinicar = async () => {
    try {
      const response = await fetch("https://juego-othello.onrender.com/reset");
      if (!response.ok) {
        throw new Error("Failed to fetch board data");
      }

    } catch (err) {
      console.error("Error fetching board reset:", err);
    }
  };

  // Función para que la IA realice su movimiento
  const realizarMovimientoIA = async () => {
    try {
      const response = await fetch("https://juego-othello.onrender.com/movementIA");
      if (!response.ok) {
        throw new Error("Error fetching IA move");
      }
      const data = await response.json();

      // Actualizar tablero y estado después del movimiento de la IA
      if(estado==true)
        fetchBoard2();
      else
        fetchBoard();
      setFichasNegras(data.fichas_negras);
      setFichasBlancas(data.fichas_blancas);
      setNumMovimientos(data.num_movimientos);
      setMovimientos(data.movimientos); // Asegúrate de que los movimientos estén actualizados
    } catch (err) {
      console.error("Error with IA move:", err);
      setError("Error with IA move.");
    }
  };

  // Función para iniciar el juego
  const startGame = async () => {
    setGameActive(true); // El juego ya está activo
    await fetchBoard();  // Actualizar el estado inicial del tablero
    await realizarMovimientoIA();  // La IA realiza el primer movimiento
  };

    // Función para iniciar el juego
    const startGame2 = async () => {
      setGameActive(true); // El juego ya está activo
      await fetchBoard2();  // Actualizar el estado inicial del tablero
      await realizarMovimientoIA();  // La IA realiza el primer movimiento
    };

  // Manejar el clic del jugador en una celda
  const handleCellClick = async (index: number) => {
    if (!gameActive || turn !== "X") {
      return; // Ignorar si el juego no está activo o no es el turno del jugador
    }

    // Verificar si es una celda de movimiento válido
    if (!isPossibleMove(index)) {
      return; // Ignorar clic si no es un movimiento válido
    }

    // Calcular la fila y columna basados en la posición en la matriz
    const fila = Math.floor(index / 8) + 1;  // Las filas son 1-8
    const columna = (index % 8) + 1;         // Las columnas son 1-8

    // Concatenar fila y columna para formar la posición (ejemplo: "43" para fila 4, columna 3)
    const posicion = `${fila}${columna}`;

    try {
      console.log(`Jugador seleccionó la celda: Fila ${fila}, Columna ${columna}, Posición: ${posicion}`);

      // Enviar el movimiento del jugador al servidor con la posición en la URL
      const response = await fetch(`https://juego-othello.onrender.com/movementPlayerVsIA/${posicion}`, {
        method: "GET", // Método GET con la posición en la URL
      });

      if (!response.ok) {
        throw new Error("Error realizando movimiento del jugador");
      }

      // Actualizar el tablero después del movimiento del jugador
      const data = await response.json();
      console.log("Nuevo estado del tablero:", data.tablero);
      setBoard(data.tablero); // Actualiza el tablero con el nuevo estado

      // Después del movimiento del jugador, la IA hace su turno
      await realizarMovimientoIA();

    } catch (err) {
      console.error("Error al procesar el movimiento del jugador:", err);
      setError("Error al procesar el movimiento del jugador.");
    }
  };

  // Asumiendo que los movimientos son un array de números, como [43, 63, 65]
  const isPossibleMove = (index: number) => {
    if (!movimientos) return false;  // Asegúrate de que movimientos no sea null o vacío

    const posiblesMovimientos = JSON.parse(movimientos); // Convertir la cadena a un array de números
    const fila = Math.floor(index / 8) + 1;
    const columna = (index % 8) + 1;
    const posicion = `${fila}${columna}`;

    return posiblesMovimientos.includes(parseInt(posicion));  // Compara si la posición está en los movimientos posibles
  };

  return (
    <div className="game-container">
      <h1 className="game-title">Othello Game</h1>

      {!gameActive && (
        <button
          onClick={startGame}
          className="start-button"
        >
          Iniciar Juego Normal
        </button>
      )}
      
      {!gameActive && (
        <button
          onClick={startGame2}
          className="start-button"
        >
          Iniciar Juego Variante
        </button>
      )}

      {error && (
        <div className="error-message">
          {error}
        </div>
      )}

      {board ? (
        <div className="board-container">
          {board.map((cell, index) => (
            <button
              key={index}
              onClick={() => handleCellClick(index)}
              className={`cell 
                ${isPossibleMove(index) && cell === "_" ? "possible-move" : ""}
                ${cell === "_" ? "empty" : ""}
                ${cell === "X" ? "black" : ""}
                ${cell === "O" ? "white" : ""}`}
            >
              {cell !== "_" && !isPossibleMove(index) ? cell : ""}
            </button>
          ))}
        </div>
      ) : (
        <p className="loading-text">Cargando tablero...</p>
      )}

      <div className="stats-container">
        <p>
          <span className="stats-label">Juegas contra la ficha:</span> {turn}
        </p>
        <p className="stats">
          <span className="stats-label">Fichas Negras(X):</span> {fichasNegras} | <span className="stats-label">Fichas Blancas(O):</span> {fichasBlancas}
        </p>
        <p className="stats">
          <span className="stats-label">Total Movimientos posibles:</span> {numMovimientos}
        </p>
      </div>
    </div>
  );
};

export default App;
