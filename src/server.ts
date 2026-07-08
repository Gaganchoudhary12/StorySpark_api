import app from './app';

const port = Number(process.env.PORT || 5000);

app.listen(port, () => {
  console.log(`StorySpark API listening on port ${port}`);
});
