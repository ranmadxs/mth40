#!/bin/bash
echo "[INFO] INIT Release-task"
ls -la
npm --version
python --version
node --version
pwd
#echo "Iniciando node"
#node index.js
#printenv
echo  "var ENV_MTH40 = { MTH40_API_HOST: '$MTH40_API_HOST'," > public/config/env.properties
echo "MTH40_API_PORT: '$MTH40_API_PORT' }" >> public/config/env.properties
cat public/config/env.properties
echo "[INFO] END RELEASE TASK"