const express = require('express');
const router = express.Router();

/* --------------------- Controllers --------------------- */
const { authControllers, orgController, clusterController, projectController , repoController } = require('../controllers/admin');

/* --------------- AUTH ROUTES --------------- */

router.post('/login', authControllers.login);

router.post('/register', authControllers.register);

/* --------------- ORG ROUTES --------------- */

router.get('/org/getList', orgController.getOrgList);

router.get('/org/getDetails/:id', orgController.getOrgDetails);

router.get('/org/delete/:id', orgController.deleteOrg);

router.post('/org/updateDetails', orgController.updateOrgDetails);

router.post('/org/create', orgController.createOrg);

/* --------------- CLUSTER ROUTES --------------- */

router.post('/cluster/create', clusterController.createCluster);

router.get('/cluster/getList', clusterController.getClusterList);

router.get('/cluster/getDetails/:id', clusterController.getDetails);

router.get('/cluster/delete/:id', clusterController.deleteCluster);

router.post('/cluster/updateDetails', clusterController.updateCluster);

/* --------------- PROJECT ROUTES --------------- */

router.post('/project/create', projectController.createProject);

router.get('/project/getList', projectController.getProjectList);

router.get('/project/delete/:id', projectController.deleteProject);

router.post('/project/updateDetails', projectController.updateProject);

/* --------------- REPOS ROUTES --------------- */

router.post('/repo/create', repoController.createRepo);

router.get('/repo/getList', repoController.getrepoList);

router.post('/repo/updateDetails', repoController.updateRepoList);

router.post('/repo/delete/:id', repoController.deleteRepo);

router.get('/repo/getDetails/:id', repoController.getRepoDetails);

module.exports = router;
