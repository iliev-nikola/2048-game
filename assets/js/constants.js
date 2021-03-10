const GAME_OVER = utils.querySelect('.game-over');
const GAME_OVER_TEXT = utils.getById('gameOver');
const POINTS_COUNTER = utils.getById('pointsCounter');
const CURRENT_BEST_COUNTER = utils.getById('currentBestCounter');
const USER_BEST_COUNTER = utils.getById('bestCounter');
const NEW_GAME = utils.querySelect('#newGame > button');
const PLUS_SCORE = utils.getById('plus');
const FOOTER_STRONG = utils.querySelect('.footer > strong');
const FOOTER_INSTRUCTIONS = utils.querySelect('.footer > p');
const COLORS = {
    ' ': 'grey',
    2: 'antiquewhite',
    4: 'rgb(208, 211, 49)',
    8: 'rgb(240, 135, 49)',
    16: 'rgb(180, 81, 0)',
    32: 'rgb(216, 56, 8)',
    64: 'rgb(233, 35, 35)',
    128: 'rgb(5, 168, 114)',
    256: 'rgb(5, 103, 168)',
    512: 'rgb(36, 160, 36)',
    1024: 'rgb(1, 110, 52)',
    2048: 'rgb(124, 67, 13)'
};