const cors = require('cors');
const swaggerUi = require('swagger-ui-express');
const YAML = require('yamljs');
const app = require('./config/express')
const authRoute = require('./routes/authRoute');
const assignmentRoute = require('./routes/assignmentRoute');
const swaggerDocument = YAML.load('./swagger_doc.yaml');


app.use(cors());

app.use('/api/auth', authRoute);
app.use('/api/assignments', assignmentRoute);
app.use('/api/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

const PORT = 5000;
app.listen(PORT, () => {
    console.log(`Server listening on http://localhost:${PORT}`);
});