import React, { useEffect, useState } from "react";
import { BankRoutes, Kartica } from "../../utils/types";
import { makeGetRequest } from "../../utils/apiRequest";
import { Button, Card, List, ListItem, ListItemText } from "@mui/material";
import { getMe } from "../../utils/getMe";

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

    return (
        <div>
            {jeZaposleni && (
                <Button variant="contained" color="primary" href="/dodaj-karticu">
                    Dodaj Karticu
                </Button>
            )}
            <List>
                {kartice?.map((kartica, index) => (
                    <Card variant="outlined" key={index} style={{ margin: "10px" }}>
                        <ListItem button onClick={() => {
                            localStorage.setItem('selectedKartica', JSON.stringify(kartica));
                            window.location.replace("/kartica?id=" + kartica.id)
                            }}>
                            <ListItemText
                                primary={kartica.name}
                                secondary={`Broj: ${kartica.number} - Vrsta: ${kartica.type} - Datum isteka: ${new Date(
                                    kartica.expirationDate
                                ).toLocaleDateString()} - Status: ${kartica.status}`}
                            />
                        </ListItem>
                    </Card>
                ))}
            </List>
        </div>
    );
}
