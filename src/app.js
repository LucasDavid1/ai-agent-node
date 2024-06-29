const express = require('express');
const groqRoutes = require('./routes/groq');
const { sequelize } = require('./models');
const morgan = require('morgan');

const app = express();
const port = 3000;


app.use(morgan('dev'));

app.use(express.json());

app.use('/chat', groqRoutes);

app.get('/', (req, res) => {
  console.log('Root endpoint hit');
  res.send('Hello World!');
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Error:', err);
  res.status(500).json({ error: 'Internal Server Error' });
});

sequelize.sync({ force: false })
  .then(() => {
    console.log('Database synchronized');
    app.listen(port, () => {
      console.log(`App listening at http://localhost:${port}`);
    });
  })
  .catch((error) => {
    console.error('Error synchronizing database:', error);
  });
