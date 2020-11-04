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
    // check('name')
    //   .not()
    //   .isEmpty()
    //   .withMessage('Must not be empty')
    //   .isLength({
    //     min: 3,
    //   })
    //   .withMessage('Min Length: 3')
    //   .isAlpha()
    //   .withMessage('Name cannot contain numbers or special characters'),
    check('email', 'Email is not valid').isEmail(),
  ],
  (req, res) => {
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
