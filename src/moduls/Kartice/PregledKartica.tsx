import React, { useEffect, useState } from "react";
import { Kartica } from "../../utils/types";
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
        makeGetRequest("/cards")
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
                        <ListItem button onClick={() => window.location.replace("/kartica?id=" + kartica.id)}>
                            <ListItemText
                                primary={kartica.naziv}
                                secondary={`Broj: ${kartica.broj} - Vrsta: ${kartica.vrsta} - Datum isteka: ${new Date(
                                    kartica.datum_isteka
                                ).toLocaleDateString()} - Status: ${kartica.status}`}
                            />
                        </ListItem>
                    </Card>
                ))}
            </List>
        </div>
    );
}
