import { IAlgorithm } from "./algorithm";
import { Solution, NoSolution } from "./solution";
import { Buyer } from "../models/buyer";

interface BuyerBid {
    buyerName: string,
    bid: number
}

interface Winner {
    buyerName: string,
    buyerPrice: number,
    winningPriceBuyerName: string,
    winningPrice: number,
    sameBuyerPriceCounter: number
}

export class DynamicAlgorithm implements IAlgorithm {
    solve(buyers: Buyer[], reservePrice: number): Solution {
        if (!buyers || buyers.length == 0)
            return new NoSolution();

        let maxBids = buyers.map(buyer => buyer.bids.length).reduce((bids1Count, bids2Count) => Math.max(bids1Count, bids2Count));

        let winner: Winner = {
            buyerName: '',
            buyerPrice: 0,
            winningPrice: 0,
            winningPriceBuyerName: '',
            sameBuyerPriceCounter: 0
        };

        for (let roundIndex = 0; roundIndex < maxBids; roundIndex++) {
            
            let round: BuyerBid[] = buyers.map(buyer => {
                return {
                    buyerName: buyer.name,
                    bid: buyer.bids[roundIndex] ? buyer.bids[roundIndex] : -1
                }});

            winner = this.findRoundWinner(reservePrice, round, winner);
        }

        // updating data in case the buyer price is the winning price
        if (winner.winningPrice === 0 && winner.winningPriceBuyerName === '') {
            winner.winningPrice = winner.buyerPrice;
            winner.winningPriceBuyerName = winner.buyerName;
        }

        if (winner.sameBuyerPriceCounter > 1 || winner.buyerName === '')
            return new NoSolution();

        return new Solution(winner.buyerName, winner.winningPrice, winner.buyerPrice);
    }

    private findRoundWinner(reservePrice: number, round: BuyerBid[], previousRoundWinner: Winner): Winner {
        let winner: Winner = {
            buyerName: '',
            buyerPrice: 0,
            winningPrice: 0,
            winningPriceBuyerName: '',
            sameBuyerPriceCounter: 0
        };

        for (let i = 0; i < round.length; i++) {

            // bid is not enough
            if (round[i].bid < reservePrice) {
                continue;
            }

            // checking for same bids int the same round
            if (round[i].bid === winner.buyerPrice) {
                winner.sameBuyerPriceCounter++;
            }
            // looking for a bid higher to the highest bid done for a different buyer
            if (round[i].bid > winner.buyerPrice && round[i].buyerName != winner.buyerName) {
                winner.winningPrice = winner.buyerPrice;
                winner.winningPriceBuyerName = winner.buyerName;
                winner.buyerPrice = round[i].bid;
                winner.buyerName = round[i].buyerName;
                winner.sameBuyerPriceCounter = 1;
            }
            // looking for a bid higher the highest winning price for a different buyer
            else if (round[i].bid > winner.winningPrice && round[i].buyerName != winner.buyerName) {
                winner.winningPrice = round[i].bid;
                winner.winningPriceBuyerName = round[i].buyerName;
            }
        }

        // updating the winner data with the winner coming from the previous round

        // fixing buyer price and buyer name
        if (previousRoundWinner.buyerPrice > winner.buyerPrice && previousRoundWinner.buyerName !== winner.buyerName) {
            winner.buyerPrice = previousRoundWinner.buyerPrice;
            winner.buyerName = previousRoundWinner.buyerName;
            winner.sameBuyerPriceCounter = previousRoundWinner.sameBuyerPriceCounter;
        }

        // fixing winning price and the buyer associated to the winning price (for internal use)
        if (previousRoundWinner.buyerPrice > winner.winningPrice && winner.buyerName !== previousRoundWinner.buyerName) {
            winner.winningPrice = previousRoundWinner.buyerPrice;
            winner.winningPriceBuyerName = previousRoundWinner.buyerName;
        }
        else if (previousRoundWinner.winningPrice > winner.winningPrice && winner.winningPriceBuyerName !== previousRoundWinner.buyerName) {
            winner.winningPrice = previousRoundWinner.winningPrice;
            winner.winningPriceBuyerName = previousRoundWinner.winningPriceBuyerName;
        }
        
        return winner;
    }
}