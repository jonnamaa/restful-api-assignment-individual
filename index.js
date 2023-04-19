const fs = require('fs');
const express = require('express');
const exphbs = require('express-handlebars');

const app = express();

// Database from json file
const jsonString = fs.readFileSync('./bucketlist.json', 'utf-8');
const bucketlist = JSON.parse(jsonString);
// fs.readFile("./bucketlist.json", "utf8", (err, jsonString) => {
//     if (err) {
//       console.log("Error reading the file", err);
//       return;
//     }
//     try {
//       const bucketlist = JSON.parse(jsonString);
//       console.log("Destination is:", bucketlist.destination);   
//     } catch (err) {
//       console.log("Error parsing JSON string:", err);
//     }
//   });

// bucketlist.forEach(element => {
//     console.log(element);
//   });

app.engine('handlebars', exphbs.engine({
    defaultLayout: 'main'
}));

app.set('view engine', 'handlebars');

app.use(express.static('public'));

app.get('/my-bucketlist', (req, res) => {
    //res.send("Testing");
    res.render('my-bucketlist',
    {
       pagetitle : "This is my bucketlist!",
       bucketlist : bucketlist 
    });
})


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Listening port ${PORT}`));