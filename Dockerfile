# Sử dụng Node.js v23.5.0 làm base image
FROM node:23.5.0-alpine AS frontend

# Cài đặt thư viện và công cụ cần thiết, bao gồm glibc để hỗ trợ SWC
RUN apk add --no-cache \
    git \
    bash \
    libc6-compat \
    libstdc++ \
    libgcc

# Đặt thư mục làm việc trong container
WORKDIR /usr/src/app

# Copy package.json và package-lock.json vào container để cài đặt dependencies
COPY package*.json ./

# Cài đặt các dependencies cần thiết cho frontend
RUN npm cache clean --force
RUN npm install

# Copy toàn bộ mã nguồn vào container
COPY . .

# Chạy build React (Next.js)
RUN npm run build

# Cung cấp cổng 3000 để chạy ứng dụng
EXPOSE 3000

# Chạy ứng dụng trong chế độ production
CMD ["npm", "start"]
