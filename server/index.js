const express = require('express');
const fs = require('fs');
const fsPromises = require('fs').promises;
const path = require('path');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

// API routes
app.get('/api/projects', async (req, res, next) => {
  try {
    const dataPath = path.join(__dirname, '..', 'data', 'projects.json');
    console.log('Reading from:', dataPath);
    console.log('Directory exists:', fs.existsSync(path.dirname(dataPath)));
    console.log('File exists:', fs.existsSync(dataPath));
    
    const data = await fsPromises.readFile(dataPath, 'utf8');
    console.log('Data read successfully');
    res.json(JSON.parse(data));
  } catch (err) {
    console.error('Error details:', {
      message: err.message,
      code: err.code,
      path: err.path,
      stack: err.stack
    });
    next(err);
  }
});

app.get('/api/projects/:id', async (req, res, next) => {
  try {
    const dataPath = path.join(__dirname, '..', 'data', 'projects.json');
    const data = await fsPromises.readFile(dataPath, 'utf8');
    const projects = JSON.parse(data);
    const project = projects.find(p => p.id === req.params.id);
    
    if (!project) {
      return res.status(404).send('Project not found');
    }
    
    res.json(project);
  } catch (err) {
    next(err);
  }
});

app.post('/api/projects', express.json(), async (req, res, next) => {
  try {
    const { projectName, stages, summary } = req.body;
    
    if (!projectName || !stages || !summary) {
      return res.status(400).send('Missing required fields');
    }
    
    const dataPath = path.join(__dirname, '..', 'data', 'projects.json');
    let projects = [];
    try {
      const data = await fsPromises.readFile(dataPath, 'utf8');
      projects = JSON.parse(data);
    } catch (err) {
      if (err.code !== 'ENOENT') throw err;
    }
    
    const newProject = {
      id: Date.now().toString(),
      projectName,
      stages,
      summary
    };
    
    projects.push(newProject);
    
    await fsPromises.writeFile(dataPath, JSON.stringify(projects, null, 2));
    
    res.status(201).json(newProject);
  } catch (err) {
    next(err);
  }
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Error:', err);
  res.status(500).json({ 
    error: err.message || 'Something broke!',
    details: process.env.NODE_ENV === 'development' ? {
      code: err.code,
      path: err.path,
      stack: err.stack
    } : undefined
  });
});

if (require.main === module) {
  const dataPath = path.join(__dirname, '..', 'data', 'projects.json');
  console.log('Starting server...');
  console.log('Current directory:', __dirname);
  console.log('Data file path:', dataPath);
  console.log('Directory exists:', fs.existsSync(path.dirname(dataPath)));
  console.log('File exists:', fs.existsSync(dataPath));
  
  app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
  });
}

module.exports = app;
