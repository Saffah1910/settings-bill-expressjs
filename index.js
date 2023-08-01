import express from 'express';
import { engine } from 'express-handlebars';
import bodyParser from 'body-parser';
import SettingsBill from './settings.js';

const app = express();
const settingsBill = SettingsBill();


app.engine('handlebars', engine());
app.set('view engine', 'handlebars');
// app.set('views', './views');

app.use(express.static('public'));
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json())

app.get('/', function (req, res) {
    res.render('index')
});

app.post('/settings', function (req, res) {
   
settingsBill.setSettings({
    callCost : req.body.callCost,
    smsCost : req.body.smsCost,
    warningLevel : req.body.warningLevel,
    criticalLevel : req.body.criticalLevel,
});
console.log(settingsBill.getSettings());


    res.redirect('/');
});

app.post('./action', function (req, res) {

});

app.get('./actions', function (req, res) {

});
//this will set call or sms cost
app.get('./actions/:type', function (req, res) {

});


//make PORT a variable so that it can be chnaged in terminal
const PORT = process.env.PORT || 3011;

app.listen(PORT, function () {
    console.log("App started at port", PORT);
});