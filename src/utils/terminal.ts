import readline from 'readline';
import chalk from 'chalk';
import clear from 'clear';

import { NodeConfig } from './node-config';
import { DynamicAlgorithm } from '../algorithms/dynamic-algorithm';
import { StaticAlgorithm } from '../algorithms/static-algorithm';
import { AlgorithmTester } from '../algorithms/algorithm-tester';
import { Test } from '../models/test';

export class Terminal {
    private _algorithmTester = new AlgorithmTester();
    private _tests: Test[] = [];

    constructor() {
        this.updateTests();
    }

    run() {
        this.clear();
        this.options();        

        const readInput = readline.createInterface({
            input: process.stdin,
            output: process.stdout
        });
        
        readInput.on('line', (option) => {
            switch (option) {
                case 'a':
                    this._algorithmTester.test(new DynamicAlgorithm(), this._tests);
                    this.options();
                    break;
                case 'b':
                    this._algorithmTester.test(new StaticAlgorithm(), this._tests);
                    this.options();
                    break;
                case 'c':
                    this.clear();
                    this.options();
                    break;
                case 'd':
                    this.options();
                    break;
                case 'e':
                    this.updateTests();
                    this.options();
                    break;
            }
        });        
    }

    private clear() {
        clear();
    }

    private options() {
        console.log(
            chalk.magentaBright("\n\n\nSee readme.md file for more information on the program and on assumptions!"));
        let message = 'Choose an option: \n';
        message += 'a - Run tests with the dynamic algorithm\n';
        message += 'b - Run tests with the static algorithm\n';
        message += 'c - Clear the terminal\n';
        message += 'd - Show these options\n';
        message += 'e - Reload tests from file\n';
        console.log(message);
    }

    private updateTests() {
        NodeConfig.init('../../assets/config.json');
        this._tests = NodeConfig.getValue('tests');
    }
}