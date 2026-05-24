import express from 'express';
import cors from 'cors';

import stationsRoutes from './routes/stations.routes';
import priceReportsRoutes from './routes/priceReports.routes';

const app = express();

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.json({
    message: 'Gasolina CTG API'
  });
});

app.use('/api/stations', stationsRoutes);

app.use('/api/price-reports', priceReportsRoutes);

export default app;