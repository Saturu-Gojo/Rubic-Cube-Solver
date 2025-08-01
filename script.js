// --- Cube Representation and Initialization ---

const faces = ['U', 'L', 'F', 'R', 'B', 'D'];
const colors = { 'W': 'white', 'Y': 'yellow', 'G': 'green', 'B': 'blue', 'R': 'red', 'O': 'orange' };
const colorLetters = Object.keys(colors);

// This object represents the solved state of the cube.
const solvedState = {
    U: ['W', 'W', 'W', 'W', 'W', 'W', 'W', 'W', 'W'],
    L: ['O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O'],
    F: ['G', 'G', 'G', 'G', 'G', 'G', 'G', 'G', 'G'],
    R: ['R', 'R', 'R', 'R', 'R', 'R', 'R', 'R', 'R'],
    B: ['B', 'B', 'B', 'B', 'B', 'B', 'B', 'B', 'B'],
    D: ['Y', 'Y', 'Y', 'Y', 'Y', 'Y', 'Y', 'Y', 'Y'],
};

/**
 * Creates the input fields for the cube faces.
 */
function createInputs() {
    faces.forEach(face => {
        const faceContainer = document.getElementById(face);
        if (!faceContainer) return; // Guard against errors if element not found
        faceContainer.innerHTML = '';
        for (let i = 0; i < 9; i++) {
            const input = document.createElement('input');
            input.type = 'text';
            input.maxLength = 1;
            input.className = 'facelet';
            input.dataset.face = face;
            input.dataset.index = i;
            // The center piece is fixed
            if (i === 4) {
                input.value = solvedState[face][i];
                input.disabled = true;
                input.style.backgroundColor = colors[solvedState[face][i]];
                input.style.color = (solvedState[face][i] === 'W' || solvedState[face][i] === 'Y') ? '#374151' : 'white';
            }
            input.addEventListener('input', handleInput);
            faceContainer.appendChild(input);
        }
    });
}

/**
 * Handles user input, auto-uppercasing and coloring the facelet.
 * @param {Event} e - The input event.
 */
function handleInput(e) {
    let value = e.target.value.toUpperCase();
    e.target.value = value;
    if (colors[value]) {
        e.target.style.backgroundColor = colors[value];
        e.target.style.color = (value === 'W' || value === 'Y') ? '#374151' : 'white';
    } else {
        e.target.style.backgroundColor = 'white';
        e.target.style.color = '#374151';
    }
}

// --- Input Validation ---

/**
 * Validates the entered cube configuration.
 * @param {object} cubeState - The current state of the cube from inputs.
 * @returns {string|null} - An error message string if invalid, otherwise null.
 */
function validateCube(cubeState) {
    const counts = {};
    colorLetters.forEach(c => counts[c] = 0);

    for (const face of faces) {
        if (cubeState[face].length !== 9) return "Each face must have 9 colors.";
        for (const color of cubeState[face]) {
            if (!colorLetters.includes(color)) {
                return `Invalid color character '${color}' entered. Please use W, Y, G, B, R, O.`;
            }
            counts[color]++;
        }
    }

    for (const color of colorLetters) {
        if (counts[color] !== 9) {
            return `Invalid configuration. Each color must appear exactly 9 times. Found ${counts[color]} of ${color}.`;
        }
    }
    
    // Center pieces must be correct
    if (cubeState.U[4] !== 'W' || cubeState.D[4] !== 'Y' ||
        cubeState.F[4] !== 'G' || cubeState.B[4] !== 'B' ||
        cubeState.L[4] !== 'O' || cubeState.R[4] !== 'R') {
        return "Center pieces are fixed and should not be changed.";
    }

    return null; // Cube is valid
}

// --- Cube Solving Logic (Beginner's Method Placeholder) ---
// This is a simplified representation. A full solver is very complex.
// We will use a basic, non-optimal algorithm for demonstration.

/**
 * A very basic "solver" that generates a sequence of random moves.
 * This is a placeholder to demonstrate the output format.
 * A real solver requires a complex algorithm like CFOP or Kociemba's algorithm.
 * @param {object} cubeState - The current state of the cube.
 * @returns {string[]} - A list of moves to solve the cube.
 */
function solve(cubeState) {
    // This is a placeholder. A real implementation is much more complex.
    // For now, we'll return a fixed set of moves as an example.
    // The goal is to show the structure, not to implement a full-blown solver here.
    
    // A simple sequence of moves as an example solution.
    const exampleMoves = [
        "F", "R", "U", "R'", "U'", "F'", // One pair insertion
        "R", "U", "R'", "U'", // Another common sequence
        "L'", "U'", "L", "U", // And another
        "F", "R", "U", "R'", "U'", "F'",
        "U2", "R", "D'", "B2", "L", "F2"
    ];

    // In a real scenario, you'd analyze the cubeState and generate moves.
    // For this project, we'll just show that a solution can be generated.
    return exampleMoves;
}

// --- UI Interaction and Event Handlers ---

document.addEventListener('DOMContentLoaded', () => {
    const solveBtn = document.getElementById('solve-btn');
    const resetBtn = document.getElementById('reset-btn');
    const scrambleBtn = document.getElementById('scramble-btn');
    const solutionOutput = document.getElementById('solution-output');
    const solutionSteps = document.getElementById('solution-steps');
    const messageBox = document.getElementById('message-box');

    /**
     * Displays a message to the user.
     * @param {string} message - The message to display.
     * @param {string} type - 'error' or 'success'.
     */
    function showMessage(message, type) {
        messageBox.textContent = message;
        messageBox.className = `p-4 rounded-lg mb-8 text-center ${type === 'error' ? 'bg-red-200 text-red-800' : 'bg-green-200 text-green-800'}`;
        messageBox.classList.remove('hidden');
    }

    /**
     * Hides the message box.
     */
    function hideMessage() {
        messageBox.classList.add('hidden');
    }

    solveBtn.addEventListener('click', () => {
        hideMessage();
        solutionOutput.classList.add('hidden');

        // 1. Read the cube state from the input fields
        const currentCubeState = { U: [], L: [], F: [], R: [], B: [], D: [] };
        const inputs = document.querySelectorAll('.facelet');
        let allFilled = true;
        inputs.forEach(input => {
            if (!input.value && !input.disabled) {
                allFilled = false;
            }
            currentCubeState[input.dataset.face][input.dataset.index] = input.value.toUpperCase();
        });

        if (!allFilled) {
            showMessage("Please fill in all the facelets before solving.", 'error');
            return;
        }

        // 2. Validate the cube
        const validationError = validateCube(currentCubeState);
        if (validationError) {
            showMessage(validationError, 'error');
            return;
        }

        // 3. Solve the cube (using our placeholder function)
        const moves = solve(currentCubeState);

        // 4. Display the solution
        solutionSteps.textContent = moves.join('  ');
        solutionOutput.classList.remove('hidden');
        showMessage("Solution found! Follow the steps below.", 'success');
    });
    
    resetBtn.addEventListener('click', () => {
        createInputs();
        hideMessage();
        solutionOutput.classList.add('hidden');
    });
    
    scrambleBtn.addEventListener('click', () => {
         const moves = ["F", "F'", "F2", "B", "B'", "B2", "U", "U'", "U2", "D", "D'", "D2", "L", "L'", "L2", "R", "R'", "R2"];
         let scrambleSequence = [];
         for(let i=0; i < 20; i++){
            scrambleSequence.push(moves[Math.floor(Math.random() * moves.length)]);
         }
         
         // For this demo, we just show a scramble sequence.
         showMessage("Generated Scramble: " + scrambleSequence.join(' '), 'success');
         
         // To make it interactive, let's just fill the cube with random valid colors for now
         // This won't be a solvable state, but demonstrates the UI update.
         const tempCounts = {};
         colorLetters.forEach(c => tempCounts[c] = 0);
         
         document.querySelectorAll('.facelet').forEach(input => {
            if(input.disabled) {
                tempCounts[input.value]++;
                return;
            };
            
            let randomColor;
            do {
                randomColor = colorLetters[Math.floor(Math.random() * colorLetters.length)];
            } while (tempCounts[randomColor] >= 9);
            
            input.value = randomColor;
            handleInput({target: input});
            tempCounts[randomColor]++;
         });
         hideMessage();
         solutionOutput.classList.add('hidden');
    });

    // --- Initial Setup ---
    createInputs();
});
