/** Boggle word check.

Given a 5x5 boggle board, see if you can find a given word in it.

In Boggle, you can start with any letter, then move in any NEWS direction.
You can continue to change directions, but you cannot use the exact same
tile twice.

So, for example::

    N C A N E
    O U I O P
    Z Q Z O N
    F A D P L
    E D E A Z

In this grid, you could find `NOON* (start at the `N` in the top
row, head south, and turn east in the third row). You cannot find
the word `CANON` --- while you can find `CANO` by starting at the
top-left `C`, you can 't re-use the exact same `N` tile on the
front row, and there's no other `N` you can reach.

*/

function makeBoard(boardString) {
  /** Make a board from a string.

    For example::

        board = makeBoard(`N C A N E
                           O U I O P
                           Z Q Z O N
                           F A D P L
                           E D E A Z`);

        board.length   // 5
        board[0]       // ['N', 'C', 'A', 'N', 'E']
    */

  const letters = boardString.split(/\s+/);

  const board = [
    letters.slice(0, 5),
    letters.slice(5, 10),
    letters.slice(10, 15),
    letters.slice(15, 20),
    letters.slice(20, 25),
  ];

  return board;
}

function helper(board, word, i, j, visited) {

  //if the letter from the board and first letter of the word are nor matching then return false
  if (board[i][j] != word[0])
    return false;

  //If we have visited the letter then retrun false
  if (visited.has(j + "-" + i)) 
    return false;

  // if we are done with all the letters
  if (word.length === 1)
    return true;
  
  //add the letter as visited in the set

  visited = new Set(visited);
  visited.add(i + "-" + j);

//traverse through (BFS) uo,down,left and right direction to find if the next letter of the word is available or not
  if (i > 0 && helper(board, word.slice(1), i - 1, j, visited)) return true;
  if (i < 4 && helper(board, word.slice(1), i + 1, j, visited)) return true;
  if (j > 0 && helper(board, word.slice(1), i, j - 1, visited)) return true;
  if (j < 4 && helper(board, word.slice(1), i, j + 1, visited)) return true;

  //if the letter is not present then return false;
  return false;
}
function find(board, word) {
  /** Can word be found in board? */
  // TODO
  // find the first letter in the board and then search the folloing leeters of the word in the board by traversing up,down,right and left cell.
  // During traversing if we found every letter return true else false.
  for (let i = 0; i < 5; i++)
    for (let j = 0; j < 5; j++)
      if (helper(board, word, i, j, new Set()))
        return true;
  return false;
}

// EXAMPLE TEST

// For example::

const board = makeBoard(`N C A N E
                         O U I O P
                         Z Q Z O N
                         F A D P L
                         E D E A Z`);

// `NOON` should be found (0, 3) -> (1, 3) -> (2, 3) -> (2, 4)::

console.log(find(board, "NOON"), true);

// `NOPE` should be found (0, 3) -> (1, 3) -> (1, 4) -> (0, 4)::

console.log(find(board, "NOPE"), true);

// `CANON` can't be found (`CANO` starts at (0, 1) but can't find
// the last `N` and can't re-use the N)::

console.log(find(board, "CANON"), false);

// You cannot travel diagonally in one move, which would be required
// to find `QUINE`::

console.log(find(board, "QUINE"), false);

// We can recover if we start going down a false path (start 3, 0)::

console.log(find(board, "FADED"), true);

// An extra tricky case --- it needs to find the `N` toward the top right,
// and then go down, left, up, up, right to find all four `O`s and the `S`::

const board2 = makeBoard(`E D O S Z
                          N S O N R
                          O U O O P
                          Z Q Z O R
                          F A D P L`);

console.log(find(board2, "NOOOOS"), true);
