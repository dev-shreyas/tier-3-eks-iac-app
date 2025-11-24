FROM jenkins/jenkins:lts

# Switch to root user to install Docker CLI
USER root

# Install Docker CLI
RUN apt-get update && apt-get install -y \
    ca-certificates \
    curl \
    gnupg2 \
    lsb-release

# Add Docker’s official GPG key and set up the stable repository    
RUN mkdir -p /etc/apt/keyrings && \
    curl -fsSL https://download.docker.com/linux/debian/gpg | gpg --dearmor -o /etc/apt/keyrings/docker.gpg    

RUN echo "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/docker.gpg] https://download.docker.com/linux/debian $(lsb_release -cs) stable" | tee /etc/apt/sources.list.d/docker.list

RUN apt-get update && apt-get install -y docker-ce-cli
    
RUN mkdir -p /usr/local/lib/docker/cli-plugins && \
    curl -SL https://github.com/docker/compose/releases/download/v2.27.0/docker-compose-linux-x86_64 \
    -o /usr/local/lib/docker/cli-plugins/docker-compose && \
    chmod +x /usr/local/lib/docker/cli-plugins/docker-compose

# Switch back to Jenkins user    
USER jenkins