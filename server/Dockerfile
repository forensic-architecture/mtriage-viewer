FROM python:3.8-slim-buster
ARG AWS_ACCESS_KEY
ARG AWS_SECRET_ACCESS_KEY
RUN mkdir -p /app
WORKDIR /app

RUN pip install flask flask_cors boto3
RUN mkdir ~/.aws
RUN echo "[default]\naws_access_key_id = $AWS_ACCESS_KEY\naws_secret_access_key = $AWS_SECRET_ACCESS_KEY" >> ~/.aws/credentials
ADD app.py /app/app.py
CMD ["python", "app.py"]
