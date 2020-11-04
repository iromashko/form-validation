const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const { check, validationResult } = require('express-validator');
const multer = require('multer');

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

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads');
  },
  filename: function (req, file, cb) {
    cb(null, `${Date.now()}_${file.originalname}`);
  },
});
const upload = multer({ storage });

app.post('/file', upload.single('file'), (req, res) => {
  const file = req.file;
  if (file) {
    res.json(file);
  } else {
    throw new Error('File upload unsuccessful');
  }
});

app.post('/multifiles', upload.array('files'), (req, res) => {
  const files = req.files;
  if (Array.isArray(files) && files.length > 0) {
    res.json(files);
  } else {
    throw new Error('Files upload unsuccessful');
  }
});

app.listen(process.env.PORT || 3001);
