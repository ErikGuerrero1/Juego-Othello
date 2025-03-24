module Game where

import Types
import Board
import AI
import Data.List (nub)

-- Función para calcular el movimiento de la IA
calculateMove :: Board -> IO ()
calculateMove board = do
    let move = head (fst (bestMv X board 4))
    let newBoard = applyMove [(move, X)] board
    putStrLn $ "El movimiento de la IA es: " ++ show move
    putStrLn $ showBoard newBoard
    return newBoard
