const axios = require('axios');

// axios.get('https://api.chess.com/pub/player/vindefran')
//   .then(data => {
//     console
//   })

//  https://api.chess.com/pub/player/{username}/games/{YYYY}/{MM}

axios.get('https://api.chess.com/pub/player/vindefran/games/2019/09')
  .then(({ data }) => {
    const { games } = data;

    const gamesMap = games.reduce((acc, game) => {
      const colorPlayed = game.white.username === 'vindefran' ? 'white' : 'black'
      acc[colorPlayed].push(game)

      return acc;
    }, {white: [], black: []});

    const numWinsAsBlack = gamesMap.black.filter(({black}) => black.result === 'win').length
    const numWinsAsWhite = gamesMap.white.filter(({white}) => white.result === 'win').length

    const whiteWinPercentage = numWinsAsWhite / gamesMap.white.length
    const blackWinPercentage = numWinsAsBlack / gamesMap.black.length

    numWinsAsBlack
  })

