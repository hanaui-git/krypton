"use strict";

// Dependencies
const kryptonModule = require("./_krypton")

// Main
function login(krypton, readLine, request){
    return new Promise((resolve)=>{
        async function final(){
            const credential = krypton.credential

            krypton.log("i", "Logging in, please wait...")
            var loginResponse = await request.post(`${krypton.serverURL}login`, {
                headers: {
                    "content-type": "application/json"
                },
                body: JSON.stringify({ username: credential.username, password: credential.password })
            })

            loginResponse = JSON.parse(loginResponse.body)

            if(loginResponse.status === "failed"){
                krypton.log("e", "Invalid username/password.")
                return banner()
            }

            if(loginResponse.status === "success"){
                resolve()
            }else{
                krypton.log("e", "Invalid username/password.")
                banner()
            }
        }

        function password(){
            const passwordInput = readLine.question("Password: ", {
                hideEchoBack: krypton.security.hidePassword
            })

            if(!passwordInput){
                krypton.log("e", "Invalid username/password.")
                return banner()
            }
            
            krypton.credential.password = passwordInput
            final()
        }

        function username(){
            const usernameInput = readLine.question("Username: ", {
                hideEchoBack: krypton.security.hideUsername
            })

            if(!usernameInput){
                krypton.log("e", "Invalid username/password.")
                return banner()
            }

            krypton.credential.username = usernameInput
            password()
        }

        function banner(){
            setTimeout(()=>{
                console.clear()
                kryptonModule.randomBanner()

                username()
            }, 3000)
        }

        banner()
    })
}

module.exports = login