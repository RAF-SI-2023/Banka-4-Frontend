import { NovaUplata, NoviPrenosSredstava } from "korisnici/types/Types";

export function isNovaUplata(object: any): object is NovaUplata {
    if (!object) return false;
    return typeof object.racunPosiljaoca === 'string' &&
        typeof object.nazivPrimaoca === 'string' &&
        typeof object.racunPrimaoca === 'string' &&
        typeof object.iznos === 'string' &&
        typeof object.pozivNaBroj === 'string' &&
        typeof object.sifraPlacanja === 'number' &&
        typeof object.svrhaPlacanja === 'string'
}

export function isNoviPrenosSredstava(object: any): object is NoviPrenosSredstava {
    if (!object) return false;
    return typeof object.racunPosiljaoca === 'string' &&
        typeof object.racunPrimaoca === 'string' &&
        typeof object.iznos === 'number';
}
