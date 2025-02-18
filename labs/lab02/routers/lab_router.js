import express from "express";
const router = express.Router();

// Checking if in route.
router.get("/", (req, res) => {
    res.send("Welcome to the lab router! :)");
});

// Name Route
router.get("/name", (req, res) => {
    res.send("Ryan Pearce");
});

// Greeting
router.get("/greeting", (req, res) => {
    res.send("Hello! I'm Ryan Pearce and my student id is N01366544!");
});

// Add
router.get("/add/:x/:y", (req, res) => {
    let {x, y} = req.params;
    res.send(`${x} + ${y} = ${parseInt(x) + parseInt(y)}`);
});

// Calculate
router.get("/calculate/:x/:o/:y", (req, res) => {
    let x = parseFloat(req.params.x); // Value #1
    let y = parseFloat(req.params.y); // Value #2

    if (x !== NaN && y !== NaN) {
        let operator = req.params.o; // My Operation.
        
        if (operator == '*') {
            operator = 'x'; // Just to make it look a bit more pleasing to the eye. Though '*' is obviously acceptable.
        }
        else if (operator == 'divide') {
            operator = '/';
        }

        switch (operator)
        {
            case '+':
            {
                res.send(`${x} ${operator} ${y} = ${x + y}`);
                break;
            }
            case '-':
            {
                res.send(`${x} ${operator} ${y} = ${x - y}`);
                break;
            }
            case '/':
            {
                res.send(`${x} ${operator} ${y} = ${x / y}`);
                break;
            }
            case 'x':
            {
                res.send(`${x} ${operator} ${y} = ${x * y}`);
                break;
            }
            default:
            {
                res.send("Error: You have input an invalid operator.\nValid Inputs: '+', '-', '%2F', 'divide', '*' and 'x'");
                break;
            }
        }
    }
    else
    {
        res.send("Error: You must have two numbers formatted like so: /calculate/{Number1}/{Operator}/{Number2}");
    }
});

export default router;