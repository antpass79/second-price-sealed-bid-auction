import { IAlgorithm } from "./algorithm";
import { Solution, NoSolution } from "./solution";
import { Buyer } from "../models/buyer";

interface MaxBid {
    buyerName: string,
    maxBid: number
}

export class StaticAlgorithm implements IAlgorithm {
    solve(buyers: Buyer[], reservePrice: number): Solution {
        if (!buyers || buyers.length == 0)
            return new NoSolution();

        let maxBids = this.getMaxBids(buyers);
        if (maxBids.length === 0 || maxBids[0].maxBid < reservePrice || maxBids[0].maxBid === maxBids[1].maxBid)
            return new NoSolution();
    
        return this.getSolution(maxBids, reservePrice);
    }

    private getMaxBids(buyers: Buyer[]) {
        let maxBids: MaxBid[] = buyers.map(buyer => {
            let maxBids: MaxBid = {
                buyerName: buyer.name,
                maxBid: Math.max(...buyer.bids),
            };            
            return maxBids;
        }).sort((maxBid1, maxBid2) => maxBid2.maxBid - maxBid1.maxBid);

        return maxBids;
    }

    private getSolution(maxBids: MaxBid[], reservePrice: number) {
        let winningBuyerName = maxBids[0].buyerName;
        let winningPrice = maxBids[1].maxBid < reservePrice ? maxBids[0].maxBid : maxBids[1].maxBid;
        let buyerPrice = maxBids[0].maxBid;

        return new Solution(winningBuyerName, winningPrice, buyerPrice);
    }
}