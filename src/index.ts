
import express from "express";
import { outcomes } from "./outcomes";
import cors from "cors";
require('dotenv').config();

const app = express();
app.use(cors());

let possiblieOutcomes:number[] = [];
let pattern:string[] = []

const MULTIPLIERS: {[ key: number ]: number} = {
    0: 16,
    1: 9,
    2: 2,
    3: 1.4,
    4: 1.4,
    5: 1.2,
    6: 1.1,
    7: 1,
    8: 0.5,
    9: 1,
    10: 1.1,
    11: 1.2,
    12: 1.4,
    13: 1.4,
    14: 2,
    15: 9,
    16: 16
}

app.post("/game", (req, res) => {
    // receive data
    if (req.method === 'POST') {
        let data = '';
        req.on('data', chunk => {
            data += chunk.toString();
        });
        req.on('end', () => {
            const jsonParseData = JSON.parse(data);
            const rowCount = jsonParseData.rowCount;

            let outcome = 0;
            
            for (let i = 0; i < rowCount; i++) {
                if (Math.random() > 0.5) {
                    pattern.push("R")
                    outcome++;
                } else {
                    pattern.push("L")
                }
            }
            
            // const multiplier = MULTIPLIERS[outcome];
            if (outcomes === null) {
                console.log("outcoms is null");
                return;
            }
            possiblieOutcomes = outcomes[outcome];
            console.log("outputs: " + " rowCount: " + rowCount + " pinIndex: " + outcome + " startPoint: " + possiblieOutcomes[Math.floor(Math.random() * possiblieOutcomes.length || 0)]);
            res.end('Data received');
        });
    }
    
    res.send({
        point: possiblieOutcomes[Math.floor(Math.random() * possiblieOutcomes.length || 0)],
        // multiplier,
        pattern
    });
});

app.listen(process.env.PORT, () => console.log('Server running on port', process.env.PORT));

module.exports = app;