
module.exports = {
  apps : [
    {
      name: "nlp-me",
      cwd:"/home/ubuntu/nlp-me/",
      script: "dist/server/app.js",
      watch: true,
      exec_mode: "cluster",
      instances: 1,
      env: {
        "NODE_ENV": "dev",
        "PORT": 3000
      },
      env_prod : {
        "NODE_ENV": "prod",
        "PORT": 5000
      }
    }
  ]
}
