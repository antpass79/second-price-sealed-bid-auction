# second-price-sealed-bid-auction

The program provides a terminal for testing the algorithm to solve the problem described in the next section.

## Problem

Let's consider a second-price, sealed-bid auction:

- An object is for sale with a reserve price.
- We have several potential buyers, each one being able to place one or more bids.
- The buyer winning the auction is the one with the highest bid above or equal to the reserve price.
- The winning price is the highest bid price from a non-winning buyer above the reserve price (or the reserve price if none applies)

### Example

Consider 5 potential buyers (A, B, C, D, E) who compete to acquire an object with a reserve price set at 100 euros, bidding as follows:

A: 2 bids of 110 and 130 euros

B: 0 bid

C: 1 bid of 125 euros

D: 3 bids of 105, 115 and 90 euros

E: 3 bids of 132, 135 and 140 euros

The buyer *E* wins the auction at the price of *130* euros.
Goal.

The goal is to implement an algorithm for finding the *winner* and the *winning price*.

### Explanation and assumptions

Taking the above example:

| buyer | bid 1 | bid 2 | bid 3 |
|-------|-------|-------|-------|
|   A   |  110  |  130  |       |
|   B   |       |       |       |
|   C   |  125  |       |       |
|   D   |  105  |  115  |   90  |
|   E   |  132  |  135  |  140  |

Each bid column is a round of the auction:

- Round 1: B doesn't play => Output: E (132) is the temporary winner with the price of C (125)
- Round 2: Taking only this round, E (135) is the winner with the price of A (130). But the output of round 1 must be taken in account => Output: the temporary winner is E (135) with the price of C (130)
- Round 3: Taking only this round, E (140) is the winner with his own price (140). But the output of round 2 (and 1) must be taken in account => Output: E (140) is the winner with the price of A (130)

Result

E (140) is the winner with the price of A (130)

Bacause the output of each round is the input of the next round, it means that an algorithm based on dynamic programming can be used to solve the problem.

## Run the program

The prerequirement to run the program is to have node installed: <https://nodejs.org/it/>

After that, under the project folder, follow the below steps:

- Open the prompt with administrative privileges.
- Install all packages:

        npm install

- Run the program:

        npm start

## Tests

Tests are in the config.json file under the assets folder. It's possible to add new tests at runtime and choose the *d* option after changes.

If a test with no winner is added, to run correctly, the expectedResult section must be as shown below:

        "expectedResult": {
                "winningBuyerName": null,
                "winningPrice": null
        },

### Tests by command line

In addition to run the tests directly by the program, it's possible to the the algorithm using the command line under the project folder:

        npm test

## References

### Auction

- <https://en.wikipedia.org/wiki/Vickrey_auction>

### node.js command prompt

- <https://gldraphael.com/blog/writing-a-node-console-app-in-typescript/>
- <https://medium.com/rubber-ducking/creating-a-cli-with-typescript-1c5112ae101f>
- <https://itnext.io/how-to-create-your-own-typescript-cli-with-node-js-1faf7095ef89>

### utilities (node-config)

- <https://github.com/antpass79>
