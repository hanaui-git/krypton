"use strict";

// Dependencies
const kryptonModule = require("./_krypton")

// Main
function login(krypton, readLine, request){
    return new Promise((resolve)=>{
        var codeTSU;

        async function final(){
            const credential = krypton.credential

            krypton.log("i", "Logging in, please wait...")
            var loginResponse = await request.post(`${krypton.serverURL}signup`, {
                headers: {
                    "content-type": "application/json"
                },
                body: JSON.stringify({ username: credential.username, password: credential.password, code: codeTSU })
            })

            loginResponse = JSON.parse(loginResponse.body)

            if(loginResponse.status === "failed"){
                krypton.log("e", "Invalid code.")
                return banner()
            }

            if(loginResponse.status === "success"){
                krypton.log("i", "Account successfully created.")
                setTimeout(()=>{
                    resolve()
                }, 3000)
            }else{
                krypton.log("e", "Invalid code.")
                banner()
            }
        }

        function code(){
            const codeInput = readLine.question("Code: ")

            if(!codeInput){
                krypton.log("e", "Invalid code.")
                return banner()
            }
            
            codeTSU = codeInput
            final()
        }

        function password(){
            const passwordInput = readLine.question("Password: ", {
                hideEchoBack: krypton.security.hidePassword
            })

            if(!passwordInput){
                krypton.log("e", "Invalid password.")
                return banner()
            }
            
            krypton.credential.password = passwordInput
            code()
        }

        function username(){
            const usernameInput = readLine.question("Username: ", {
                hideEchoBack: krypton.security.hideUsername
            })

            if(!usernameInput){
                krypton.log("e", "Invalid username.")
                return banner()
            }

            krypton.credential.username = usernameInput
            password()
        }

        function banner(){
            setTimeout(function(){
                console.clear()
                kryptonModule.randomBanner()

                username()
            }, 3000)
        }

        banner()
    })
}

module.exports = login