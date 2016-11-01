import express from 'express';
import * as ctrl from './controller';

const router = express.Router();

router.post('/aylien', (req, res, next) => {
  return ctrl.aylien(req, res, next);
});

router.post('/bitext', (req, res, next) => {
    return ctrl.bitext(req, res, next);
});

router.post('/rosette', (req, res, next) => {
  return ctrl.rosette(req, res, next);
});

export default router
