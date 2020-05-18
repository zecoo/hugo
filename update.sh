hugo -D
git add .
echo "input commit info:"
read commit 	
git commit -m "$commit"
git push origin master
