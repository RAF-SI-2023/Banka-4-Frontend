import { loginAdmin } from "../util/util"

describe('OTC unutar banke spec', () => {
    beforeEach(() => {
        loginAdmin(cy);
    })
    after(() => {
        //logout(cy)
    })

    it('OTC dodaj ponudu', () => {
        //TODO implement
    })

    it('OTC dodaj ponudu bez tickera', () => {
        //TODO implement
    })

    it('OTC odobri ponudu kao seller', () => {
        //TODO implement
    })

    it('OTC odbij ponudu kao seller', () => {
        //TODO implement
    })

    it('OTC odobri ponudu kao banka', () => {
        //TODO implement
    })

    it('OTC odbij ponudu kao seller', () => {
        //TODO implement
    })
})