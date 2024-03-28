export type RacunType = {
    naziv: string;
    broj: string;
    raspolozivo: number;
};
export const RACUNI_PLACEHOLDER: RacunType[] = [{ naziv: "Dragos", broj: '265-0000001234123-12', raspolozivo: 100.11 }, { naziv: "Drugi", broj: '265-0000001234124-13', raspolozivo: 100000 }]

// ne moze da bude async
export function getRacunByBroj(racuni: RacunType[], broj: string): (RacunType | null) {
    for (let racun of racuni) {
        if (racun.broj === broj) {
            return racun;
        }
    }
    return null;
}

export function formatRacun(broj: string): string {
    // Ensure the input string is of the expected length
    if (broj.length !== 18) {
        throw new Error('Invalid account number length');
    }

    // Extract parts of the account number
    const part1 = broj.substring(0, 3); // First 3 characters
    const part2 = broj.substring(3, 16); // Next 13 characters
    const part3 = broj.substring(16); // Last 2 characters

    // Combine the parts with dashes
    return `${part1}-${part2}-${part3}`;
}
