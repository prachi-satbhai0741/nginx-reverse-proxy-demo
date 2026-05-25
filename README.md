# nginx-reverse-proxy-demo

[![Docker](https://img.shields.io/badge/Docker-2496ED?style=flat-square&logo=docker&logoColor=white)](https://www.docker.com/)
[![Nginx](https://img.shields.io/badge/Nginx-009639?style=flat-square&logo=nginx&logoColor=white)](https://nginx.org/)
[![Node.js](https://img.shields.io/badge/Node.js-339933?style=flat-square&logo=nodedotjs&logoColor=white)](https://nodejs.org/)
[![License](https://img.shields.io/badge/License-MIT-blue?style=flat-square)](./LICENSE)

A containerized demonstration of Nginx as a reverse proxy, routing HTTP traffic across three independent backend services using path-based routing, upstream load balancing, and rate limiting — all orchestrated with Docker Compose.

---

## Architecture

```
Client (HTTP)
     |
     v
  :8080
  nginx-proxy  (nginx:1.25-alpine)
     |
     |-- /service1/*  -->  service-app1 :3001  (least_conn upstream)
     |-- /service2/*  -->  service-app2 :3002
     |-- /service3/*  -->  service-app3 :3003
     |-- /health      -->  nginx built-in (200 OK)
     `-- /*           -->  404 JSON
```

All services communicate on an isolated Docker bridge network (`proxy-net`). Backend ports are not exposed to the host.


## Prerequisites

- Docker >= 24.x
- Docker Compose plugin (v2)

---

## Getting Started

**Clone and run**

```bash
git clone https://github.com/prachi-satbhai0741/nginx-reverse-proxy-demo.git
cd nginx-reverse-proxy-demo
docker compose up --build
```

**Verify the proxy is running**

```bash
curl http://localhost:8080/health
```

Expected response:
```json
{"status":"ok","proxy":"nginx"}
```

**Hit each backend through the proxy**

```bash
curl http://localhost:8080/service1/ping
curl http://localhost:8080/service2/ping
curl http://localhost:8080/service3/ping
```

Each service returns its name, the request path, and a timestamp.

**Confirm backend ports are not directly accessible**

```bash
curl http://localhost:3001   # should fail — port not exposed
```

---

## Project Structure

```
nginx-reverse-proxy-demo/
├── nginx/
│   └── nginx.conf          # reverse proxy config: routing, upstreams, rate limiting
├── app1/
│   ├── index.js            # Node.js HTTP service on port 3001
│   └── Dockerfile
├── app2/
│   ├── index.js            # Node.js HTTP service on port 3002
│   └── Dockerfile
├── app3/
│   ├── index.js            # Node.js HTTP service on port 3003
│   └── Dockerfile
└── docker-compose.yml      # orchestrates all four containers on proxy-net
```

