FROM nginx:stable-alpine
COPY dist /opt/homebrew/etc/nginx/servers
EXPOSE 8008
CMD ["nginx", "-g", "daemon off;"]