# react-board-games
A starter template for people wanting to build a board game with React.

## Overview
This is a React Typescript template for building simple board games. It does not use any libraries save from vanilla React components, but you can expand where needed. This is meant to be a template and thus basic functionality for creating a board game is included like board generation/loading and the ability to add position events.

## The Specifics
In any basic board game, there are some key components that must be included:
- Players
- The board
- What each space on the board does
- A method in which players use to move

The board game in `game` contains all four and functions as simply as possible (while still being quite complex). Let's look at them in more detail.

### Player
This template's players are simply salmon circles. Players know their position on the game path and their starting space (which, by default, will not trigger an event). The code is set up in such a way that adding more properties to the Players' states and props is possible (and is encouraged!). How these players are tracked is handled by the Board, but that will be explained in the associated section.

Players can "accept" Tile events when they land on a specific path tile. This function on Players takes a function from pre-defined rules as an input parameter. This causes the function to execute within the scope of the Player so if any manipulation of the Player state is desired, the Player's properties are easily accessible.

### Board
The board is the overarching component of this board game. The Board tracks the active states of all players and all board tiles, including non-path tiles. It is given only the board as a 1D array, the width of the board (how it will scale onto the screen), and an array of the path tiles (the tiles that players can be on). It stores the players as a JSX Element as well to expedite the rendering process. The board also keeps which player's turn it is. This is not displayed, however, upon using the method to move, it will be evident based on which circle moves.

Think of the board like the manager of a team. It handles all events between tiles and players, how the players move (as well as asking to update their positions using the references to call the update functions), as well as simply adding more players to their appropriate lists.

The template uses a constant defined in `src/board/boards/boards.ts` called `SIMPLE_BOARD`. This constant represents the data used for the template board game. For organizational sake, add all of your board and path objects to the same file.

### Tiles
Each square in the board is called a Tile. The Tile is simply a square with special properties based on its input value. This is modelled like old GBA games where an integer value passed onto the square gave them different functions. To see these functions, navigate to `src/board/tile/boardData.ts`. Here, you will see an object that maps integer numbers to functions. These functions are what are fired when a player lands on a Tile. This response is handled by Board when a player is to move to the designated Tile and when the player leaves the Tile. Currently, the only two values are a dummy placeholder for non-path squares and a simple function for path squares.

Players will accept the function from the rules object. The explanation as to what the Player does with the function is in the Player section. The Board ensures that non-path Tiles will never be reached by players by tracking the true index in the path array as well as the true index in the total tiles map.

### Dice
To move the players, this template uses dice. In the simple example, there is only one, but you can have up to as many as you want. This is also one of the only 3D objects in the entire project and have been configured to stay as close to its original position after rolled for ease. The value that is on the top of each die is the value that is used in moving the player.

There is already a dice Element provided. This element, named DSix in `src/dice/Dice.tsx`, is a 6-faced die. The d6 has been configured to look like a much larger version of the standard die seen in everyday life. The d6 can be "rolled" using a provided function that randomly picks a face and displays it by shifting in out associated transform CSS classes. The die only knows what face is facing upwards and the Board can take the data from the die, calculate how far a player should move, where to (as the path may be circular and thus resulting in the use of the modulus over the path's length, and firing Tile events accordingly.

## General Notes
- For the sake of this repository being a template, I ask you at least make one change to the base project. This can be through styles, events, players, etc. Simply using the base without adding to it yields nothing more than copying an assignment from someone else and claiming that it was yours. For that reason, the license exists. Feel free to modify, adapt, etc., but make sure you don't simply copy and claim (from the perspective of someone who made this template - me)
- Typescript may seem daunting at first, but it is actually slightly easier to work with than the former. Since types are explicitly expressed and errors will be thrown with mismatches, TS takes out the typical error debugging associated with JS. It is also slightly more powerful, enabling much better OOP without the cost of using a typical OOP language like Java or C++
- React projects are localhost only and without a server, multiple people who tap the site will see a new instance of the game. If this is what is intended, then go right on ahead. If you want specific private game rooms or multiple people interacting with the same game, consider using an Express server with a local MongoDB instance to store UUIDs and other important game information that can be served to your player base.

## Future updates
- Documentation. Proper documentation.
