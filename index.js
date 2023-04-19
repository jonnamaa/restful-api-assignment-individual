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

// GET ALL
app.get('/my-bucketlist', (req, res) => {
    //res.send("Testing");
    res.render('my-bucketlist',
    {
       pagetitle : "This is my bucketlist!",
       bucketlist : bucketlist 
    });
})

// GET ONE
app.get('/my-bucketlist/:id', (req, res) => {
    const id = Number(req.params.id);
    const item = bucketlist.find(item => item.id === id);

    if(item){
        //res.json(item);
        res.render('my-bucketlist', {
            //product : product.toJSON()
            pagetitle : "This is a bucketlist item!",
            bucketlist : bucketlist 
        });
    }
    else{
        res.status(404).json(
            {
                msg: 'Not found'
            }
        )
    }
});

// CREATE 


// UPDATE


// DELETE

// List all the books 
// List the data of one book 
// Create a book (you can send the values using Postman) 
// Update a book (you can send the values using Postman)
// Delete a book 


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Listening port ${PORT}`));