import server from './config/server';
import './config/database';
import './src/services/CowinService';

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`app running on port ${PORT}`);
});
