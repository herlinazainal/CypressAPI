/// <reference types = "Cypress" />

const dataJson = require('../../fixtures/createuser')

describe('POST user request', function(){

    let accessToken = 'b3a2b614a9887926553a75d5c42ef9aad2f1b64da037fecf7e6eb86209b0acbc'
    let randomText = ""
    let testEmail = ""

    it('create user test', function(){

        var pattern = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
        for (var i = 0; i < 10; i++)
        randomText+=pattern.charAt(Math.floor(Math.random() * pattern.length));
        testEmail = randomText + "@gmail.com"

        cy.fixture('createuser').then((payload) =>{
        //1. create user (POST)
        cy.request({

            method: "POST",
            url: 'https://gorest.co.in/public/v2/users',
            headers: {
                'Authorization': 'Bearer ' + accessToken
            },
            body: {
                'name': payload.name,
                'gender': payload.gender,
                'email': testEmail,
                'status': payload.status
            }

        }).then((res)=>{
            cy.log(JSON.stringify(res))
            expect(res.status).to.eq(201)
            expect(res.body).has.property('name', payload.name)
            expect(res.body).has.property('gender', payload.gender)
            expect(res.body).has.property('email', testEmail)
        }).then((res)=>{

            const userId = res.body.id
            cy.log("user id is: " + userId)
            //2. get user:
            cy.request({
                method: 'GET',
                url: 'https://gorest.co.in/public/v2/users/'+userId,
                headers: {
                    'Authorization': 'Bearer ' + accessToken
                } 

            }).then((res)=>{
                expect(res.status).to.eq(200)
                expect(res.body).has.property('id', userId)
                expect(res.body).has.property('name', payload.name)
                expect(res.body).has.property('email', testEmail)
            })
        })

    })

})

})