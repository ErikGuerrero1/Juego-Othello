module AI where

import Types
import Board

-- Función principal para la IA (por ejemplo, minimax)
bestMv :: Element -> Board -> Int -> ([Integer], Int)
bestMv player board level = minimax (genTree player board level)

minimax :: TreeG -> ([Integer], Int)
minimax (T board []) = ([0], 0)  -- Lógica del algoritmo minimax
minimax (T board (child:children)) = ([0], 0)  -- Lógica de los nodos hijos
