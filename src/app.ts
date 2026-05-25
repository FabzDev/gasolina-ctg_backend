import express from 'express';
import cors from 'cors';

import authRoutes from './routes/auth.routes';
import stationsRoutes from './routes/stations.routes';
import priceReportsRoutes from './routes/priceReports.routes';
import adminRoutes from './routes/admin.routes';

const app = express();

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.json({
    message: 'Gasolina CTG API'
  });
});

app.use('/api/auth', authRoutes);
app.use('/api/stations', stationsRoutes);
app.use('/api/price-reports', priceReportsRoutes);
app.use('/api/admin', adminRoutes);

export default app;