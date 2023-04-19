const fs = require('fs');
const express = require('express');
const exphbs = require('express-handlebars');

const app = express();

// Database from json file
const jsonString = fs.readFileSync('./bucketlist.json', 'utf-8');
const bucketlist = JSON.parse(jsonString);


app.engine('handlebars', exphbs.engine({
    defaultLayout: 'main'
}));

app.set('view engine', 'handlebars');

app.use(express.static('public'));

// GET ALL
app.get('/my-bucketlist', (req, res) => {
    res.json(bucketlist);
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
        res.json(item);
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

// CREATE 
app.post('/my-bucketlist' , (req, res) => {

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

        // const url = `${req.protocol}://${req.get('host')}${req.originalUrl}/${newId}`;
        // res.location(url);
        // Or the one below works also
        // res.location('/api/products/'+ newId);

        res.status(201).json(newProduct);
        //res.json(products);
    }
    
});

// UPDATE


// DELETE

app.delete('/my-bucketlist/:id', (req,res) => {
    const id = Number(req.params.id);
    const item = bucketlist.find(item => item.id === id);

    // Jos ID löytyy, poistetaan kyseisen id:n product ja 
    // palautetaan poistettu id
    if(item){
        bucketlist = bucketlist.filter(item => item.id != id);
        res.json(`Deleted item by id: ${id}`);
        
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