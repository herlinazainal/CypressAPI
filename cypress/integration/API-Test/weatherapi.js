/// <reference types = "Cypress" />

describe('check weather information', function() {

    it('get weather information for cities', function() {
        //1st Request: GET locations

        cy.request({
            method: 'GET',
            url: 'https://www.metaweather.com/api/location/search/?query=San'

        }).then((response)=>{
            const city = response.body[0].title
            return city
        }).then((city)=>{

            //2nd Request: for the first locations/city

            cy.request({
                method: 'GET',
                url: 'https://www.metaweather.com/api/location/search/?query='+city
            }).then((response)=>{
                expect(response.status).to.eq(200)
                expect(response.body[0]).to.have.property('title', city)
            })
        })
    })

    it.only('get weather information for all cities', function() {
        //1st Request: GET locations

        cy.request({
            method: 'GET',
            url: 'https://www.metaweather.com/api/location/search/?query=Am'

        }).then((response)=>{
            const locations = response.body
            return locations
        }).then((locations)=>{

            for(let i=0; i<locations.length; i++){

            //2nd Request: for the first locations/city

            cy.request({
                method: 'GET',
                url: 'https://www.metaweather.com/api/location/search/?query='+locations[i].title
            }).then((response)=>{
                expect(response.status).to.eq(200)
                expect(response.body[0]).to.have.property('title', locations[i].title)
            })

        }
        })
    })
})