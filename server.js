const mongoose = require('mongoose');

const dotenv = require('dotenv');

dotenv.config({ path: `./config.env` });

const DB = process.env.DataBase.replace(
    '<PASSWORD>',
    process.env.Database_Password,
);

const app = require('./app');
// mongoose

mongoose.set('useNewUrlParser', true);
// mongoose.set('useCreateIndex', true);
mongoose.set('useUnifiedTopology', true);
// mongoose.set('useFindAndModify', false);

mongoose
    .connect(DB, { useNewUrlParser: true })
    .then(() => console.log('DB connection established'));

//

const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
