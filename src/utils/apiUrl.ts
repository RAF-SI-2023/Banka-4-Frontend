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
        '/racuni',
        '/marzniRacuni'
    ]
    const isKoisnikRoute = koisnikRoutes.some(prefix => route.startsWith(prefix));
    if (isKoisnikRoute) {
<<<<<<< HEAD
        return 'https://banka-4-dev.si.raf.edu.rs/user-service/api'
        return 'https://banka-4-dev.si.raf.edu.rs/user-service/api'
    }
    const isBankaRoute = bankaRoutes.some(prefix => route.startsWith(prefix));
    if (isBankaRoute) {
        return 'https://banka-4-dev.si.raf.edu.rs/banka-service/api'
        return 'https://banka-4-dev.si.raf.edu.rs/banka-service/api'
    }
    return 'https://banka-4-dev.si.raf.edu.rs/berza-service/api'
    return 'https://banka-4-dev.si.raf.edu.rs/berza-service/api'
}
=======
        return process.env.REACT_APP_USER_URL
    }
    const isBankaRoute = bankaRoutes.some(prefix => route.startsWith(prefix));
    if (isBankaRoute) {
        return process.env.REACT_APP_BANKA_URL
    }
    
    return process.env.REACT_APP_BERZA_URL
}
