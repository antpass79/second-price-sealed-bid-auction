import { expect } from 'chai';

import { NodeConfig } from '../src/utils/node-config';
import { Test } from '../src/models/test';
import { IAlgorithm } from '../src/algorithms/algorithm';
import { DynamicAlgorithm } from '../src/algorithms/dynamic-algorithm';

describe('algorithm', () => {
    let tests: Test[];
    let algorithm: IAlgorithm;

    context('Run all tests', () => {
        NodeConfig.init('../../assets/config.json');
        tests = NodeConfig.getValue('tests');
        algorithm = new DynamicAlgorithm();

        tests.forEach(test => {
            it(`The winner must be ${test.expectedResult.winningBuyerName} with the price of ${test.expectedResult.winningPrice}`, () => {
                let solution = algorithm.solve(test.buyers, test.reversePrice);
                expect(solution.winningBuyerName).to.equal(test.expectedResult.winningBuyerName);
                expect(solution.winningPrice).to.equal(test.expectedResult.winningPrice);
            });
        });    
    });
});