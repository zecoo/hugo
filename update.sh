#!/bin/bash
hugo
git add .
git commit -m "update blog"
git push origin master
