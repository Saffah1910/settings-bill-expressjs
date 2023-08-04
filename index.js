import express from 'express';
import { engine } from 'express-handlebars';
import bodyParser from 'body-parser';
import SettingsBill from './settings.js';
import moment from 'moment';

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


// loop over the actios list which contains objects
// and grab timestamp by using the dot notaion
// set timestamp = moment().fromNow()
// startOf('hour').

function time() {
    let actionTime = settingsBill.actions();

    for (let i = 0; i < actionTime.length; i++) {
        actionTime[i].timestamp = moment().fromNow();
    }

    return actionTime;
}




app.get('/', function (req, res) {
    // const settings = settingsBill.getSettings();
    // // res.send({settings})
    res.render('index',
        {
            settings1: settingsBill.getSettings(),
            totals: settingsBill.totals(),
            levelReached: settingsBill.levelReached(),




        });
});

app.post('/settings', function (req, res) {

    settingsBill.setSettings({
        callCost: req.body.callCost,
        smsCost: req.body.smsCost,
        warningLevel: req.body.warningLevel,
        criticalLevel: req.body.criticalLevel,
    });
    console.log(settingsBill.getSettings());


    res.redirect('/');
});

app.post('/action', function (req, res) {

    settingsBill.recordAction(req.body.actionType);

    res.redirect('/');

});

app.get('/actions', function (req, res) {

    // console.log("ACIONS.....",time());

    res.render('actions',
        {
            actions: time()

        });

});
//this will set call or sms cost
app.get('/actions/:actionType', function (req, res) {
    const actionType = req.params.actionType;
    res.render('actions',
        {
            actions: settingsBill.actionsFor(actionType)

        });
});


//make PORT a variable so that it can be chnaged in terminal
const PORT = process.env.PORT || 3013;

app.listen(PORT, function () {
    console.log("App started at port", PORT);
});