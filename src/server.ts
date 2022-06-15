import dotenv from 'dotenv';
import app from './app';

dotenv.config();

const PORT = process.env.PORT;

app.listen(PORT, () => console.log(`App is running on http://localhost:${PORT}`));
