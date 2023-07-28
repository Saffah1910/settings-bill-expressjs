import express from 'express';
const app = express();

app.get('/', function(req,res){
    res.send('Settings Bill App')
});

app.post('./settings', function(req, res){

});

app.post('./action', function(req, res){

});

app.get('./actions', function(req, res){

});
//this will set call or sms cost
app.get('./actions/:type', function(req, res){

});


//make PORT a variable so that it can be chnaged in terminal
const PORT = process.env.PORT || 3011;

app.listen(PORT, function(){
console.log("App started at port" , PORT);
});