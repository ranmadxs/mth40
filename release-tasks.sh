#!/bin/bash
echo "[INFO] INIT Release-task"
ls -la
npm --version
python --version
node --version
pwd
echo "Iniciando node"
node index.js
echo "[INFO] END RELEASE TASK"