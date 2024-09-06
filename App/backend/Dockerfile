# Use a minimal base image for Python
FROM continuumio/miniconda3:latest

# Set working directory
WORKDIR /app
# Install necessary build tools
RUN apt-get update && apt-get install -y \
    build-essential \
    g++ \
    && apt-get clean \
    && rm -rf /var/lib/apt/lists/*

RUN apt-get update
RUN apt-get install -y libgl1-mesa-glx libglib2.0-0
    
# Make RUN commands use `bash --login`:
SHELL ["/bin/bash", "--login", "-c"]

COPY ./ ./
RUN conda env create -f /app/conda_env.yaml

# Activate conda environment
ENV PATH /opt/conda/envs/executor/bin:$PATH
RUN /bin/bash -c "source activate executor"
EXPOSE 5000
CMD ["python", "/app/app.py"]

# FROM python:3.9-slim

# WORKDIR /app

# COPY ./requirements.txt requirements.txt

# RUN apt-get update && apt-get install -y ffmpeg libsm6 libxext6 && rm -rf /var/lib/apt/lists/*

# RUN pip3 install torch==1.13.0+cpu torchvision==0.14.0+cpu --extra-index-url https://download.pytorch.org/whl/cpu

# RUN pip3 install Cython regex

# RUN pip3 install -U openmim

# RUN mim install mmcv==2.1.0

# RUN pip3 install -r requirements.txt

# COPY . /app

# EXPOSE 80

# # Run the application
# CMD ["python", "/app/land-area-master/backend/app.py"]
