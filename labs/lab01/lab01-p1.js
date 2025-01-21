//import http from "http"
import lodash from "lodash"

const holidays = [
    {name: "Christmas", date: new Date("2025-12-25")},
    {name: "Canada Day", date: new Date("2025-07-01")},
    {name: "April Fools", date: new Date("2025-04-01")},
    {name: "Halloween", date: new Date("2025-10-31")},
    {name: "Valentines Day", date: new Date("2025-02-14")}
]

let today = new Date();

holidays.forEach(holiday => {
    let dif = holiday.date - today
    let numDays = Math.ceil(dif / (1000 * 60 * 60 * 24))
    console.log(`${holiday.name} is in ${numDays} days!`)
}, holidays)

console.log(lodash.sample(holidays));
console.log(lodash.findIndex(holidays, {name:"Christmas"}))
console.log(lodash.findIndex(holidays, {name:"April Fools"}))

/*
const app = http.createServer((req, res) => {
    res.end("Hello! Check the console!")
    //if (req.url === '/') {
    //    res.end("Hello! Check the console!")
    //}
}) 
const PORT = 8000;
app.listen(PORT, ()=> {
    console.log(`http://localhost:${PORT}`)
})
*/