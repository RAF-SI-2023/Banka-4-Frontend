import React, { useEffect, useState } from "react";
import { BankRoutes, Kartica } from "../../utils/types";
import { makeGetRequest } from "../../utils/apiRequest";
import { Button, Card, List, ListItem, ListItemText, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from "@mui/material";
import { getMe } from "../../utils/getMe";
import { StyledHeadTableCell, StyledTableCell, StyledTableHead, StyledTableRow } from "utils/tableStyles";

export default function PregledKartica() {
    const [kartice, setKartice] = useState<Kartica[]>([]);
    const [jeZaposleni, setJeZaposleni] = useState(false);

    useEffect(() => {
        const me = getMe();
        if (me?.permission)
            setJeZaposleni(true)
        makeGetRequest(BankRoutes.cards)
            .then((result) => {
                setKartice(result);
            })
            .catch((e) => {
                alert("Greška pri preuzimanju kartica");
            });
    }, []);

    const handleRowClick = (kartica: Kartica) => {
        localStorage.setItem('selectedKartica', JSON.stringify(kartica));
        window.location.replace("/kartica?id=" + kartica.id);
    };

    return (
        <div style={{ width: "80%", margin: "auto" }}>
            {jeZaposleni && (
                <Button variant="contained" color="primary" href="/dodaj-karticu">
                    Dodaj Karticu
                </Button>
            )}
            <TableContainer component={Paper} style={{ margin: '10px' }}>
                <Table sx={{ minWidth: 650 }}>
                    <StyledTableHead>
                        <StyledTableRow>
                            <StyledHeadTableCell>Broj</StyledHeadTableCell>
                            <StyledHeadTableCell>Vrsta</StyledHeadTableCell>
                            <StyledHeadTableCell>Datum isteka</StyledHeadTableCell>
                            <StyledHeadTableCell>Status</StyledHeadTableCell>
                        </StyledTableRow>
                    </StyledTableHead>
                    <TableBody>
                        {kartice && kartice.length > 0 ? (
                            kartice.map((kartica) => (
                                <StyledTableRow
                                    key={kartica.id}
                                    hover
                                    onClick={() => handleRowClick(kartica)}
                                    style={{ cursor: 'pointer' }}
                                >
                                    <StyledTableCell>{kartica.number}</StyledTableCell>
                                    <StyledTableCell>{kartica.type}</StyledTableCell>
                                    <StyledTableCell>{new Date(kartica.expirationDate).toLocaleDateString()}</StyledTableCell>
                                    <StyledTableCell>{kartica.status}</StyledTableCell>
                                </StyledTableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell colSpan={4} style={{ textAlign: 'center' }}>
                                    Trenutno nema kartica
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    );
}
