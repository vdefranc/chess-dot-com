const axios = require('axios');
const { Chess: Chessjs } = require('chess.js')

axios.get('https://api.chess.com/pub/player/vindefran/games/2019/09')
  .then(({ data }) => {
    const { games } = data;

    const gamesMap = games.reduce((acc, game) => {
      const colorPlayed = game.white.username === 'vindefran' ? 'white' : 'black'
      acc[colorPlayed].push(game);

      return acc;
    }, {white: [], black: []});


    const gamesWhereIPlayedSicilian = gamesMap.black.filter(game => {
      const moves = getGameMovesFromPgn(game.pgn);

      return moves[1] === 'c5';
    })

    const numSicilianWins = gamesWhereIPlayedSicilian.filter(game => {
      return game.black.result === 'win'
    })

    const sicilianWinRate = numSicilianWins.length / gamesWhereIPlayedSicilian.length

    const gamesWhereIPlayedStonewall = gamesMap.black.filter(game => {
      const moves = getGameMovesFromPgn(game.pgn);

      return moves[1] === 'f5';
    })

    const numStonewallWins = gamesWhereIPlayedStonewall.filter(game => {
      return game.black.result === 'win'
    })

    const stonewallWinRate = numStonewallWins.length / gamesWhereIPlayedStonewall.length
  })
  .catch(e => {
    console
  })

function getGameMovesFromPgn(pgn) {
  const chess = new Chessjs();
  chess.load_pgn(pgn)

  return chess.history()
}
