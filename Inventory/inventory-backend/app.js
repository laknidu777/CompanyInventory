const express = require('express');
const cors = require('cors');
const businessOwnersRouter = require('./routes/businessOwners.js');

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/business-owners', businessOwnersRouter);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});