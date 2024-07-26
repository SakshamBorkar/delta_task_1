document.addEventListener('DOMContentLoaded', () => {
    const board = document.getElementById('board');
    let selectedPiece = null;

    // Initialize the board
    for (let i = 0; i < 64; i++) {
        const cell = document.createElement('div');
        cell.classList.add('cell');
        cell.dataset.index = i;
        board.appendChild(cell);
    }

    // Place player pieces
    const player1Pieces = [0, 1, 2, 3, 4]; // Top-left corner
    const player2Pieces = [59, 60, 61, 62, 63]; // Bottom-right corner

    // Add one slanted piece for each player
    const player1SlantedPieceIndex = 2;
    const player2SlantedPieceIndex = 61;

    player1Pieces.forEach(index => {
        const cell = board.children[index];
        const piece = document.createElement('div');
        if (index === player1SlantedPieceIndex) {
            piece.classList.add('piece', 'slanted', 'player1');
        } else {
            piece.classList.add('piece', 'player1');
        }
        cell.appendChild(piece);
    });

    player2Pieces.forEach(index => {
        const cell = board.children[index];
        const piece = document.createElement('div');
        if (index === player2SlantedPieceIndex) {
            piece.classList.add('piece', 'slanted', 'player2');
        } else {
            piece.classList.add('piece', 'player2');
        }
        cell.appendChild(piece);
    });

    // Add click event listener to each cell
    const cells = Array.from(board.children);
    cells.forEach(cell => {
        cell.addEventListener('click', () => {
            handleCellClick(cell);
        });
    });

    function handleCellClick(cell) {
        const piece = cell.querySelector('.piece');
        const cellIndex = parseInt(cell.dataset.index);

        if (selectedPiece) {
            if (cell.classList.contains('possible-move')) {
                movePiece(selectedPiece, cell);
                clearHighlights();
                selectedPiece = null;
            } else {
                clearHighlights();
                selectedPiece = null;
            }
        } else if (piece) {
            selectedPiece = piece;
            highlightPossibleMoves(cellIndex);
        } else {
            cells.forEach(c => c.classList.add('highlight'));
        }
    }

    function highlightPossibleMoves(index) {
        clearHighlights();

        const possibleMoves = getPossibleMoves(index);
        possibleMoves.forEach(moveIndex => {
            board.children[moveIndex].classList.add('possible-move');
        });
    }

    function clearHighlights() {
        cells.forEach(c => c.classList.remove('highlight', 'possible-move'));
    }

    function movePiece(piece, targetCell) {
        targetCell.appendChild(piece);
    }

    function getPossibleMoves(index) {
        const moves = [];
        const row = Math.floor(index / 8);
        const col = index % 8;

        const directions = [
            [-1, -1], [-1, 0], [-1, 1],
            [0, -1], [0, 1],
            [1, -1], [1, 0], [1, 1]
        ];

        directions.forEach(direction => {
            const newRow = row + direction[0];
            const newCol = col + direction[1];
            if (newRow >= 0 && newRow < 8 && newCol >= 0 && newCol < 8) {
                const moveIndex = newRow * 8 + newCol;
                if (!board.children[moveIndex].querySelector('.piece')) {
                    moves.push(moveIndex);
                }
            }
        });

        return moves;
    }
});
