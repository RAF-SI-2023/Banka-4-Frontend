import React, { useContext, useEffect, useState } from "react";
import { BankRoutes, Kartica } from "../../utils/types";
import { makeGetRequest } from "../../utils/apiRequest";
import { Table, TableBody, TableCell, TableRow, AppBar, Tabs, Tab } from "@mui/material";
import { getMe } from "../../utils/getMe";
import { ScrollContainer, StyledHeadTableCell, StyledTableCell, StyledTableHead, StyledTableRow } from "utils/tableStyles";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { Context } from "App";

const StyledTabs = styled(Tabs)`
  background-color: #f2f2f2;
  & > * > * {
    display: flex!important;
    justify-content: space-between!important;
    margin: 6px!important;
  }

`
const ButtonTab = styled(Tab)`
  background-color: #718bb0!important;
  color: white!important;
  border-radius: 13px!important;
  &:hover{
    background-color: #39547a!important;
  }
`

const HeadingText = styled.div`
  font-size: 45px;
`
const HeadingAndButtonWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: bottom;
  padding: 0 10px; 
  max-width: 1200px; 
  margin-bottom: 86px; 
`

const PageWrapper = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  margin-top: 100px;
  gap: 0px;
`

export default function PregledKartica() {
    const navigate = useNavigate()
    const [kartice, setKartice] = useState<Kartica[]>([]);
    const [jeZaposleni, setJeZaposleni] = useState(false);
    const ctx = useContext(Context);

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
        // eslint-disable-next-line react-hooks/exhaustive-deps
        let currentUrl = new URL(window.location.href);
        let success = currentUrl.searchParams.get('success');

        if (success === '0') {
            ctx?.setErrors(['Our Error: Greška pri kreiranju kartice']);
        } if (success === '1') {
            ctx?.setErrors(['Our Success: Uspešno kreirana kartica']);
        }
    }, []);

    const handleRowClick = (kartica: Kartica) => {
        localStorage.setItem('selectedKartica', JSON.stringify(kartica));
        window.location.replace("/kartica?number=" + kartica.number);
    };

    return (
        <PageWrapper>
            <HeadingAndButtonWrapper>
                <HeadingText>Lista Kartica</HeadingText>
            </HeadingAndButtonWrapper>
            <ScrollContainer style={{ margin: '10px', maxWidth: 1200 }}>
                <AppBar position="static" >
                    <StyledTabs value={0}>
                        <Tab label="Lista Kartica" />
                        <ButtonTab
                            id="dodajKarticuDugme"
                            onClick={() => {
                                navigate("/dodaj-karticu");
                            }}
                            label="Dodaj Karticu"
                            style={{ display: jeZaposleni ? 'block' : 'none' }} // Ovde postavljamo da se dugme prikazuje samo ako je korisnik zaposleni
                        />
                    </StyledTabs>
                </AppBar>
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
                            kartice?.map((kartica) => (
                                <StyledTableRow
                                    key={kartica.id}
                                    hover
                                    onClick={() => handleRowClick(kartica)}
                                    style={{ cursor: 'pointer' }}
                                >
                                    <StyledTableCell>{kartica.number}</StyledTableCell>
                                    <StyledTableCell>{kartica.type}</StyledTableCell>
                                    <StyledTableCell>{new Date(kartica.expirationDate).toLocaleDateString()}</StyledTableCell>
                                    <StyledTableCell>{kartica.blocked ? 'blocked' : kartica.status}</StyledTableCell>
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
            </ScrollContainer>
        </PageWrapper>
    );
}
