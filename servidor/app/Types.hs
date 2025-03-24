{-# LANGUAGE DeriveAnyClass #-}
{-# LANGUAGE DerivingStrategies #-}

module Types where

import Data.Text (pack)
import Data.Aeson (ToJSON, toJSON, Value(..))

-- Definir la instancia de ToJSON para tu tipo
instance ToJSON TuTipo where
  toJSON X     = String (pack "X")
  toJSON O     = String (pack "O")
  toJSON Blank = String (pack "_")

