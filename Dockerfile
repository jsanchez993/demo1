# Utiliza una imagen base de Node.js
FROM node:18-alpine

# Establece el directorio de trabajo dentro del contenedor
WORKDIR /app

# Copia los archivos de dependencias
COPY package.json package-lock.json* ./

# Instala las dependencias
RUN npm install

# Copia el resto de los archivos de la aplicación
COPY . .

# Expone el puerto en el que corre Vite
EXPOSE 5173

# Comando por defecto para iniciar la aplicación
CMD ["npm", "run", "dev", "--", "--host"]
