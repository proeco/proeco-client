net:
	docker network create webev_link

up-front:
	# docker-compose -f docker-compose.yml up
	yarn & yarn dev

up-back:
	docker-compose -f ../proeco-back/docker-compose.yml up
