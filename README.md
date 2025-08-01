
#Rubic-Cube-Solver

A web-based application that provides a solution for a scrambled 3x3x3 Rubik's Cube. Users can input the colors of their cube on a 2D unfolded interface and receive a sequence of moves to solve it.

Live Demo : https://saturu-gojo.github.io/Rubic-Cube-Solver/

Features : 2D Unfolded Cube Interface: Easily input your cube's state on a flat, intuitive layout representing all six faces.

Color Input Validation : The application checks to ensure a valid cube configuration is entered before attempting a solution.

Step-by-Step Solution : Generates a sequence of moves to solve the provided cube state.

Responsive Design : The interface is usable across desktop and mobile devices.

Scramble and Reset : Includes helper buttons to quickly scramble the input for testing or reset the board.

How to Use :
Open the application in your web browser.

Input the colors of your scrambled Rubik's Cube into the 2D grid. Use the standard first-letter notation for each color:

W - White

Y - Yellow

G - Green

B - Blue

R - Red

O - Orange

Note: The center piece of each face is fixed and cannot be changed.

Once all the colors are entered, click the "Solve Cube" button.

If the input is valid, a list of moves will appear below. If the input is invalid, an error message will be displayed.

Follow the moves in sequence to solve your physical cube!

Reading the Solution Moves
The solution is provided in standard Rubik's Cube notation. Each letter represents a face of the cube, and the character after it tells you how to turn it. Imagine you are holding the cube looking at the Front (F) face.

The Six Faces
F = Front face (the face looking at you)

B = Back face (the face opposite the front)

U = Up face (the top face)

D = Down face (the bottom face)

L = Left face (the face on the left)

R = Right face (the face on the right)

The Three Types of Moves
Clockwise Turn (e.g., R): A letter by itself means turn that face 90° clockwise.

Counter-Clockwise Turn (e.g., R'): A letter with an apostrophe (') means turn that face 90° counter-clockwise. This is called "prime".

180-Degree Turn (e.g., R2): A letter with a 2 means turn that face 180° (a half-turn).

Technologies Used :

HTML5: For the structure of the web page.

CSS3: For custom styling and layout.

Tailwind CSS: A utility-first CSS framework for rapid UI development.

JavaScript (ES6+): For all the application logic, including input handling, validation, and generating the solution.

File Structure
The project is organized into three main files:

index.html: The main HTML file containing the structure of the page.

style.css: Contains all the custom CSS rules for styling the cube interface.

script.js: Holds all the JavaScript code for the application's functionality.
