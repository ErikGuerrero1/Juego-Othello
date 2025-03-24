FROM haskell:9.2.8

WORKDIR /app

COPY . .

RUN cabal update && cabal build servidor

CMD ["cabal", "run", "servidor"]
