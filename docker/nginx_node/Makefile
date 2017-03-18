delete:
	sudo rm -rf api/node_modules

create: delete
	mkdir api/node_modules

run: create
	docker-compose up -d --build

down: delete
	docker-compose down