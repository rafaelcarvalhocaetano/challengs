build:
	docker build -t dockergolang .

login:
	docker login

run: build
	docker run dockergolang

tag: login
	docker tag dockergolang rafaelcarvalhocaetano/dockergolang

push: tag
	docker push rafaelcarvalhocaetano/dockergolang