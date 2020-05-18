hugo -D
git add .
read -p "input commit info:" commit 	
git commit -m "$commit"
git push origin master
