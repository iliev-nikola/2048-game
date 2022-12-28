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
    0: 'rgb(128, 128, 128)',
    2: 'rgb(250, 235, 215)',
    4: 'rgb(208, 211, 49)',
    8: 'rgb(240, 135, 49)',
    16: 'rgb(161 73 1)',
    32: 'rgb(244 70 17)',
    64: 'rgb(226 33 241)',
    128: 'rgb(5, 168, 114)',
    256: 'rgb(5, 103, 168)',
    512: 'rgb(36, 160, 36)',
    1024: 'rgb(1, 110, 52)',
    2048: 'rgb(124, 67, 13)',
    'newGameBackground': 'rgb(56, 53, 53)',
    'newGameBackgroundHover': 'rgb(93, 91, 91)'
};
const KEYS = {
    up: 'ArrowUp',
    down: 'ArrowDown',
    left: 'ArrowLeft',
    right: 'ArrowRight',
    space: ' '
};