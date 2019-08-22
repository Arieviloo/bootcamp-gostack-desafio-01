const express = require ('express')
const server = express()
server.use(express.json())

const projects = [];
let cont = 0;


//Middleware - verifica se o projeto com aquela ID existe 
function chekcId(req, res, next) {
  const { id } = req.params
  const project = projects.find(item => item.id == id)

  if(!project){
    return res.status(400).json({ error: 'Project not found' })
  }
    return next();
};

//Middleware - quantas requisições foram feitas na aplicação até então
function contRequest(req, res, next) {
  cont++
  console.log(`${cont} requisições`)
  return next()
};
server.use(contRequest)


server.get('/projects', (req, res) => {
  return res.json(projects)
});

server.post('/projects', (req, res) => {
  const { id } = req.body
  const { title } = req.body

  const project = {
    id,
    title,
    tasks: []
  }

  projects.push(project)

  return res.json(projects)

});

server.put('/projects/:id', chekcId, (req, res) => {
  const { id } = req.params
  const { title } = req.body
  const project = projects.find(item => item.id == id)
  
  project.title = title

  return res.json(project)
});

server.delete('/projects/:id', chekcId, (req, res) => {
  const { id } = req.params
  const projectDel = projects.findIndex(item => item.id == id)

  projects.splice(projectDel, 1)

  return res.send("projeto excluido com sucesso")
});

server.post('/projects/:id/tasks', chekcId, (req, res) => {
  const { id } = req.params
  const { title } = req.body
  const project = projects.find(item => item.id == id)
  
  project.tasks.push(title)

  return res.json(project)

});

server.listen(3000)
