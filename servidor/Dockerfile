FROM haskell:9.2.8

WORKDIR /app

# Copiamos solo la carpeta "servidor"
COPY servidor servidor

# Nos movemos a la carpeta correcta
WORKDIR /app/servidor

# Instalamos las dependencias y compilamos
RUN cabal update && cabal build servidor

# Ejecutamos el servidor
CMD ["cabal", "run", "servidor"]
