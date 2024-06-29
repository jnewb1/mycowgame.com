#!/bin/sh

export EXISTING_VARS=$(printenv | awk -F= '{print $1}' | sed 's/^/\$/g' | paste -sd,);

export JSFOLDER=/usr/share/nginx/html/static/js/*.js

for file in $JSFOLDER;
do
  envsubst $EXISTING_VARS < $file > $file.tmp
  mv $file.tmp $file
done