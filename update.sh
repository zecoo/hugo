#!/bin/bash
git config --global --replace-all http.sslVerify "false"
sleep 2s
hugo
git add .
git commit -m "update blog"
git push origin master