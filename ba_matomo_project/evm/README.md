# Dependencies:
Python 3.10.1
NPM
Node

# Setup:
1. Run "npm install" in root directory to install needed dependencies.
2. Eventually you have to set proxy configuration to npm via "npm config set proxy http://username:password@host:port" and "npm config set https-proxy http://username:password@host:port"
3. It might be possible to install "forever" globally with "npm install -g forever"
4. Run "sudo chmod +x ./" to make *.sh files executable
5. Run "pip3 install -r requirements.txt" to install python module dependencies

# Starting the app
1. Run "./start.sh" to start the application
2. The app is running in the background, you can now close the shell
3. To check for the running process use "forever list"
4. To kill the app run "./stop.sh"

# Configuration

### Storage of the queries
The results are stored in the root directory in the file "DB-Matomo". This is overwritten daily.
Furthermore the subdirectory "archive" stores the current file of a day with the current timestamp (e.g. DB-Matomo-1581592343506).

### Adjusting the time range for queries (in days)
To change the time span (in days) to be queried, the value of "rangeToBeQueriedInDays" in config.json must be changed (smallest possible value: 1).

### Adding new sections / categories
To add new rubrics, the object "rubriks" in the config.json file must be adjusted. 
The rubric must have the same name as it is contained in the new PageID. 
For example:
	#1. 
		PageID: db-planet.deutschebahn.com.seiten.service-und-gewinnspiele.apps.blog.service-und-gewinnspiele.das-war-die-woche-(17--april-2020)
		rubric: service-und-gewinnspiele
	#2.
		PageID: db-planet.deutschebahn.com.seiten.region-suedwest.apps.blog."was-mich-bewegt!"."wohin-fuehrt-die-fahrt?"
		rubric: region-suedwest

Note: the rubric "db-update" has been added to output pages that contain their rubric elsewhere in the PageID. 