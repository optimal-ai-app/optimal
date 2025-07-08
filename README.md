# bolt_optimal

how 2 run:

backend (in bash):
mvn clean install
mvn clean compile && mvn spring-boot:run (run every time you make changes)

frontend:
npm install
npx expo start

expo:

choco install ngrok
ngrok http http://localhost:8080/
Copy the Forwarding link in terminal
Paste it into httpService.ts. Ex: const httpService = new HttpService("https://2e03bc7492e1.ngrok-free.app"/);
Open expo on mobile
