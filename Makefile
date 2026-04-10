.PHONY: fetch run discord test clean

fetch:
	@node scripts/generateRestaurants.js > data/restaurants.json
	@node scripts/generateActivities.js > data/activities.json
	@echo "Donnees generees"

run:
	@python3 main.py

discord:
	@python3 discord_bot.py

test:
	@python3 -c "from restaurant_loader import load_restaurants; from activity_loader import load_activities; print(f'{len(load_restaurants())} restos, {len(load_activities())} activites')"

clean:
	@rm -rf __pycache__ *.pyc data/restaurants.json data/activities.json