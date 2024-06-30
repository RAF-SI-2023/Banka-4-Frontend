import { loginAdmin } from "../util/util"

describe('Porudzbine spec', () => {
    beforeEach(() => {
        loginAdmin(cy);
    })
    after(() => {
        //logout(cy)
    })

    it('Postavljanje porudzbine', () => {
        //TODO implement
    })

    it('Postavljanje porudzbine bez tickera', () => {
        //TODO implement
    })

    it('Postavljanje porudzbine bez quantity', () => {
        //TODO implement
    })

    it('Postavljanje porudzbine bez actiona', () => {
        //TODO implement
    })

    it('Prihvatanje porudzbine', () => {
        //TODO implement
    })

    it('Odbijanje porudzbine', () => {
        //TODO implement
    })
})