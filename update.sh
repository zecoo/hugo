#!/bin/bash
hugo -D
git add .
echo "input commit info:"
read -t 5 commit_info
commit_info=${commit_info:-"update blog"}
git commit -m "$commit_info"
git push origin master
