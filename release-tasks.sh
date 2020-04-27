#!/bin/bash
echo "[INFO] INIT Release-task"
ls -la
npm --version
python --version
node --version
pwd
chmod 755 -R  public/config/

#echo "Iniciando node"
#node index.js
#printenv
echo  "var ENV_MTH40 = { MTH40_API_HOST: '$MTH40_API_HOST'," > public/config/env2.properties
echo "MTH40_API_PORT: '$MTH40_API_PORT' }" >> public/config/env2.properties
cat public/config/env2.properties
ls -la public/config/
chmod 777 
echo "[INFO] END RELEASE TASK"