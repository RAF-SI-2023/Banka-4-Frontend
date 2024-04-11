import { useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

import Swal from 'sweetalert2';
import { getJWT, makeApiRequest, makeGetRequest } from 'utils/apiRequest';
import { BankRoutes, UserRoutes } from 'utils/types';
import { getMe } from 'utils/getMe';
import { Paper, Table, TableBody, TableCell, TableContainer, TableRow } from '@mui/material';
import { StyledHeadTableCell, StyledTableCell, StyledTableHead, StyledTableRow } from 'utils/tableStyles';

const MOCK_PRIMAOCI = [
    {
        "id": 4,
        "idKorisnika": 2,
        "brojRacunaPosiljaoca": null,
        "nazivPrimaoca": "Kita",
        "brojRacunaPrimaoca": 444000000910000060,
        "broj": 123,
        "sifraPlacanja": "SKOEr"
    }
];

interface PrimaociPlacanjaProps {
    setSelectedOption: (option: string) => void;
    setDefaultProps: (props: { [key: string]: any }) => void;
}

export const PrimaociPlacanja: React.FC<PrimaociPlacanjaProps> = ({ setSelectedOption, setDefaultProps }) => {
    const [primaoci, setPrimaoci] = useState(MOCK_PRIMAOCI);
    const [racuni, setRacuni] = useState([{
        "id": 2,
        "brojRacuna": "444000000910000031",
        "vlasnik": 2,
        "stanje": 10700,
        "raspolozivoStanje": 10660,
        "zaposleni": 22222,
        "datumKreiranja": 1711985538,
        "datumIsteka": 1869665538,
        "currency": "RSD",
        "aktivan": true
    }])

    useEffect(() => {
        const func = async () => {
            try {
                const primaoci2 = await makeGetRequest(`${UserRoutes.favorite_users}/` + getMe()?.id);
                setPrimaoci(primaoci2);

                const racuni2 = await makeGetRequest(`${BankRoutes.account_find_user_account}/${getMe()?.id}`);
                setRacuni(racuni2);

                //await makeApiRequest(UserRoutes.favorite_users/id, "POST")
                // const result = await fetch(`${url}/omiljeni-korisnici/`, { method: "POST", headers: { "Authorization": "", "Content-Type": "application/json" } });
                // setPrimaoci();
            } catch (e) {

            }
        }
        func();
    }, [])

    const handleAdd = () => {
        // Prepare select options from racuni array
        const racuniOptions = racuni?.map(racun => `<option value="${racun.brojRacuna}">${racun.brojRacuna}</option>`).join('');

        Swal.fire({
            title: 'Dodaj primaoca',
            html: `
                <label for="brojRacunaPosiljaoca">Racun: </label><select id="brojRacunaPosiljaoca" class="swal2-input">${racuniOptions}</select>
                <input type="text" id="nazivPrimaoca" class="swal2-input" placeholder="Naziv">
                <input type="text" id="brojRacunaPrimaoca" class="swal2-input" placeholder="Broj racuna">
                <input type="text" id="broj" class="swal2-input" placeholder="Poziv na broj">
                <input type="text" id="sifraPlacanja" class="swal2-input" placeholder="Sifra placanja">`, // Adding the select element here
            focusConfirm: false,
            preConfirm: () => {
                const nazivPrimaoca = (document.getElementById('nazivPrimaoca') as HTMLInputElement).value;
                const brojRacunaPrimaoca = (document.getElementById('brojRacunaPrimaoca') as HTMLInputElement).value;
                const broj = (document.getElementById('broj') as HTMLInputElement).value;
                const sifraPlacanja = (document.getElementById('sifraPlacanja') as HTMLInputElement).value;
                const brojRacunaPosiljaoca = (document.getElementById('brojRacunaPosiljaoca') as HTMLSelectElement).value;

                // Regular expression for validation
                const isValidbrojRacunaPrimaoca = /^\d{18}$/.test(brojRacunaPrimaoca);

                if (!nazivPrimaoca || !brojRacunaPrimaoca || !broj || !sifraPlacanja || !isValidbrojRacunaPrimaoca) {
                    Swal.showValidationMessage(`Broj racuna mora da ima 18 cifara.`);
                    return false;
                }
                return { nazivPrimaoca, brojRacunaPrimaoca, broj, sifraPlacanja, brojRacunaPosiljaoca };
            }
        }).then(async (result) => {
            if (result.value) {
                try {
                    //Dodavanje primaoca
                    const apiResult = await makeApiRequest(UserRoutes.favorite_users, "POST", {
                        id: undefined,
                        idKorisnika: getMe()?.id,
                        brojRacunaPosiljaoca: result.value.brojRacunaPosiljaoca, // Umesto svrhe placanja staviti da biram sa kog svojeg racuna saljem
                        nazivPrimaoca: result.value.nazivPrimaoca,
                        brojRacunaPrimaoca: result.value.brojRacunaPrimaoca,
                        broj: result.value.broj,
                        sifraPlacanja: result.value.sifraPlacanja
                    })
                    setPrimaoci(old => [...old, { ...result.value, id: apiResult.id, idKorisnika: getMe()?.id }]);
                } catch (e) {

                }
            }
        });
    };

    const handleEdit = (id: string) => {
        let recipientDetails = primaoci?.map(e => ({
            id: e.id.toString(),
            "idKorisnika": e.idKorisnika.toString(),
            "brojRacunaPosiljaoca": (e.brojRacunaPosiljaoca || "").toString(),
            "nazivPrimaoca": e.nazivPrimaoca.toString(),
            "brojRacunaPrimaoca": e.brojRacunaPrimaoca.toString(),
            "broj": e.broj.toString(),
            "sifraPlacanja": e.sifraPlacanja.toString()
        })).find(rec => rec.id == id); // Find the recipient by ID


        // Provide a fallback if recipientDetails is undefined
        recipientDetails = recipientDetails || {
            "id": "",
            "idKorisnika": "",
            "brojRacunaPosiljaoca": "",
            "nazivPrimaoca": "",
            "brojRacunaPrimaoca": "",
            "broj": "",
            "sifraPlacanja": ""
        };


        // Prepare select options from racuni array
        const racuniOptions = racuni?.map(racun => `<option value="${racun.brojRacuna}"${recipientDetails?.brojRacunaPosiljaoca === racun.brojRacuna ? ' selected' : ''}>${racun.brojRacuna}</option>`).join('');

        Swal.fire({
            title: `Edit recipient with ID: ${id}`,
            html: `
                <label for="brojRacunaPosiljaoca">Racun: </label><select id="brojRacunaPosiljaoca" class="swal2-input">${racuniOptions}</select>
                <input type="text" id="nazivPrimaoca" class="swal2-input" value="${recipientDetails.nazivPrimaoca}" placeholder="Naziv">
                <input type="text" id="brojRacunaPrimaoca" class="swal2-input" value="${recipientDetails.brojRacunaPrimaoca}" placeholder="Broj racuna">
                <input type="text" id="broj" class="swal2-input" value="${recipientDetails.broj}" placeholder="Poziv na broj">
                <input type="text" id="sifraPlacanja" class="swal2-input" value="${recipientDetails.sifraPlacanja}" placeholder="Sifra placanja">`, // Adding the select element here
            focusConfirm: false,
            preConfirm: () => {
                const nazivPrimaoca = (document.getElementById('nazivPrimaoca') as HTMLInputElement).value;
                const brojRacunaPrimaoca = (document.getElementById('brojRacunaPrimaoca') as HTMLInputElement).value;
                const broj = (document.getElementById('broj') as HTMLInputElement).value;
                const sifraPlacanja = (document.getElementById('sifraPlacanja') as HTMLInputElement).value;
                const brojRacunaPosiljaoca = (document.getElementById('brojRacunaPosiljaoca') as HTMLSelectElement).value;

                if (!nazivPrimaoca || !brojRacunaPrimaoca || !broj || !sifraPlacanja) {
                    Swal.showValidationMessage(`Please fill in all fields.`);
                    return false;
                }
                return { nazivPrimaoca, brojRacunaPrimaoca, broj, sifraPlacanja, brojRacunaPosiljaoca }; // Include the new attribute in the return statement
            }
        }).then(async (result:any) => {
            if (result.value) {
                try {
                    //Dodavanje primaoca
                    const apiResult = await makeApiRequest(UserRoutes.favorite_users, "POST", {
                        id,
                        idKorisnika: getMe()?.id,
                        brojRacunaPosiljaoca: "444000000910000033", // Umesto svrhe placanja staviti da biram sa kog svojeg racuna saljem
                        nazivPrimaoca: result.value.nazivPrimaoca,
                        brojRacunaPrimaoca: result.value.brojRacunaPrimaoca,
                        broj: result.value.broj,
                        sifraPlacanja: result.value.sifraPlacanja
                    })
                    setPrimaoci(old => old?.map(prim => (prim.id.toString() === id) ? { ...prim, ...result.value } : prim));
                } catch (e) {

                }
            }
        });
    };


    const handleDelete = async (id: string) => {
        try {
            //Brisanje
            const apiResult = await makeApiRequest(`${UserRoutes.favorite_users}/${id}`, "DELETE", {}, false, true)
            if (apiResult !== null)
                setPrimaoci(primaoci.filter(prim => prim.id.toString() !== id));
        } catch (e) {

        }
    };

    return (
        <Box>
            <Button variant="contained" onClick={handleAdd} sx={{ mb: 2 }}>
                Dodaj primaoca
            </Button>
            <TableContainer component={Paper} style={{ margin: '10px' }}>
                <Table aria-label="simple table">
                    <StyledTableHead>
                        <StyledTableRow>
                            <StyledHeadTableCell>Naziv Primaoca</StyledHeadTableCell>
                            <StyledHeadTableCell>Račun Primaoca</StyledHeadTableCell>
                            <StyledHeadTableCell>Poziv na broj</StyledHeadTableCell>
                            <StyledHeadTableCell>Šifra Plaćanja</StyledHeadTableCell>
                            <StyledHeadTableCell>Akcije</StyledHeadTableCell>
                        </StyledTableRow>
                    </StyledTableHead>
                    <TableBody>
                        {primaoci.length > 0 ? (
                            primaoci?.map((recipient) => (
                                <StyledTableRow style={{ cursor: "pointer" }} onClick={(e) => {
                                    setSelectedOption("novoPlacanje");
                                    setDefaultProps([recipient]?.map(e => {
                                        let selectedRacun = 0;
                                        for (selectedRacun = 0; selectedRacun < racuni.length; selectedRacun++)
                                            if (racuni[selectedRacun].brojRacuna == recipient.brojRacunaPosiljaoca)
                                                break;

                                        return {
                                            selectedRacun, nazivPrimaoca: recipient.nazivPrimaoca, racunPrimaoca: recipient.brojRacunaPrimaoca, pozivNaBroj: recipient.broj, sifraPlacanja: recipient.sifraPlacanja
                                        };
                                    })[0]);
                                }} key={recipient.id}>
                                    <StyledTableCell component="th" scope="row">
                                        {recipient.nazivPrimaoca}
                                    </StyledTableCell>
                                    <StyledTableCell>{recipient.brojRacunaPrimaoca}</StyledTableCell>
                                    <StyledTableCell>{recipient.broj}</StyledTableCell>
                                    <StyledTableCell>{recipient.sifraPlacanja}</StyledTableCell>
                                    <StyledTableCell>
                                        <IconButton edge="end" aria-label="edit" onClick={(e) => {
                                            e.stopPropagation()
                                            handleEdit(recipient.id.toString())
                                        }}>
                                            <EditIcon />
                                        </IconButton>
                                        <IconButton edge="end" aria-label="delete" onClick={(e) => {
                                            e.stopPropagation()
                                            handleDelete(recipient.id.toString())
                                        }}>
                                            <DeleteIcon />
                                        </IconButton>
                                    </StyledTableCell>
                                </StyledTableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell style={{ textAlign: 'center' }} colSpan={5}>
                                    Nema omiljenih korisnika
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </TableContainer>
        </Box>
    );
};
