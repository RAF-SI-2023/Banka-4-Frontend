import { loginAdmin } from "../util/util"

describe('Terminski ugovori spec', () => {
    beforeEach(() => {
        loginAdmin(cy);
    })
    after(() => {
        //logout(cy)
    })

    it('Kupovanje terminskog ugovora', () => {
        //TODO implement
    })

    it('Kupovanje terminskog ugovora bez racuna', () => {
        //TODO implement
    })
})