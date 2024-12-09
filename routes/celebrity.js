const express = require('express');
const celebrity_router = express.Router();
const sample_template = require('../views/tempale');
const templateEngine = require('../20488');
const celebrity_controller = require('../controllers/celebrity-controller');

celebrity_router.get('/:id', async(req, res) => {

    
  const celebrity_id = req.params.id;

  const celebrity = await celebrity_controller.getCelebrityById(celebrity_id);
  const data ={
    actorPage:`
          <h2>General Information</h2>
          <div class="basic-information-container">
            <img class="revenueItemImg" src="${celebrity.image}" class="d-block w-30" alt="${celebrity.name}">
            <div class="basic-information">
              <div class="basic-information-item">
                <h4>Name:</h4>
                <p>{${ celebrity.name }}</p>
              </div>
              <div class="basic-information-item">
                <h4>Summary: </h4>
                <p>${celebrity.summary}</p>
              </div>
            </div>
          </div>
  `,
    isDetailActor: true,
  } 
  var returned = templateEngine.render(sample_template,data);
  res.send(returned);
});

module.exports = celebrity_router;
