const express = require('express');
const bodyParser = require('body-parser');
const { exec } = require('child_process');
const cors = require('cors');
const { log } = require('console');
const app = express();
const fs = require('fs');
const PORT = process.env.PORT || 3100;

// Middleware
app.use(bodyParser.json());
app.use(cors());
app.use(cors({
    origin: 'http://localhost:3000', // Allow requests only from localhost:3000
    credentials: true // Allow sending cookies with the request (if needed)
}));

// API Endpoint for code execution
app.post('/execute', (req, res) => {
    const { code, language } = req.body;
    // console.log("backend",code,language)

    // Execute code based on language
    if (language === 'javascript') {
        // Write the JavaScript code to a temporary file
        fs.writeFile('temp.js', code, (err) => {
            if (err) {
                console.error('Error writing JavaScript code to file:', err);
                res.status(500).json({ error: 'Error writing JavaScript code to file' });
            } else {
                // Execute the temporary file using the Node.js interpreter
                exec('node temp.js', (error, stdout, stderr) => {
                    if (error) {
                        console.error('Error executing JavaScript code:', error);
                        res.status(500).json({ error: stderr });
                    } else {
                        console.log('JavaScript code executed successfully:', stdout);
                        res.status(200).json({ output: stdout });
                    }
                });
            }
        });
    }
    else if (language === 'python') {
        // Write the Python code to a temporary file
        fs.writeFile('temp.py', code, (err) => {
            if (err) {
                // console.error('Error writing Python code to file:', err);
                // res.status(500).json({ error: 'Error writing Python code to file' });
                console.log(err);
            } else {
                // Execute the temporary file using the Python interpreter
                exec('python temp.py', (error, stdout, stderr) => {
                    if (error) {
                        // console.error('Error executing Python code:', error);
                        // res.status(500).json({ error: stderr });
                        console.error('Error executing Python code:', error);
                    console.error('Python stderr:', stderr); // Log the stderr
                    res.status(500).json({ error: stderr }); 
                    } else {
                        console.log('Python code executed successfully:', stdout);
                        res.status(200).json({ output: stdout });
                    }
                });
            }
        });
    }
   
    else {
        res.status(400).json({ error: 'Unsupported language' });
    }
});

// Start server
app.listen(PORT, () => {
    console.log(`http://localhost:${PORT}`);
});

