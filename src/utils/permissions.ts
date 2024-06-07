import { EmployeePermissionsV2 } from "./types";

export const permissionMap = {
    list_users: 0b1,
    create_users: 0b10,
    edit_users: 0b100,
    deactivate_users: 0b1000,

    list_workers: 0b10000,
    create_workers: 0b100000,
    edit_workers: 0b1000000,
    deactivate_workers: 0b10000000,

    list_firms: 0b100000000,
    create_firms: 0b1000000000,
    edit_firms: 0b10000000000,
    deactivate_firms: 0b100000000000,

    list_bank_accounts: 0b1000000000000,
    create_bank_accounts: 0b10000000000000,
    deactivate_bank_accounts: 0b100000000000000,

    list_credits: 0b1000000000000000,
    accept_redits: 0b10000000000000000,
    deny_credits: 0b100000000000000000,

    list_cards: 0b1000000000000000000,
    activate_cards: 0b10000000000000000000,
    deactivate_cards: 0b100000000000000000000,
    block_cards: 0b1000000000000000000000,

    list_orders: 0b10000000000000000000000,
    accept_orders: 0b100000000000000000000000,
    deny_orders: 0b1000000000000000000000000,

    exchange_access: 0b10000000000000000000000000,
    payment_access: 0b100000000000000000000000000,
    action_access: 0b1000000000000000000000000000,
    option_access: 0b10000000000000000000000000000,
    order_access: 0b100000000000000000000000000000,
    termin_access: 0b1000000000000000000000000000000,
    profit_access: 0b10000000000000000000000000000000
}

type Permission = {
    naziv: EmployeePermissionsV2;
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

type PermissionsMap = {
    [key in EmployeePermissionsV2]: boolean;
};

export const encodePermissionsObj = (permissions: PermissionsMap) => {
    let combinedPermissions = 0;
    for (const key in permissions) {
        if (Object.prototype.hasOwnProperty.call(permissions, key)) {
            const enumKey = key as unknown as Permissions;
            if (typeof enumKey === 'number') {
                combinedPermissions |= permissionMap[enumKey];
            }
        }
    }
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

export const decodePermissionsObj = (permissions: number) => {

    const perms: { [key: string]: boolean } = {
        'list_users': false,
        'create_users': false,
        'edit_users': false,
        'deactivate_users': false,

        'list_workers': false,
        'create_workers': false,
        'edit_workers': false,
        'deactivate_workers': false,

        'list_firms': false,
        'create_firms': false,
        'edit_firms': false,
        'deactivate_firms': false,

        'list_bank_accounts': false,
        'create_bank_accounts': false,
        'deactivate_bank_accounts': false,

        'list_credits': false,
        'accept_redits': false,
        'deny_credits': false,

        'list_cards': false,
        'activate_cards': false,
        'deactivate_cards': false,
        'block_cards': false,

        'list_orders': false,
        'accept_orders': false,
        'deny_orders': false,

        'exchange_access': false,
        'payment_access': false,
        'action_access': false,
        'option_access': false,
        'order_access': false,
        'termin_access': false,
        'profit_access': false
    }
    for (const [name, value] of Object.entries(permissionMap)) {
        if (permissions & value) {
            if (Object.hasOwn(perms, name)) {
                perms[name] = true
            }
        }
    }
    return perms;
}

export const hasPermission = (permissions: number, requiredPermissions: EmployeePermissionsV2[]): boolean => {
    const requiredValues = requiredPermissions.map(permission => permissionMap[permission]);
    return requiredValues.every(value => value !== undefined && (permissions & value) !== 0);
}