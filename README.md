## Deploy
```yaml
kubectl apply -f kubevirt-web-console.yaml
```

## build
```bash
docker build -t <registry>/kubevirt-web-console:v0.1 .
```

## Usage

noVNC

```txt
http://{ip}:32003/vnc/?name={vmname}&namespace={vmnamespace}
```

serial console

```txt
http://{ip}:32003/console/?name={vmname}&namespace={vmnamespace}
```

