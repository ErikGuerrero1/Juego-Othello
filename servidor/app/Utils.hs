module Utils where

import Types (Element(..))  -- Importamos el tipo Element desde Types

-- Función change para cambiar entre X y O
change :: Element -> Element
change X     = O
change O     = X
change Blank = Blank
