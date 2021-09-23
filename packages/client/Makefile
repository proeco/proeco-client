net:
	docker network create webev_link

up-front:
	npx lerna bootstrap && docker-compose -f docker-compose.yml up

up-back:
	docker-compose -f ../server/docker-compose.yml up
