describe('validate player informations', () => {
	it('should see players informations', () => {
		cy.request({
			url: '/44',
			headers: { 'X-Auth-Token': '7e79c5ca42b54ec88a44eab35066ec14' },
			method: 'GET',
		}).then(function (response) {
			expect(response.isOkStatusCode)
			expect(response.body.name).to.equal('Cristiano Ronaldo')
			expect(response.body.position).to.equal('Centre-Forward')
		})
	})

	it('should not see player informations without API token', () => {
		cy.request({
			method: 'GET',
			url: '/44',
			failOnStatusCode: false,
		}).then(function (response) {
			expect(response.body.message).eql(
				`The resource you are looking for is restricted and apparently not within your permissions. Please check your subscription.`
			)
			expect(response.status).to.eql(403)
		})
	})

	it('should not see player informations with invalid API token', () => {
		cy.request({
			method: 'GET',
			url: '/44',
			headers: { 'X-Auth-Token': 'abcdefghijklmnopqrstuvwxyz' },
			failOnStatusCode: false,
		}).then(function (response) {
			expect(response.statusText).eql('Bad Request')
			expect(response.body.message).eql(`Your API token is invalid.`)
			expect(response.status).to.eql(400)
		})
	})

	it('should not see player informations with wrong request', () => {
		cy.request({
			url: '/x',
			headers: { 'X-Auth-Token': '7e79c5ca42b54ec88a44eab35066ec14' },
			method: 'GET',
			failOnStatusCode: false,
		}).then(function (response) {
			const res = response.body
			expect(res.message).equal(
				`Argument 'id' is expected to be an integer in a specified range.`
			)
			expect(res.errorCode).to.equal(400)
		})
	})

})
