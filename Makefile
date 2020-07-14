provision:
	scp ./docker-compose.yml TOKEN.txt regez-prod:~/
	scp ./docker-compose.yml TOKEN.txt regez-dev:~/
	scp ./docker-compose.yml TOKEN.txt regez-ci:~/
	scp ./config regez-ci:~/.ssh/

login:
	cat ./TOKEN.txt | docker login https://docker.pkg.github.com -u servuswoke --password-stdin

build:
	docker-compose build frontend

push:
	docker-compose push frontend

deploy-prod: build push
	ssh regez-prod "docker-compose pull && docker-compose up -d"

deploy-dev: build push
	ssh regez-dev "docker-compose pull && docker-compose up -d"

