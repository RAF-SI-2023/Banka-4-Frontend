import { loginAdmin } from "../util/util"

describe('Akcije spec', () => {
    beforeEach(() => {
        loginAdmin(cy);
    })
    after(() => {
        //logout(cy)
    })

    it('Kupovanje akcije', () => {
        //TODO implement
    })

    it('Kupovanje akcije bez biranja racuna', () => {
        //TODO implement
    })

    it('Kupovanje akcije bez biranja kolicine', () => {
        //TODO implement
    })

    it('Kupovanje akcije bez biranja limita', () => {
        //TODO implement
    })

    it('Kupovanje akcije bez biranja stopa', () => {
        //TODO implement
    })
})