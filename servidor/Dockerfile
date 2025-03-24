FROM haskell:9.6.4

WORKDIR /app

COPY . .

WORKDIR /app/servidor

RUN ls -la
RUN cabal update
RUN cabal build servidor

CMD ["cabal", "run", "servidor"]
