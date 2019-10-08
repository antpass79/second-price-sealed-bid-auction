import { expect } from 'chai';

import { NodeConfig } from '../src/utils/node-config';
import { Test } from '../src/models/test';
import { IAlgorithm } from '../src/algorithms/algorithm';
import { StaticAlgorithm } from '../src/algorithms/static-algorithm';

describe('static algorithm', () => {
    let tests: Test[];
    let algorithm: IAlgorithm;

    context('Run all tests', () => {
        NodeConfig.init('../../assets/config.json');
        tests = NodeConfig.getValue('tests');
        algorithm = new StaticAlgorithm();

        tests.forEach(test => {
            it(`The winner must be ${test.expectedResult.winningBuyerName} with the price of ${test.expectedResult.winningPrice}, based on a reserve price of ${test.reversePrice}`, () => {
                let solution = algorithm.solve(test.buyers, test.reversePrice);
                expect(solution.winningBuyerName).to.equal(test.expectedResult.winningBuyerName);
                expect(solution.winningPrice).to.equal(test.expectedResult.winningPrice);
            });
        });    
    });
});