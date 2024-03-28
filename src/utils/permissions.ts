import { EmployeePermissions, UserPermissions } from "./types";

const permissionMap = {
    listanje_korisnika: 0b1,
    dodavanje_korisnika: 0b10,
    editovanje_korisnika: 0b100,
    deaktiviranje_korisnika: 0b1000,
    kreiranje_racuna: 0b10000,
    editovanje_racuna: 0b100000,
    brisanje_racuna: 0b1000000,
    listanje_radnika: 0b10000000,
    dodavanje_radnika: 0b100000000,
    editovanje_radnika: 0b100000000,
    deaktiviranje_radnika: 0b1000000000,
}
type Permission = {
    naziv: UserPermissions | EmployeePermissions;
    vrednost: boolean
}

export const encodePermissions = (permissions: Permission[]) => {
    let combinedPermissions = 0;
    permissions.forEach(permission => {
        if (permission.vrednost && permissionMap[permission.naziv] !== undefined) {
            combinedPermissions |= permissionMap[permission.naziv];
        }
    })
    return combinedPermissions
}

export const decodePermissions = (permissions: number) => {
    const decodedPermissions: string[] = [];
    for (const [name, value] of Object.entries(permissionMap)) {
        if (permissions & value) {
            decodedPermissions.push(name)
        }
    }
    return decodedPermissions?.join(", ");
}