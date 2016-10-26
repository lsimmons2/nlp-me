import express from 'express';
import ctrl from './controller';

const router = express.Router();

router.route('/aylien', (req, res, next) => {
  return ctrl.aylien(req, res, next);
});

router.route('/bitext', (req, res, next) => {
  return ctrl.bitext(req, res, next);
});

router.route('/rosette', (req, res, next) => {
  return ctrl.rosette(req, res, next);
});

export default router
