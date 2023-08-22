const express = require('express');

const fs = require('fs');

const tours =JSON.parse(
    fs.readFileSync(`${__dirname}/../dev-data/data/tours-simple.json`)
    );

const getallTours= (req, res) => {
    res.status(200).json({
      status: 'Success',
      reqesttime: new Date().toISOString(),
      results:tours.length,
      data: {tours}
    })
    };
    
    const getTour =(req, res) => {
    
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
      }
    
    const createTour =(req, res) =>{
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
    
      }
    
      const updateTour = (req,res)=>{
    
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
      
      }
    
      const deleteTour = (req,res)=>{
    
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
      
      }


const router = express.Router();


router
.route('/')
.get(getallTours)
.post(createTour);

router
.route('/:id')
.get(getTour)
.patch(updateTour)
.delete(deleteTour);


module.exports = router;