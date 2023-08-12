const express = require('express');
const app = express();
const random = require('lodash.random');

const countries = ["India", "Nepal", "Germany", "Finland"];

function checkMatrix() {
    const matrix = [];
    for (let i = 0; i < 3; i++) {
        const row = [];
        for (let j = 0; j < 3; j++) {
            row.push(countries[random(0, 3)]);
        }
        matrix.push(row);
    }
    return matrix;
}

function countriesRank(matrix) {
    const ranks = {};
    matrix.forEach(row => {
        let currentCountry = row[0];
        let currentCount = 1;
        for (let i = 1; i < row.length; i++) {
            if (row[i] === currentCountry) {
                currentCount++;
            } else {
                if (currentCount > 1) {
                    ranks[currentCountry] = Math.max(ranks[currentCountry] || 0, currentCount);
                }
                currentCountry = row[i];
                currentCount = 1;
            }
        }
        if (currentCount > 1) {
            ranks[currentCountry] = Math.max(ranks[currentCountry] || 0, currentCount);
        }
    });
    return ranks;
}

app.get('/api/get-countries-tags', (req, res) => {
    const matrix = checkMatrix();
    const ranks = countriesRank(matrix);
    
    const res = {
        outcome: matrix,
        rank: ranks
    };
    return res.status(200).send({status: true, data: res});
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
