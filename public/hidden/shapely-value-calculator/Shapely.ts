export type PlayerValue = { [player in string]: number };
export type CostFunction = (coalition: string[], costs: PlayerValue) => number;
export default function shapley(costs: PlayerValue, costFunction: CostFunction): PlayerValue {
    function getShapleyValues(
        costs: PlayerValue,
        costFunction: (coalition: string[], costs: PlayerValue) => number
    ): PlayerValue {
        const players = Object.keys(costs) as string[];
        const n = players.length;
        const shapleyValues: PlayerValue = {};

        for (const player of players) {
            shapleyValues[player] = 0;
        }

        for (let coalition = 0; coalition < (1 << n); coalition++) {
            const coalitionPlayers: string[] = [];
            for (let i = 0; i < n; i++) {
                if (coalition & (1 << i)) {
                    coalitionPlayers.push(players[i]);
                }
            }

            for (const player of coalitionPlayers) {
                const withoutPlayer = coalitionPlayers.filter(p => p !== player);
                const withPlayerValue = costFunction(coalitionPlayers, costs);
                const withoutPlayerValue = costFunction(withoutPlayer, costs);
                const marginalContribution = withPlayerValue - withoutPlayerValue;

                const coalitionSize = coalitionPlayers.length;
                const withoutPlayerSize = withoutPlayer.length;
                const weight = factorial(withoutPlayerSize) * factorial(n - coalitionSize) / factorial(n);

                shapleyValues[player] += marginalContribution * weight;
            }
        }

        return shapleyValues;
    }

    function factorial(n: number): number {
        return n <= 1 ? 1 : n * factorial(n - 1);
    }

    //

    const shapleyValues = getShapleyValues(costs, costFunction);
    return shapleyValues;
}