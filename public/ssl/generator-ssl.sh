echo "Generating self-signed certificates..."
mkdir -p ./config/sslcerts
openssl genrsa -out ./config/sslcerts/key.pem -aes256 1024
openssl rsa -in ./config/sslcerts/key.pem -out ./config/sslcerts/newkey.pem
rm ./config/sslcerts/key.pem
mv ./config/sslcerts/newkey.pem ./config/sslcerts/key.pem
openssl req -new -key ./config/sslcerts/key.pem -out ./config/sslcerts/csr.pem
openssl x509 -req -days 9999 -in ./config/sslcerts/csr.pem -signkey ./config/sslcerts/key.pem -out ./config/sslcerts/cert.pem
rm ./config/sslcerts/csr.pem
chmod 600 ./config/sslcerts/key.pem ./config/sslcerts/cert.pem