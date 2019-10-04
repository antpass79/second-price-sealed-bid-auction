import chalk from "chalk";

import { IAlgorithm } from "./algorithm";
import { Test } from "../models/test";
import { Solution } from "./solution";
import { ExpectedResult } from "../models/expected-result";

export class AlgorithmTester {
    test(algorithm: IAlgorithm, tests: Test[]): void {
        this.printHeader();

        tests.forEach(test => {
            this.printTestProperties(test);
            let solution = algorithm.solve(test.buyers, test.reversePrice);
            this.printResult(solution, test.expectedResult);
        });

        this.printFooter();
    }

    private printHeader() {
        console.log(chalk.bgCyan('\nTests starting...'));
    }

    private printFooter() {
        console.log(chalk.bgCyan('Tests ended'));
    }

    private printTestProperties(test: Test): void {
        console.log(chalk.bold(`\nTest name: ${test.name}`));
        console.log(`Reverse price: ${test.reversePrice}`);
        test.buyers.forEach(buyer => {
            console.log(`${buyer.name}: bids [${buyer.bids}]`);
        });
        console.log(`The winner must be ${test.expectedResult.winningBuyerName} with the price of ${test.expectedResult.winningPrice}`);
    }

    private printResult(solution: Solution, expectedResult: ExpectedResult) {
        if (this.verifySolution(solution, expectedResult)) {
            console.log(chalk.green('Test successed\n'));
        }
        else {
            console.log(chalk.red('Test falied'));
            console.log(`(Found buyer is ${solution.winningBuyerName} with the price of ${solution.winningPrice})`);
        }
    }

    private verifySolution(solution: Solution, expectedResult: ExpectedResult): boolean {
        return (
            solution.winningBuyerName === expectedResult.winningBuyerName &&
            solution.winningPrice === expectedResult.winningPrice);
    }
}