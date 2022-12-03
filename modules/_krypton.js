"use strict";

// Dependencies
const chalk = require("chalk")

// Functions
function mainBanner(){
    console.log(chalk.magentaBright(`
    
    ██ ▄█▀ ██▀███ ▓██   ██▓ ██▓███  ▄▄▄█████▓ ▒█████   ███▄    █ 
    ██▄█▒ ▓██ ▒ ██▒▒██  ██▒▓██░  ██▒▓  ██▒ ▓▒▒██▒  ██▒ ██ ▀█   █ 
   ▓███▄░ ▓██ ░▄█ ▒ ▒██ ██░▓██░ ██▓▒▒ ▓██░ ▒░▒██░  ██▒▓██  ▀█ ██▒
   ▓██ █▄ ▒██▀▀█▄   ░ ▐██▓░▒██▄█▓▒ ▒░ ▓██▓ ░ ▒██   ██░▓██▒  ▐▌██▒
   ▒██▒ █▄░██▓ ▒██▒ ░ ██▒▓░▒██▒ ░  ░  ▒██▒ ░ ░ ████▓▒░▒██░   ▓██░
   ▒ ▒▒ ▓▒░ ▒▓ ░▒▓░  ██▒▒▒ ▒▓▒░ ░  ░  ▒ ░░   ░ ▒░▒░▒░ ░ ▒░   ▒ ▒ 
   ░ ░▒ ▒░  ░▒ ░ ▒░▓██ ░▒░ ░▒ ░         ░      ░ ▒ ▒░ ░ ░░   ░ ▒░
   ░ ░░ ░   ░░   ░ ▒ ▒ ░░  ░░         ░      ░ ░ ░ ▒     ░   ░ ░ 
   ░  ░      ░     ░ ░                           ░ ░           ░ 
                   ░ ░                                           `))
}

// Main
function randomBanner(){
    const banners = [mainBanner]

    banners[Math.floor(Math.random() * banners.length)]()
}

module.exports = {
    randomBanner
}