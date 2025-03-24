FROM haskell:9.2.8

WORKDIR /app

COPY . .

RUN ls -la
RUN cabal update
RUN cabal build servidor

CMD ["cabal", "run", "servidor"]
