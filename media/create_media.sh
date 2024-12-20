#!/bin/bash

PUBLIC_FOLDER="../app/public/"

function create_ico(){
    convert -bordercolor transparent -border 200 -density 1200 -background transparent -define 'icon:auto-resize=64,48,32,16' cow-svgrepo-com.svg $PUBLIC_FOLDER/favicon.ico
}

function create_logo(){
    convert -bordercolor white -border 200 -density 1200 -background white -resize $1x$1 cow-svgrepo-com.svg logo$1.png
}

create_ico
create_logo 192
create_logo 512