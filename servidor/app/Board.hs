module Board where

import Types
import Data.List (nub, sort)

-- Funciones para manipular el tablero
showBoard :: Board -> String
showBoard board = unlines (map showRow (chunksOf 8 board))

chunksOf :: Int -> [a] -> [[a]]
chunksOf _ [] = []
chunksOf n xs = take n xs : chunksOf n (drop n xs)

showRow :: [Element] -> String
showRow row = concatMap showElement row

showElement :: Element -> String
showElement E = "_"
showElement X = "X"
showElement O = "O"

applyMove :: [(Integer, Element)] -> Board -> Board
applyMove [] board = board
applyMove ((n, e):ls) board = applyMove ls (updateBoard n e board)

updateBoard :: Integer -> Element -> Board -> Board
updateBoard n e board = take (fromIntegral n) board ++ [e] ++ drop (fromIntegral n + 1) board
