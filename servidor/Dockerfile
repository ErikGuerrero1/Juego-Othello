FROM haskell:9.2.8

WORKDIR /app

COPY servidor/ .

RUN cabal update && cabal build servidor

CMD ["cabal", "run", "servidor"]
