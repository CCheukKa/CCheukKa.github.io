import shapley, { CostFunction, PlayerValue } from "./Shapely";

type PlayerData = { player: string, cost: number, shapley: number, difference: number, percent: number };
const calculateShapely = (costs: PlayerValue): PlayerData[] => {
    const costFunction: CostFunction =
        !useCustomCostFunctionButton.checked
            ? (coalition: string[], costs: PlayerValue): number => {
                const coalitionCosts = coalition.map(player => costs[player]).sort((a, b) => a - b);
                const totalCost = coalitionCosts.slice(-4).reduce((sum, cost) => sum + cost / 2, 0);
                const remainingSum = coalitionCosts.slice(0, -4).reduce((sum, cost) => sum + cost, 0);
                return totalCost + remainingSum;
            }
            : (coalition: string[], costs: PlayerValue): number => {
                // ! Very spooky
                let returnValue;
                eval(customCostFunction.value);
                if (typeof returnValue !== 'number') {
                    window.alert('Cost function must return a number');
                    throw new Error('Cost function must return a number');
                }
                return returnValue! as number;
            };

    // 
    const shapleyValues: PlayerValue = shapley(costs, costFunction);
    const valueDifferences: PlayerValue = Object.fromEntries(
        Object.entries(shapleyValues).map(([player, value]) => [player, value - costs[player]])
    );
    const valuePercents: PlayerValue = Object.fromEntries(
        Object.entries(shapleyValues).map(([player, value]) => [player, value / costs[player] * 100])
    );
    const playerData: PlayerData[] = Object.entries(costs).map(([player, cost]) => ({
        player,
        cost,
        shapley: shapleyValues[player],
        difference: valueDifferences[player],
        percent: valuePercents[player],
    }));

    console.table(playerData);
    return playerData;
}

const shapelyTable = document.getElementById('shapely-table') as HTMLTableElement;
const rowTemplate = document.getElementById('row-template') as HTMLTemplateElement;
const addRowButton = document.getElementById('add-row-button') as HTMLButtonElement;
const calculateButton = document.getElementById('calculate-button') as HTMLButtonElement;
const customCostFunction = document.getElementById('cost-function') as HTMLTextAreaElement;
const useCustomCostFunctionButton = document.getElementById('use-custom-cost-function') as HTMLInputElement;
addRowButton.addEventListener('click', () => {
    const row = rowTemplate.content.cloneNode(true) as HTMLTableRowElement;
    shapelyTable.querySelector('tbody')!.appendChild(row);
    const rowIndex = shapelyTable.querySelectorAll('tbody>tr').length;
    (shapelyTable.querySelector('tbody>tr:last-child #player') as HTMLInputElement).value = `P${rowIndex}`;
    (shapelyTable.querySelector('tbody>tr:last-child #cost') as HTMLInputElement).value = `${0}`;
});
for (let i = 0; i < 4; i++) { addRowButton.click(); }
shapelyTable.addEventListener('click', (event: MouseEvent) => {
    if ((event.target as HTMLElement).matches('button.delete-row-button')) {
        const row = (event.target as HTMLElement).closest('tr')!;
        row.remove();
    }
});
calculateButton.addEventListener('click', () => {
    const playerInputData = Array.from(shapelyTable.querySelectorAll('tbody>tr')).map(row => {
        const player = (row.querySelector('#player') as HTMLInputElement).value;
        const cost = Number((row.querySelector('#cost') as HTMLInputElement).value);
        return { player, cost };
    });
    const costs: PlayerValue = Object.fromEntries(playerInputData.map(({ player, cost }) => [player, cost]));

    const playerData = calculateShapely(costs);
    const tbody = shapelyTable.querySelector('tbody')!;
    playerData.forEach((data, index) => {
        (tbody.children[index + 1].querySelector('.shapely') as HTMLTableCellElement).innerHTML = data.shapley.toFixed(2);
        (tbody.children[index + 1].querySelector('.difference') as HTMLTableCellElement).innerHTML = data.difference.toFixed(2);
        (tbody.children[index + 1].querySelector('.percent') as HTMLTableCellElement).innerHTML = data.percent.toFixed(2);
    });
});

// const costs: PlayerValue = {
//     Ka: 1035 + 1226,
//     Martin: 5400,
//     Fiona: 5400,
//     Tommy: 5400,
//     Ricky: 5400,
//     Michelle: 5400,
// };
// calculateShapely(costs);