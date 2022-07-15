# Dialogflow-Updater



1. Open Terminal on your computer

2. Copy and paste the following commands into terminal:

* clone repo
  ```sh
  git clone https://github.com/creativesites/Dialogflow-Updater.git
  ```

* cd into repo folder
  ```sh
  cd Dialogflow-Updater
  ```


* install dependencies
  ```sh
  npm install
  ```

* install NGROK.
Ngrok exposes the App's Express server to Google Sheets, allowing the app to listen to requests to run an update.
  ```sh
  npm install ngrok -g
  ```

* run ngrok
```sh
  ngrok http 3008
  ```
* run app
```sh
  npm run launch
  ```


6. Enter the following details onto the terminal when prompted:

- (`Enter your agentName :`)    Enter name of agent to copy from


- (`Enter intent index (remenber to count the index of the intent from the top and add ONE)`):   Count the position of the intent you want to copy and add one

- (`Enter target agent names seperated by a space:`)

- (`Enter your google email:`)

- (`Enter your password:`)


7. Wait for the script to run and finish. It'll run with headless mode set to false so you can follow the progress.

8. Close the program with control plus c from your keyboard. 


