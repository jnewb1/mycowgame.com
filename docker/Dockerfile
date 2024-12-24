FROM node:20-buster

RUN apt update && apt install -y git imagemagick

RUN wget -O /root/git-completion.bash https://raw.githubusercontent.com/git/git/master/contrib/completion/git-completion.bash \
&& echo "source ~/git-completion.bash" >> /root/.bashrc
