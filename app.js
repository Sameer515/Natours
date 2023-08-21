const fs = require('fs');
const express = require('express');

const app=express();

app.use(express.json());

const port= 3000;

const tours =JSON.parse(
    fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`)
    );


app.get('/api/v1/tours',(req, res) => {
res.status(200).json ({
    status: 'Success',
    results:tours.length,
    data: {tours}
});
});

app.get('/api/v1/tours/:id',(req, res) => {

  const id=req.params.id*1;
  const tour=tours.find(el => el.id === id);

 // if(id>tours.length){
  if(!tour){
    return res.status(404).json({
        status: 'Error',
        message: 'Tour not found or invalid ID'
    });
  }

 
  res.status(200).json ({
             data: {tour}
  });
  });

app.post('/api/v1/tours',(req, res) =>{
   // console.log(req.body);
   const newId = tours[tours.length -1].id +1 ;
   const newTour = Object.assign({id: newId},req.body);
   tours.push(newTour);

   fs.writeFile(
    `${__dirname}/dev-data/data/tours-simple.json`,
    JSON.stringify(tours)
    ,error =>{
    res.status(201).json({
        status: 'Success',
          data: {
            tours: newTour
          } 
        });
      }
   );

   });
   // res.send('Done');

app.patch('/api/v1/tours/:id',(req,res)=>{

  if(req.params.id *1 >tours.length)
  {
    return res.status(404).json({
        status: 'Error',
        message: 'Tour not found or invalid ID'
    });
  }

  res.status(200).json({
    status:'Success',
    data : {
      tours: 'update tour here'
    }

  });

});


app.delete('/api/v1/tours/:id',(req,res)=>{

  if(req.params.id *1 >tours.length)
  {
    return res.status(404).json({
        status: 'Error',
        message: 'Tour not found or invalid ID'
    });
  }

  res.status(204).json({
    status:'Success',
    data : null

  });

});


app.listen(port,()=>{

    console.log(`Server is running on port ${port}`);

});