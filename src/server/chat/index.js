
import express from 'express'
import * as ctrl from './controller'

const router = express.Router();

router.post('/aylien', (req, res, next) => {
  return ctrl.aylien(req, res, next);
});

router.post('/rosette', (req, res, next) => {
  return ctrl.rosette(req, res, next);
});

router.post('/indico', (req, res, next) => {
  return ctrl.indico(req, res, next);
});

router.post('/meaningcloud', (req, res, next) => {
  return ctrl.meaningcloud(req, res, next);
});

export default router
