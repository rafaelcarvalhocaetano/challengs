FROM golang:1.17 as builder

WORKDIR /app

COPY . .

RUN CGO_ENABLED=0 GOOS=linux GOARCH=amd64 && \
  rm /app/go.mod && \
  go mod init dockergolang && \ 
  go mod download && go mod verify && \
  go build -o main

FROM scratch

COPY --from=builder /app/main /main

ENTRYPOINT [ "/main" ]