# Land area measurement project
This part includes all component for deploying the trained segmentation model to a simple web application. By default, we use a segformer with our new datas to improve the performance on Viet Nam territory. After running feel free to access the web app via `localhost:8989`. 
### Run project:
Before running docker command, in order to avoid further error, you should create and empty folder `./mysql/db` for mounting database .
1. Install images and run images
    ```
        docker compose up
    ```
2. Stop and kill all services:
    ```
        docker compose down
    ```
3. Stop and remove a specific service:
    ```
        docker compose rm -s -v <name of service>
    ```