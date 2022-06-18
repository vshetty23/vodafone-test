describe('My First Test', () => {
    it('finds the content "type"', () => {

        cy.request('https://api-prod.prod.cms.df.services.vodafone.com.au/plan/postpaid-simo?serviceType=New').should((response) => {
            expect(response.status).to.eq(207)
            let planArray = response.body.planListing.plans

            let priceOnCard = 'data-testid=price'
            let stickyCartPrice = 'data-testid=sticky-cart-cost'          

            planArray.forEach(plan => {
                cy.viewport(1500, 750)
                let planId = plan.planId
                let ctaButtonText = plan.ctaLabel
                let planIdElement = `data-testid=plan-card-${planId}`

                cy.visit('https://www.vodafone.com.au/plans/sim-only')
                cy.get(`[${planIdElement}]`).within(() => {
                    cy.get('[data-testid=select-plan-cta]').contains(`${ctaButtonText}`)
                    cy.get("[data-testid=plan-card-actions-desktop]").contains("Add to cart").click();
                })
            });
        });
    })
})