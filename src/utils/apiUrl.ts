export const getApiUrl = (route: string) => {
    const koisnikRoutes = [
        '/omiljeni-korisnik',
        '/radnik',
        '/korisnik',
        '/validate-otp',
        '/generate-otp'
    ]
    const bankaRoutes = [
        '/transaction',
        '/exchange',
        '/credit',
        '/cards',
        '/racuni'
    ]
    const isKoisnikRoute = koisnikRoutes.some(prefix => route.startsWith(prefix));
    if (isKoisnikRoute) {
        return process.env.USER_URL
    }
    const isBankaRoute = bankaRoutes.some(prefix => route.startsWith(prefix));
    if (isBankaRoute) {
        return process.env.BANKA_URL
    }
    
    return process.env.BERZA_URL
}