"use strict";

// Dependencies
const kryptonModule = require("./modules/_krypton")
const signUP = require("./modules/_signUP")
const readLine = require("readline-sync")
const login = require("./modules/_login")
const request = require("request-async")
const chalk = require("chalk")

// Variables
var krypton = {
    security: {
        hidePassword: true
    },
    credential: {
        username: null,
        password: null
    },
    serverURL: "http://localhost:8080/"
}

// Functions
krypton.log = function(type, message){
    if(type === "i"){
        console.log(`${chalk.blueBright("<->")} ${message}`)
    }else if(type === "e"){
        console.log(`${chalk.redBright("<->")} ${message}`)
    }
}

krypton.startMenu = function(){
    kryptonModule.randomBanner()

    console.log(`1. Login
2. Sign UP`)
    
    const option = +readLine.question(`${chalk.magenta("Option $")} `)

    if(option === 1){
        krypton.login()
    }else if(option === 2){
        krypton.signUP()
    }else{
        krypton.log("e", "Invalid option.")
        setTimeout(()=>{
            console.clear()
            krypton.startMenu()
        }, 3000)
    }
}

krypton.signUP = async function(){
    await signUP(krypton, readLine, request)

    console.clear()
    kryptonModule.randomBanner()
    krypton.login()
}

krypton.login = async function(){
    await login(krypton, readLine, request)

    console.clear()
    kryptonModule.randomBanner()
    krypton.navigation()
}

krypton.navigation = function(){
    const command = readLine.question(`${chalk.magenta("Krypton $")} `)

    if(command === "help"){
        console.log(`
General Commands
================

    Command                     Description
    -------                     -----------
    help                        Show this.
    clear                       Clear console.
    exit                        Exit Krypton.
`)
    }else if(command === "clear"){
        console.clear()
    }else if(command === "exit"){
        process.exit()
    }else{
        krypton.log("e", "Unrecognized command.")
    }

    krypton.navigation()
}

// Main
krypton.startMenu()