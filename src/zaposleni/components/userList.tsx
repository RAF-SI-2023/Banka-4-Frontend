import * as React from 'react';
import { Table, TableBody, TableRow } from '@mui/material';
import { User, UserListProps } from '../../utils/types';
import { StyledHeadTableCell, StyledTableCell, StyledTableHead, StyledTableRow, ScrollContainer } from '../../utils/tableStyles';
import { useNavigate } from 'react-router-dom';



const UserList: React.FC<UserListProps> = ({ users }) => {
    const navigate = useNavigate();

    const handleUserSelect = (event: any) => {
        const id = event.currentTarget.id;
        navigate(`/korisnik?jmbg=${id}`)
    };

    return (
        <ScrollContainer>
            <Table sx={{ minWidth: 650, marginTop: 0 }}>
                <StyledTableHead>
                    <TableRow>
                        <StyledHeadTableCell>Ime</StyledHeadTableCell>
                        <StyledHeadTableCell>Prezime</StyledHeadTableCell>
                        <StyledHeadTableCell>JMBG</StyledHeadTableCell>
                        <StyledHeadTableCell>Pol</StyledHeadTableCell>
                        <StyledHeadTableCell>Adresa stanovanja</StyledHeadTableCell>
                        <StyledHeadTableCell>Mejl adresa</StyledHeadTableCell>
                        <StyledHeadTableCell>Broj telefona</StyledHeadTableCell>
                        {/* <StyledHeadTableCell>Permisije</StyledHeadTableCell> */}
                    </TableRow>
                </StyledTableHead>
                <TableBody>
                    {users?.map((user: User) => (
                        <StyledTableRow key={user.jmbg} id={user.jmbg} onClick={handleUserSelect}>
                            <StyledTableCell>{user.ime}</StyledTableCell>
                            <StyledTableCell>{user.prezime}</StyledTableCell>
                            <StyledTableCell>{user.jmbg}</StyledTableCell>
                            <StyledTableCell>{user.pol}</StyledTableCell>
                            <StyledTableCell>{user.adresa}</StyledTableCell>
                            <StyledTableCell>{user.email}</StyledTableCell>
                            <StyledTableCell>{user.brojTelefona}</StyledTableCell>
                            {/* <StyledTableCell>{user.permisije?.join(', ')}</StyledTableCell> */}
                        </StyledTableRow>
                    ))}
                </TableBody>
            </Table>
        </ScrollContainer>
    );
};

export default UserList;