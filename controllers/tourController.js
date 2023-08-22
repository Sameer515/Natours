const fs = require('fs');

const tours =JSON.parse(
    fs.readFileSync(`${__dirname}/../dev-data/data/tours-simple.json`)
    );

exports.checkID =(req,res,next,val) => {
    if(req.params.id *1 >tours.length)
    {
      return res.status(404).json({
          status: 'Error',
          message: 'Tour not found or invalid ID'
      });
    }
    next();
};


exports.checkBody =(req,res,next,) => {
if(!req.body.name || !req.body.price)
{
    return res.status(404).json({
        status:'fali',
        message: 'missing name or price'

})
}
next();

};

exports.getallTours= (req, res) => {
    res.status(200).json({
      status: 'Success',
      reqesttime: new Date().toISOString(),
      results:tours.length,
      data: {tours}
    })
    };
    
    exports.getTour =(req, res) => {
    
      const id=req.params.id*1;
      const tour=tours.find(el => el.id === id);
    
     
      res.status(200).json ({
                 data: {tour}
      });
      }
    
      exports.createTour =(req, res) =>{
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
    
      exports.updateTour = (req,res)=>{
    
        res.status(200).json({
          status:'Success',
          data : {
            tours: 'update tour here'
          }
      
        });
      
      }
    
      exports.deleteTour = (req,res)=>{
    
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

