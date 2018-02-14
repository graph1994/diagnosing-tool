# diagnosing-tool
A tool that will return a diagnosis based on a symptom is selected.

Inorder to setup the application that following commands must be run:

Backend:

`virtualenv -p python3 env`

`source env/bin/activate`

`pip install -r requirements.txt`

`python manage.py migrate`

`python manage.py runscript import_data`

You should see `---RUNNING IMPORT DATA SCRIPT---` in the terminal.

`python manage.py runserver`



In a separate terminal navigate to diagnosing-tool-web:

Frontend:

`yarn`

`yarn start`

Then open a browser and navigate to `http://localhost:3000/`

