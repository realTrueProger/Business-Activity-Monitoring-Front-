const express = require('express');
const path = require('path');
const app = express();
const publicFolder = path.join(__dirname, '..', 'public');
const port = process.env.PORT || 80;

app.use(express.static(publicFolder));
app.get('*', (req, res) => {
    res.sendFile(path.join(publicFolder, 'index.html'));
});

app.listen(port, () => {
    console.log('Server is up');
});