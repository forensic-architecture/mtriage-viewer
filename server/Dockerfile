FROM python:3.8-slim-buster
RUN mkdir -p /app
WORKDIR /app

RUN pip install flask flask_cors boto3
ADD app.py /app/app.py
CMD ["python", "app.py"]
