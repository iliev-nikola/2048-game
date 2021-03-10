(function () {
    // GAME
    let matrix = [];
    let points = 0;
    let newPoints = 0;

    function createMatrix() {
        points = 0;
        matrix = []
        for (let row = 0; row < 4; row++) {
            const currentRow = [];
            currentRow.length = 4;
            currentRow.fill('');
            matrix.push(currentRow);
        }

        const row = Math.floor(Math.random() * 4);
        const col = Math.floor(Math.random() * 4);
        matrix[row][col] = 2;
        GAME_OVER.style.opacity = 0;
        USER_BEST_COUNTER.innerText = utils.getBestPoints();
        render();
    }

    function render() {
        if (!isContainZero()) {
            return;
        }

        if (points > utils.getBestPoints()) {
            USER_BEST_COUNTER.innerText = points;
        }

        if (points > CURRENT_BEST_COUNTER.innerText) {
            CURRENT_BEST_COUNTER.innerText = points;
        }

        if (newPoints) {
            PLUS_SCORE.innerHTML = `<p>+${newPoints}</p>`;
            newPoints = 0;
        }

        randomizer();

        const divs = Array.from(document.getElementsByClassName('row'));
        for (let row = 0; row < 4; row++) {
            const div = Array.from(divs[row].children);
            for (let col = 0; col < 4; col++) {
                // create a cell and set background color
                div[col].innerHTML = '';
                const p = document.createElement('p');
                p.innerText = matrix[row][col];
                if (p.innerText > 4) {
                    p.style.color = 'white';
                }

                div[col].appendChild(p);
                if (matrix[row][col]) {
                    p.parentElement.style.backgroundColor = COLORS[matrix[row][col]];
                } else {
                    p.parentElement.style.backgroundColor = 'grey';
                }
            }
        }

        // set points
        POINTS_COUNTER.innerText = points;

        if (isWinner()) {
            GAME_OVER_TEXT.innerText = `Congratulations! You WON! ${String.fromCodePoint(129321)}`;
            GAME_OVER.style.opacity = 0.8;
        }

        if (isGameOver()) {
            GAME_OVER.style.opacity = 0.8;
            if (points > utils.getBestPoints()) {
                localStorage.bestPoints = points;
            }
        }
    }

    function randomizer() {
        if (!isContainZero()) {
            return;
        }

        while (true) {
            const row = Math.floor(Math.random() * 4);
            const col = Math.floor(Math.random() * 4);
            const chance = Math.random();

            if (matrix[row][col] === '') {
                matrix[row][col] = chance < 0.9 ? 2 : 4;
                break;
            }
        }
    }

    function isWinner() {
        for (let row = 0; row < 4; row++) {
            let isContain2048 = matrix[row].some(x => x === 2048);

            if (isContain2048) {
                return true;
            }
        }

        return false;
    }

    function isGameOver() {
        for (let row = 0; row < 4; row++) {
            let isContainZero = matrix[row].some(x => x === '');

            if (isContainZero) {
                return false;
            }

            if (row === 3) {
                break;
            }

            for (let col = 0; col < 3; col++) {
                let current = matrix[row][col];
                if (current === matrix[row][col + 1] || current === matrix[row + 1][col]) {
                    return false;
                }
            }
        }

        for (let col = 0; col < 3; col++) {
            if (matrix[3][col] === matrix[3][col + 1] || matrix[col][3] === matrix[col + 1][3]) {
                return false;
            }
        }

        return true;
    }

    function isContainZero() {
        for (let row = 0; row < 4; row++) {
            if (matrix[row].some(x => x === '')) {
                return true;
            }
        }

        return false;
    }

    // KEYS
    function up() {
        let isStuck = true;
        for (let col = 0; col < 4; col++) {
            let rowIndexZero = 0;
            let rowIndexNonZero = 0;
            let counterZero = 0;
            let counterNum = 0;
            for (let row = 0; row < 4; row++) {
                let current = matrix[row][col];
                if (current === '') {
                    // if I found zero
                    if (counterZero > 0) {
                        // if there's zero already before
                        continue;
                    } else {
                        // if it's first zero
                        rowIndexZero = row;
                        counterZero++;
                    }
                } else {
                    // if I found a number and I have previous
                    if (counterNum > 0) {
                        if (current === matrix[rowIndexNonZero][col]) {
                            // if two numbers are equal
                            matrix[rowIndexNonZero][col] *= 2;
                            newPoints += matrix[rowIndexNonZero][col];
                            points += matrix[rowIndexNonZero][col];
                            matrix[row][col] = '';
                            rowIndexZero = rowIndexNonZero + 1;
                            counterZero++;
                            counterNum = 0;
                            isStuck = false;
                        } else if (counterZero > 0) {
                            // if they're not equal and I have zero before
                            matrix[rowIndexZero][col] = current;
                            matrix[row][col] = '';
                            rowIndexNonZero = rowIndexZero;
                            rowIndexZero++;
                            counterZero++;
                            isStuck = false;
                        } else {
                            // if they're not equal and I have no zero before
                            rowIndexNonZero = row;
                        }
                    } else {
                        // if I found a number for a first time
                        if (counterZero > 0) {
                            // if I have zero before
                            matrix[rowIndexZero][col] = current;
                            matrix[row][col] = '';
                            counterNum++;
                            rowIndexNonZero = rowIndexZero;
                            rowIndexZero++;
                            isStuck = false;
                        } else {
                            // if I don't have zero before
                            counterNum++;
                            rowIndexNonZero = row;
                        }
                    }
                }
            }
        }

        if (!isStuck) {
            render();
        }
    }

    function down() {
        let isStuck = true;
        for (let col = 0; col < 4; col++) {
            let rowIndexZero = 3;
            let rowIndexNonZero = 3;
            let counterZero = 0;
            let counterNum = 0;
            for (let row = 3; row >= 0; row--) {
                let current = matrix[row][col];
                if (current === '') {
                    // if I found zero
                    if (counterZero > 0) {
                        // if there's zero already before
                        continue;
                    } else {
                        // if it's first zero
                        rowIndexZero = row;
                        counterZero++;
                    }
                } else {
                    // if I found a number and I have previous
                    if (counterNum > 0) {
                        // if two numbers are equal
                        if (current === matrix[rowIndexNonZero][col]) {
                            matrix[rowIndexNonZero][col] *= 2;
                            newPoints += matrix[rowIndexNonZero][col];
                            points += matrix[rowIndexNonZero][col];
                            matrix[row][col] = '';
                            rowIndexZero = rowIndexNonZero - 1;
                            counterZero++;
                            counterNum = 0;
                            isStuck = false;
                        } else if (counterZero > 0) {
                            // if they're not equal and I have zero before
                            matrix[rowIndexZero][col] = current;
                            matrix[row][col] = '';
                            rowIndexNonZero = rowIndexZero;
                            rowIndexZero--;
                            counterZero++;
                            isStuck = false;
                        } else {
                            // if they're not equal and I have no zero before
                            rowIndexNonZero = row;
                        }
                    } else {
                        // if I found a number for a first time
                        if (counterZero > 0) {
                            // if I have zero before
                            matrix[rowIndexZero][col] = current;
                            matrix[row][col] = '';
                            counterNum++;
                            rowIndexNonZero = rowIndexZero;
                            rowIndexZero--;
                            isStuck = false;
                        } else {
                            // if I don't have zero before
                            counterNum++;
                            rowIndexNonZero = row;
                        }
                    }
                }
            }
        }

        if (!isStuck) {
            render();
        }
    }

    function left() {
        let isStuck = true;
        for (let row = 0; row < 4; row++) {
            let colIndexZero = 0;
            let colIndexNonZero = 0;
            let counterZero = 0;
            let counterNum = 0;
            for (let col = 0; col < 4; col++) {
                let current = matrix[row][col];
                if (current === '') {
                    // if I found zero
                    if (counterZero > 0) {
                        // if there's zero already before
                        continue;
                    } else {
                        // if it's first zero
                        colIndexZero = col;
                        counterZero++;
                    }
                } else {
                    // if I found a number and I have previous
                    if (counterNum > 0) {
                        // if two numbers are equal
                        if (current === matrix[row][colIndexNonZero]) {
                            matrix[row][colIndexNonZero] *= 2;
                            newPoints += matrix[row][colIndexNonZero];
                            points += matrix[row][colIndexNonZero];
                            matrix[row][col] = '';
                            colIndexZero = colIndexNonZero + 1;
                            counterZero++;
                            counterNum = 0;
                            isStuck = false;
                        } else if (counterZero > 0) {
                            // if they're not equal and I have zero before
                            matrix[row][colIndexZero] = current;
                            matrix[row][col] = '';
                            colIndexNonZero = colIndexZero;
                            colIndexZero++;
                            counterZero++;
                            isStuck = false;
                        } else {
                            // if they're not equal and I have no zero before
                            colIndexNonZero = col;
                        }
                    } else {
                        // if I found a number for a first time
                        if (counterZero > 0) {
                            // if I have zero before
                            matrix[row][colIndexZero] = current;
                            matrix[row][col] = '';
                            counterNum++;
                            colIndexNonZero = colIndexZero;
                            colIndexZero++;
                            isStuck = false;
                        } else {
                            // if I don't have zero before
                            counterNum++;
                            colIndexNonZero = col;
                        }
                    }
                }
            }
        }

        if (!isStuck) {
            render();
        }
    }

    function right() {
        let isStuck = true;
        for (let row = 0; row < 4; row++) {
            let colIndexZero = 3;
            let colIndexNonZero = 3;
            let counterZero = 0;
            let counterNum = 0;
            for (let col = 3; col >= 0; col--) {
                let current = matrix[row][col];
                if (current === '') {
                    // if I found zero
                    if (counterZero > 0) {
                        // if there's zero already before
                        continue;
                    } else {
                        // if it's first zero
                        colIndexZero = col;
                        counterZero++;
                    }
                } else {
                    // if I found a number and I have previous
                    if (counterNum > 0) {
                        if (current === matrix[row][colIndexNonZero]) {
                            // if two numbers are equal
                            matrix[row][colIndexNonZero] *= 2;
                            newPoints += matrix[row][colIndexNonZero];
                            points += matrix[row][colIndexNonZero];
                            matrix[row][col] = '';
                            colIndexZero = colIndexNonZero - 1;
                            counterZero++;
                            counterNum = 0;
                            isStuck = false;
                        } else if (counterZero > 0) {
                            // if they're not equal and I have zero before
                            matrix[row][colIndexZero] = current;
                            matrix[row][col] = '';
                            colIndexNonZero = colIndexZero;
                            colIndexZero--;
                            counterZero++;
                            isStuck = false;
                        } else {
                            // if they're not equal and I have no zero before
                            colIndexNonZero = col;
                        }
                    } else {
                        // if I found a number for a first time
                        if (counterZero > 0) {
                            // if I have zero before
                            matrix[row][colIndexZero] = current;
                            matrix[row][col] = '';
                            counterNum++;
                            colIndexNonZero = colIndexZero;
                            colIndexZero--;
                            isStuck = false;
                        } else {
                            // if I don't have zero before
                            counterNum++;
                            colIndexNonZero = col;
                        }
                    }
                }
            }
        }

        if (!isStuck) {
            render();
        }
    }

    function onSpaceUp(e) {
        if (e.key === ' ') {
            NEW_GAME.style.backgroundColor = 'rgb(93, 91, 91)';
            NEW_GAME.addEventListener('mouseover', () => {
                NEW_GAME.style.backgroundColor = 'rgb(56, 53, 53)';
            });
            NEW_GAME.addEventListener('mouseout', () => {
                NEW_GAME.style.backgroundColor = 'rgb(93, 91, 91)';
            });
        }
    }

    function keysListener(e) {
        if (e.key === 'ArrowUp') {
            up();
        } else if (e.key === 'ArrowRight') {
            right();
        } else if (e.key === 'ArrowDown') {
            down();
        } else if (e.key === 'ArrowLeft') {
            left();
        } else if (e.key === ' ') {
            createMatrix();
            NEW_GAME.style.backgroundColor = 'rgb(56, 53, 53)';
        }
    }

    // Listeners
    document.addEventListener("DOMContentLoaded", createMatrix);
    NEW_GAME.addEventListener('click', createMatrix);
    document.body.addEventListener('keydown', keysListener);
    document.body.addEventListener('keyup', onSpaceUp);
    document.getElementById('up').addEventListener('click', up);
    document.getElementById('right').addEventListener('click', right);
    document.getElementById('down').addEventListener('click', down);
    document.getElementById('left').addEventListener('click', left);
    FOOTER_STRONG.addEventListener('click', utils.displayInstructions);
})();