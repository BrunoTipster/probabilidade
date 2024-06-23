function generateRandomNumber() {
    return Math.floor(Math.random() * 10) + 1;
}

function createBox(number) {
    const box = document.createElement('div');
    box.classList.add('box');
    box.textContent = number;
    if (number % 2 === 0) {
        box.classList.add('green');
    } else {
        box.classList.add('red');
    }
    return box;
}

function generateLayout() {
    const container = document.getElementById('container');
    let matrix = [];
    let currentRow = createRow();
    container.appendChild(currentRow);
    const columns = 10;
    let evenCounts = Array(columns).fill(0);
    let oddCounts = Array(columns).fill(0);
    let totalCounts = Array(columns).fill(0);
    let percentageRow = createPercentageRow();
    document.getElementById('percentage-container').appendChild(percentageRow);

    const interval = setInterval(() => {
        const number = generateRandomNumber();
        const columnIndex = currentRow.childElementCount;

        if (columnIndex < columns) {
            currentRow.appendChild(createBox(number));

            if (!matrix[columnIndex]) {
                matrix[columnIndex] = [];
            }
            matrix[columnIndex].push(number);

            if (number % 2 === 0) {
                evenCounts[columnIndex]++;
            } else {
                oddCounts[columnIndex]++;
            }
            totalCounts[columnIndex]++;
            updatePercentages(evenCounts, oddCounts, totalCounts, percentageRow);
        } else {
            currentRow = createRow();
            container.appendChild(currentRow);
        }
    }, 500); // Ajuste o intervalo conforme necessário
}

function createRow() {
    const row = document.createElement('div');
    row.classList.add('row');
    return row;
}

function createPercentageRow() {
    const row = document.createElement('div');
    row.classList.add('row');
    row.classList.add('percentage-row');
    for (let i = 0; i < 10; i++) {
        const div = document.createElement('div');
        div.classList.add('percentage');
        row.appendChild(div);
    }
    return row;
}

function updatePercentages(evenCounts, oddCounts, totalCounts, row) {
    row.childNodes.forEach((child, index) => {
        const evenPercentage = ((evenCounts[index] / totalCounts[index]) * 100).toFixed(1);
        const oddPercentage = ((oddCounts[index] / totalCounts[index]) * 100).toFixed(1);
        child.innerHTML = `p:${evenPercentage}%<br>i:${oddPercentage}%`;
    });
}

generateLayout();
