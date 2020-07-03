const express = require('express');

const router = express.Router();

const serviceName = 'docsm';
/* GET home page. */
router.get('/', (req, res, next) => {
  // res.('index', { title: 'Express' });
  res.send('express');
});

// eureka 心跳路由
router.get('/info', (req, res) => {
  res.json({ name: serviceName, status: 'UP' });
});

// spring admin 心跳路由
router.get('/health', (req, res) => {
  res.json({
    description: 'Spring Cloud Eureka Discovery Client',
    status: 'UP',
    hystrix: {
      status: 'UP',
    },
  });
});

module.exports = router;
