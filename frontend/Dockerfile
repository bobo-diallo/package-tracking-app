FROM node:latest

# Définir la variable d'environnement NODE_OPTIONS
#ENV NODE_OPTIONS="--openssl-legacy-provider"

# Définir le répertoire de travail
WORKDIR /angular

# Copier les fichiers de configuration
COPY package*.json ./

# Installer les dépendances
RUN npm ci
RUN npm install -g @angular/cli

COPY . .

EXPOSE 4200

# Commande pour démarrer l'application Angular
CMD ["npm", "run", "start"]
