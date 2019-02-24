const express = require('express');
const router = express.Router();
const TrendingBills = require('../models/bills');

// INDEX ROUTE
 router.get('/', async (req, res, next) => {
    console.log(`QUERYING FOR TRENDING BILLS...`)

    // Find bills with more than 0 tracking (Sort in the future...)
    try  {
        // const trendingBills = await TrendingBills.find({ trackingCount: { $gt: 0} });
        const trendingBills = await TrendingBills.find().sort({trackingCount:-1}).limit(4) // for MAX
        
        console.log(`TOP BILLS: ${trendingBills}`)
        res.json({
            status: 200,
            data: trendingBills
        });
    } catch (err){
      res.send(err)
    }
});

// CREATE ROUTE
router.post('/', async (req, res) => {
    console.log(`We are creating a new bill in our database with: ${req.body}`)

    // Let's create a bill in our database (first follow)
    try {
        req.body.trackingCount = 1;
        const createdBill = await TrendingBills.create(req.body);
        res.json({
          status: 200,
          data: createdBill
        });
        // console.log(`Server created this bill: ${createdBill.json()}`)
    } catch(err){
        console.log(err);
        res.send(err);
    }
});

// SHOW ROUTE
router.get('/:id', async (req, res, next) => {
     try  {
        // const foundMovie = await Movie.findById(req.params.id);
        // res.json({
        //   status: 200,
        //   data: foundMovie
        // });
      } catch (err){
        res.send(err);
      }
});

// DECREMENT AND UPDATE ROUTE
router.put('/untrack/:id', async (req, res) => {
    try {
      console.log(`We sent this ID:${req.params.id}`)
      const updatedBill = await TrendingBills.findByIdAndUpdate(req.params.id, {$inc : {'trackingCount' : req.body.increment}}/*, {new: true}*/);
      res.json({
        status: 200,
        data: updatedBill
      });
    } catch(err){
      res.send(err)
    }
});


// INCREMENT AND UPDATE ROUTE
router.put('/track/:id', async (req, res) => {
  try {
    console.log(`We sent this ID:${req.params.id}`)
    const updatedBill = await TrendingBills.findByIdAndUpdate(req.params.id, {$inc : {'trackingCount' : req.body.increment}}/*, {new: true}*/);
    res.json({
      status: 200,
      data: updatedBill
    });
  } catch(err){
    res.send(err)
  }
});

module.exports = router;