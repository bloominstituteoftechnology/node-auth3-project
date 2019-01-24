const express = require('express');
const router = express.Router();
const projects = require('../data/helpers/projectModel')

const sendUserError = (status, msg, res) => {
    res
        .status(status)
        .json({ Error: msg });
};

/************************************ PROJECTS SECTION ***********************************/

/********* Get Projects *************/
router.get('/', (req, res) => {
    projects.get()
        .then((projects) => {
            res.json(projects);
        })
        .catch(err => {
            res
                .status(500)
                .json({ error: "The projects information could not be retrieved." });
        });
});

/********* Get Single Project *************/
router.get('/:id', (req, res) => {
    const { id } = req.params
    projects.get(id)
        .then(project => {
            if (project) {
                res.json(project);
            } else {
                res
                    .status(404)
                    .json({ message: "The project with the specified ID does not exist." })
            }
        })
        .catch(err => {
            res
                .status(500)
                .json({ error: "The project information could not be retrieved." });
        });
});


/************* Delete Project *************/
router.delete('/:id', (req, res) => {
    const { id } = req.params

    if (id) {
        projects.remove(id)
            .then(project => {
                if (project) {
                    res.json({ message: "The project was successfully deleted" });
                } else {
                    res
                        .status(404)
                        .json({ message: "The project with the specified ID does not exist." })
                }
            })
            .catch(err => {
                res
                    .status(500)
                    .json({ error: "The project could not be removed." });
            });
    }
});

/********* Update Project *************/
router.put('/:id', (req, res) => {
    const { id } = req.params
    const newProject = req.body

    if (!newProject.name || !newProject.description || !newProject.completed) {
        res
            .status(400)
            .json({ message: "Please provide name, description and completed for the project." });
    } else {
       
        if (newProject) {
            projects.update(id, newProject)
                .then(project => {
                   
                        
                        if (project) {
                            res
                                .status(201)
                                .json(project);
                        } else {
                            res
                                .status(404)
                                .json({ message: "The project with the specified ID does not exist." })
                        }
                 
                   
                })
                .catch(err => {
                    res
                        .status(500)
                        .json({ error: "The project could not be modified." });
                });
        } else {

            res
                .status(404)
                .json({ message: "The project with the specified ID does not exist." })
        }
    }
})

/********* Create New Project *************/
router.post('/', (req, res) => {
    const project = req.body;
    if (project.name && project.description && project.completed) {
        projects.insert(project)
            .then(project => {
                res.status(201)
                    .json(project)
            })
            .catch(err => {
                res
                    .status(500)
                    .json({ message: "failed to insert project in db" })
            });
    } else {
        res
            .status(400)
            .json({ message: "missing name, description or completed status." })
    }
});

/************* Get Single Project's Actions *************/
router.get('/actions/:id', (req, res) => {
    const { id } = req.params;
    projects
        .getProjectActions(id)
        .then(usersActions => {
            if (usersActions === 0) {
                return sendUserError(404, 'No actions in the project', res);
            }
            res.json(usersActions);
        })
        .catch(err => {
            return sendUserError(500, 'Unable to access db', res);
        });
});



module.exports = router;