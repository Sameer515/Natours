const mongoose = require('mongoose');

const dotenv = require('dotenv');

dotenv.config({ path: `./config.env` });

const DB = process.env.DataBase.replace(
  '<PASSWORD>',
  process.env.Database_Password,
);

mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  })
  .then(() => console.log('DB connection established'));

const app = require('./app');

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
