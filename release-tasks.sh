#!/bin/bash
echo "[INFO] INIT Release-task"
ls -la
apt --version
python --version
python copyFTP.py
pwd
echo "[INFO] END RELEASE TASK"