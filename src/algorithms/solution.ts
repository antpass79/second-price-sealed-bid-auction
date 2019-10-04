export class Solution {
    constructor(winningBuyerName: string | null, winningPrice: number | null, buyerPrice: number | null) {
        this._winningBuyerName = winningBuyerName;
        this._winningPrice = winningPrice;
        this._buyerPrice = buyerPrice;
    }

    private _winningBuyerName: string | null;
    get winningBuyerName(): string | null {
        return this._winningBuyerName;
    }

    private _winningPrice: number | null;
    get winningPrice(): number | null {
        return this._winningPrice;
    }

    private _buyerPrice: number | null;
    get buyerPrice(): number | null {
        return this._buyerPrice;
    }
}

export class NoSolution extends Solution {
    constructor() {
        super(null, null, 0);
    }
}