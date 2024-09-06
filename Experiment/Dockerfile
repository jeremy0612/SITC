FROM mmsegmentation:latest 
COPY ./mount_dataset/satellite_customization/__init__.py  /mmsegmentation/mmseg/datasets/__init__.py
ADD  ./mount_dataset/satellite_customization/satellite.py /mmsegmentation/mmseg/datasets/
ADD  ./mount_dataset/satellite_customization/example_satellite.py  /mmsegmentation/configs/_base_/datasets/
