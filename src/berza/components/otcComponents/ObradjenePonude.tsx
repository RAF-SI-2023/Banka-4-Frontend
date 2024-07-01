import React, { useState, useEffect } from 'react';
import { Table, TableBody, TableCell, TableHead, TableRow, Paper, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField } from '@mui/material';
import { getMe } from 'utils/getMe';
import { makeGetRequest, makeApiRequest } from 'utils/apiRequest';
import { Employee, UserRoutes } from "utils/types";

interface Ponuda {
    id: number;
    sellerId: number;
    ticker: string;
    sellerApproval: boolean;
    banksApproval: boolean;
    buyerId: number;
    quantityToBuy: number;
    priceOffer: number;
    razlogOdbijanja: string;
    datumKreiranja: number;
    datumRealizacije: number;
    opis: string;
}

const ObradjenePonude: React.FC = () => {
    const [ponude, setPonude] = useState<Ponuda[]>([]);
    const [istorija, setIstorija] = useState<Ponuda[]>([]);
    const [open, setOpen] = useState<boolean>(false);
    const [reason, setReason] = useState<string>('');
    const [selectedPonuda, setSelectedPonuda] = useState<number | null>(null);
    const [userId, setId] = useState(0);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [opis, setOpis] = useState<string>("");
    const [openAccept, setOpenAccept] = useState<boolean>(false);

    useEffect(() => {
        const fetchPonude = async () => {
            const me = getMe();
            if (!me) {
                setError('Korisnik nije pronađen');
                setLoading(false);
                return;
            }

            let prim = 0;
            if (me.permission !== 0) {
                try {
                    const worker = await makeGetRequest(`${UserRoutes.worker_by_email}/${me.sub}`) as Employee;
                    setId(worker.firmaId);
                    prim = worker.firmaId;
                } catch (error) {
                    console.error('Greška prilikom učitavanja radnika:', error);
                    setError('Greška prilikom učitavanja radnika');
                    setLoading(false);
                    return;
                }
            } else {
                setId(me.id);
                prim = me.id;
            }

            try {
                const response = await makeGetRequest(`/otc/completed-otc-offers/${prim}`);
                setPonude(response);
            } catch (error) {
                console.error('Greška prilikom učitavanja ponuda:', error);
                setError('Greška prilikom učitavanja ponuda');
            } finally {
                setLoading(false);
            }
        };

        fetchPonude();
    }, []);

    if (loading) {
        return <p>Učitavanje ponuda...</p>;
    }

    if (error) {
        return <p>{error}</p>;
    }

    return (
        <div>
            <Paper>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Seller name</TableCell>
                            <TableCell>Ticker</TableCell>
                            <TableCell>Seller approval</TableCell>
                            <TableCell>Bank approval</TableCell>
                            <TableCell>Buyer name</TableCell>
                            <TableCell>Quantity to buy</TableCell>
                            <TableCell>Price offer</TableCell>
                            <TableCell>Creation date</TableCell>
                            <TableCell>Realisation date</TableCell>
                            <TableCell>Napomena</TableCell>
                            <TableCell>Razlog odbijanja</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {ponude.map((ponuda) => (
                            <TableRow key={ponuda.id}>
                                <TableCell>{ponuda.sellerId}</TableCell>
                                <TableCell>{ponuda.ticker}</TableCell>
                                <TableCell>{ponuda.sellerApproval ? "Prihvacen" : "Nije prihvacen"}</TableCell>
                                <TableCell>{ponuda.banksApproval ? "Prihvacen" : "Nije prihvacen"}</TableCell>
                                <TableCell>{ponuda.buyerId}</TableCell>
                                <TableCell>{ponuda.quantityToBuy}</TableCell>
                                <TableCell>{ponuda.priceOffer}</TableCell>
                                <TableCell>{new Date(ponuda.datumKreiranja).toLocaleTimeString("en-de")}</TableCell>
                                <TableCell>{ponuda.datumRealizacije ? new Date(ponuda.datumRealizacije).toLocaleTimeString("en-de") : ""}</TableCell>
                                <TableCell>{ponuda.opis ?? ""}</TableCell>
                                <TableCell>{ponuda.razlogOdbijanja ?? ""}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </Paper>
        </div>
    );
};

export default ObradjenePonude;
