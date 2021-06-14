import { bnToBn } from "@polkadot/util";

export class CommonUtility {

    static fromUnit = (val) => {
        return bnToBn(Number(val) * 1000000000000)
    }

    static toUnit = (val) => {
        return String(Number(val) / 1000000000000);
    }
}

