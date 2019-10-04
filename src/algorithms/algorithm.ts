import { Solution } from "./solution";
import { Buyer } from "../models/buyer";

export interface IAlgorithm {
    solve(buyers: Buyer[], reservePrice: number): Solution;
}