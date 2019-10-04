import { Buyer } from "./buyer";
import { ExpectedResult } from "./expected-result";

export interface Test {
    name: string;
    expectedResult: ExpectedResult;
    reversePrice: number;
    buyers: Buyer[];
}