kubectl delete secret registry-creds -n registry-ui
kubectl create secret generic registry-creds \
    --from-file=.dockerconfigjson=/root/.docker/config.json \
    --type=kubernetes.io/dockerconfigjson \
    -n registry-ui
