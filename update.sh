#!/bin/bash
hugo
git config --global --replace-all http.sslVerify "false"
git add .
git commit -m "update blog"
git push origin master