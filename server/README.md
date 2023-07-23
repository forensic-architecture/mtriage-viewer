## Run in development

NOTE: if you are using poetry >= 1.22, you should first run ``poetry config experimental.new-installer false`` to use the old installer. You can check your poetry version with ``poetry --version``.

```
poetry install
poetry run python app.py
```

Or, to not run startup indexing on every dev change, make sure you've run it at
least once as above (which will store the index on file), and then run:
```
poetry shell
export FLASK_ENV=development
flask run
```

## Run with Docker
```
docker build --build-arg AWS_ACCESS_KEY="your_key" --build-arg AWS_SECRET_ACCESS_KEY="your_secret_key" -t mtriage-server .
docker run -d -p 5000:5000 mtriage-server
```

Server will then be available on port 5000
