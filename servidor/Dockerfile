FROM haskell:9.2.8

WORKDIR /app

# Copiamos solo el servidor (no todo el proyecto)
COPY servidor/ .

# Actualizamos cabal y compilamos el ejecutable
RUN cabal update && cabal build servidor

# Ejecutamos el servidor
CMD ["cabal", "run", "servidor"]
