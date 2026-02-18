FROM nginx:stable-alpine
# GitHub Actions가 만든 build 폴더를 nginx로 복사
COPY build /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]