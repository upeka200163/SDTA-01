const express = require('express');
const path = require('path');
const app = express();


app.use(express.static("public")); 

app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.post('/greet', (req, res) => {
    const name = req.body.userName; 
    
    res.redirect(`/hello?name=${encodeURIComponent(name)}`);
});

app.get('/hello', (req, res) => {
    const name = req.query.name || "Guest";
    res.send(`
        <!DOCTYPE html>
        <html>
        <head>
            <title>Greeting</title>
            <link rel="stylesheet" href="/style.css">
        </head>
        <body>
            <div class="card">
                <h1>Hello, ${name}!</h1>
                <a href="/" class="back-link">Go Back</a>
            </div>
        </body>
        </html>
    `);
});


const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server is running at: http://localhost:${PORT}`);
});