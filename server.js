const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const { check, validationResult } = require('express-validator');

app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.json({ hello: 'World' });
});

app.post(
  '/formdata',
  [
    check('name')
      .not()
      .isEmpty()
      .withMessage('Must not be empty')
      .isLength({
        min: 3,
      })
      .withMessage('Min Length: 3')
      .isAlpha()
      .withMessage('Name cannot contain numbers or special characters'),
    check('email', 'Email is not valid').isEmail(),
    check('phone1')
      .not()
      .isEmpty()
      .withMessage('Phone Number cannot be empty')
      .isInt()
      .withMessage('Must contain digits only')
      .isLength({
        min: 3,
        max: 3,
      })
      .withMessage('The area code must be 3 digits'),
    check('zip')
      .not()
      .isEmpty()
      .isInt()
      .isPostalCode('RU')
      .withMessage('Not valid zip code'),
  ],
  (req, res) => {
    if (req.body.age !== 'No' && req.body.age !== 'Yes') {
      return res.status(422).json({
        errors: [{ msg: 'Invalid Data' }],
      });
    }

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({
        errors: errors.array(),
      });
    }
    res.status(202).json({
      success: true,
    });
  }
);

app.listen(process.env.PORT || 3001);
