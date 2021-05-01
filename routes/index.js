const express = require('express');
const router = express.Router();

const Time = require('../models/time');
const Value = require('../models/value');

/* GET home page. */


router.get('/time', async (req,res) => {
  try {
    const data = req.body;
    const time = await Time.find(
      // {date: data.date}
      );
    return res.status(200).json({message: `Fasting time for ${data.date} is ${time.time}`});
  } catch (error) {
    return res.status(400).json({message: 'Some error occured in generating Time Values', error: error})
  }
});


router.post('/postTime', async (req,res,next) => {
  try {
    let previous = await Time.findOneAndUpdate({id: 1}, {$set : {time: req.body.time}});
    if(previous){
      // console.log('yes')
      return res.status(200).json({message: 'successfully updated'})
    }
    const data = req.body;
    const createdTime = new Time({time: req.body.time, id: 1});
    createdTime.save().then((response) => {
      return res.status(200).json({
        message: `Successfully Recorded Time`,
      });
    })
  } catch (error) {
    return res.status(400).json({message: 'error in creating time', error: error})
  }
});

router.post('/values', async (req,res) => {
  // return await Value.deleteMany();
  try {
    const date = new Date().getDate();
    let previous = await Value.findOne({date: req.body.date});
    if(previous){
      console.log('yes')
      await Value.findOneAndUpdate({date: req.body.date}, {$set: {value: req.body.value}});
      return res.status(200).json({message: `values are updated ${req.body.value}`});
    }
    const value = new Value(req.body);
    console.log(value, 'value')
    value.save().then((response) => {
      return res.status(200).json({message: `values are stored ${req.body.value}`});
    })
  } catch (error) {
    console.log(error)
    return res.status(400).json({message: 'error in creating value', error: error})
  }
  
})


router.get('/retriveValue', async (req,res) => {
  // console.log('y')
  try {
    let val = await Value.find({});
    // console.log(val)
    return res.status(200).json({message: 'successfull', data: val});
  } catch (error) {
    return res.status(400).json({message: 'error in retreving value', error: error})
  }
  
})

module.exports = router;
