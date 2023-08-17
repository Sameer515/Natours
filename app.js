const express = require('express');

const app=express();

const port= 3000;

app.get('/',(req,res)=>{
res
.status(200)
.json({message :'Hello Sfrom the server',app: 'Natours'});
});

app.post('/',(req,res)=>{

    res.send('You can send post');

})

app.listen(port,()=>{

    console.log(`Server is running on port ${port}`);

});