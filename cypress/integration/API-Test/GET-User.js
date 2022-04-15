/// <reference types = "Cypress" />

describe('GET API user test', function() {
    let accessToken = 'b3a2b614a9887926553a75d5c42ef9aad2f1b64da037fecf7e6eb86209b0acbc'
    it('get users', function() {

        cy.request({

            method: 'GET',
            url: 'https://gorest.co.in/public/v2/users',
            headers: {
                'authorization' : "Bearer " + accessToken
            }
            
        }).then((res)=>{
            expect(res.status).to.eq(200)
            //expect(res.body.meta.pagination.limit).to.eq(20)
        })
    })

    it('get users by id', function() {

        cy.request({

            method: 'GET',
            url: 'https://gorest.co.in/public/v2/users/3854',
            headers: {
                'authorization' : "Bearer " + accessToken
            }
            
        }).then((res)=>{
            expect(res.status).to.eq(200)
            expect(res.body.name).to.eq('Avani Kaul')
        })
    })
})