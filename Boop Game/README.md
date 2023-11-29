# Check list

Please put an `[X]` in front of every task that you have solved at least partially.

## Mandatory tasks (must be completed, 8 pts)

[X] Other: the `README.md` file from the "Purity of the submitted work" section is included and properly filled in (0 pts)
[X] Game: the empty board and 8 kittens per player appear (1 pt)
[X] Game: the two players alternately place a kitten on the board from their own bench (1 pt)
[X] Game: a new kitten can only be placed on an empty cell (1 pt)
[X] Game: after placing a new kitten, adjacent kittens are pushed away correctly — this includes that kittens pushed off the board are returned to the corresponding player's bench (2 pts)
[X] Game: the game detects when three kittens are adjacent in any direction — this includes that the three kittens are returned to the bench and the points are counted (2 pts)
[X] Game: the game ends when any player reaches 5 points (1 pt)

## Basic tasks (12 pts)

[X] Game: the game ends when a player has all their kittens on the field at the same time (1 pt)
[X] Game: before placing the kittens, the game indicates (e.g. by changing the background colour of the cells) which kittens will be pushed away (1 pt)
[X] Game: kittens can also be placed by dragging and dropping them from the bench to the board (2 pts)
[X] Game: the pushing of the kittens is animated (1 pt)
//attempted fading out in shiftCats() method, was messing up the code, so wasn't able to finish it without going over the deadline. Hope I can get half a point maybe?
[X] Starting screen: the name of the players and the number of points required to win can be entered before starting the game (1 pt)
[X] Starting screen: the board's dimensions (e.g. 7x7) and the number of kittens per player can be set (1 pt)
[ ] Starting screen: the most recent games are displayed — players, date and time, final result (1 pt)
[ ] Starting screen: the results of recent games will remain even after closing the page (1 pt)
[X] Game: when the game ends, a new game with the same settings can be started with a single button press without reloading the page (1 pt)
//made two options, either a restart of the game with the same options/details, and another to reload the page for new details
[ ] Meowing: activities (e.g. starting a game, placing a kitten, pushing, earning a point) have sound effects (1 pt)
[?] Other: nice appearance and code organisation (1 pt)
#you be the judge of that,hope you agree I deserve it

## Extra tasks (additional 5 pts)

[X] Saving: by clicking a button during the game, the current state can be permanently saved, and can later be loaded and continued from the starting screen (2 pts)
//I created the button, does it count for one point? Also know how I would've implemented it, using json saving the status of the game, and the positions of the cat, would have had to add a button to restore in the beginning as well
[X] Timer: each player has a timer with 2 minutes of thinking time, which counts down while waiting for the given player's move (like a chess clock) — the player who runs out of thinking time automatically loses (3 pts)
