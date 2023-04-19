const fs = require('fs');
const express = require('express');
const exphbs = require('express-handlebars');

const app = express();

// (Express) Middleware function: it can handle post requests and use the json data 
app.use(express.json());
// Same as above but if URL have some parameters, expresss can get those parameters from URL
app.use(express.urlencoded({extended: false}));

// Database from json file
const jsonString = fs.readFileSync('./bucketlist.json', 'utf-8');
let bucketlist = JSON.parse(jsonString);


app.engine('handlebars', exphbs.engine({
    defaultLayout: 'main'
}));

app.set('view engine', 'handlebars');

app.use(express.static('public'));

// GET ALL to webpage
app.get('/my-bucketlist', (req, res) => {
    res.render('my-bucketlist',
    {
       pagetitle : "This is my bucketlist!",
       bucketlist : bucketlist 
    });
})

//GET ALL API
app.get('/api/my-bucketlist', (req, res) => {
    res.json(bucketlist);
})

// GET ONE to webpage
app.get('/my-bucketlist/:id', (req, res) => {
    const id = Number(req.params.id);
    const item = bucketlist.find(item => item.id === id);

    if(item){
        res.render('my-bucketlist', 
        {
            pagetitle : "This is a bucketlist item!",
            item : item
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

// GET ONE API
app.get('/api/my-bucketlist/:id', (req, res) => {
    const id = Number(req.params.id);
    const item = bucketlist.find(item => item.id === id);

    if(item){
        res.json(item);
    }
    else{
        res.status(404).json(
            {
                msg: 'Not found'
            }
        )
    }
});


// CREATE API
app.post('/api/my-bucketlist' , (req, res) => {

    if(!req.body.destination || !req.body.country || !req.body.age) {
        res.status(400).json(
            { msg: 'Destination or country or age was not sent'}
        )
    }
    else {
        const newId = bucketlist[bucketlist.length-1].id + 1;

        const newProduct = {
            id : newId,
            destination : req.body.destination,
            country : req.body.country,
            age : req.body.age,
            visited : false
        }

        bucketlist.push(newProduct);

        res.status(201).json(newProduct);
        //res.json(products);
    }
    
});

// UPDATE

app.patch('/api/my-bucketlist/:id', (req,res) => {
    const idToUpdate = Number(req.params.id);
    // const newDestination = req.body.destination;
    // const newCountry = req.body.country;
    // const newAge = req.body.age;
    const visitedUpdated = req.body.visited;


    const item = bucketlist.find(item => item.id === idToUpdate);
    if(item) {
        item.destination = item.destination;
        item.country = item.country;
        item.age = item.age;
        item.visited = visitedUpdated;
        res.status(200).json(item);
    }
    else {
        res.status(404).json({
            "msg" : "Resource not found"
        })
    }

});



// DELETE

app.delete('/api/my-bucketlist/:id', (req,res) => {
    const id = Number(req.params.id);
    const item = bucketlist.find(item => item.id === id);

    // Jos ID löytyy, poistetaan kyseisen id:n product ja 
    // palautetaan poistettu id
    if(item){
        bucketlist = bucketlist.filter(item => item.id != id);
        res.json(item);
        
    }
    else{
        res.status(404).json(
            {
                msg: 'Not found'
            }
        )
    }

   
});




// List all the books 
// List the data of one book 
// Create a book (you can send the values using Postman) 
// Update a book (you can send the values using Postman)
// Delete a book 


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Listening port ${PORT}`));