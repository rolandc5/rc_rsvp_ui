#Rsvp UI

To run local
1. npm install
2. npm run start

To run Production
1. npm install
2. npm run build-prod
3. npm run serve-prod

To build docker and push
1. docker build -t rcarlo/rc_rsvp_ui:latest --platform linux/amd64,linux/arm64 .
2. docker push rcarlo/rc_rsvp_ui:latest