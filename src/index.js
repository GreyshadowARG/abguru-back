// Config server básico
import app from './app.js'
import './database.js'
import 'dotenv/config'

const PORT = process.env.PORT

app.listen(PORT, () => {
  console.log(`Corriendo en puerto ${PORT}`);
});
