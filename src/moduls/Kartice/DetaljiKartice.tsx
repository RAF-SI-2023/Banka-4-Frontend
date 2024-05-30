/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState, useEffect } from 'react';
import { Button, Card, Typography } from '@mui/material';
import Swal from 'sweetalert2'; import { useSearchParams } from 'react-router-dom';
import { BankRoutes, EmployeePermissionsV2, Kartica, TransakcijaKarticePrikaz } from '../../utils/types';
import { makeApiRequest } from '../../utils/apiRequest';
import ListaTransakcija from './ListaTransakcija';
import { getMe } from '../../utils/getMe';
import { hasPermission } from 'utils/permissions';

const updateKarticaStatus = async (number: string, status: string): Promise<boolean> => {
  const result = await makeApiRequest(`${BankRoutes.cards}/${status}/${number}`, "GET", undefined, undefined, true);
  return result ? true : false
};

export default function DetaljiKartice() {
  const [kartica, setKartica] = useState<Kartica | null>(null);
  const [showDetails, setShowDetails] = useState(false);
  const [transakcije, setTransakcije] = useState<TransakcijaKarticePrikaz[]>([])

  // Ovo će biti ID kartice dobijen iz URL-a
  let [searchParams, setSearchParams] = useSearchParams();
  const number = searchParams.get("number");
  const me = getMe();


  useEffect(() => {
    if (number) {
      const data = localStorage.getItem('selectedKartica');
      if (data) {
        const kartica = JSON.parse(data)
        setKartica(kartica)
      }

      //ne postoje jos uvek
      /*makeGetRequest("/cards/transactions/" + id)
        .then((result) => {
          if (!result)
            return alert("Greška pri preuzimanju transakcija");

          setTransakcije(result);
        })
        .catch((e) => {
          alert("Greška pri preuzimanju transakcija");
        });*/
    }
  }, [number]);

  const handleStatusChange = async (newStatus: string) => {
    if (kartica && await updateKarticaStatus(kartica.number, newStatus)) {
      Swal.fire('Uspeh!', `Kartica je ${newStatus}.`, 'success');
      if (newStatus !== 'blokirana' && newStatus !== 'aktivna' && newStatus !== 'deaktivirana')
        return;
      setKartica({ ...kartica, status: newStatus });
    } else {
      Swal.fire('Greška!', 'Promena statusa nije uspela.', 'error');
    }
  };

  if (!kartica) return <div>Učitavanje...</div>;

  return (<div style={{ width: "70%", margin: "auto" }}>
    <Card style={{ padding: '20px', maxWidth: '600px', margin: 'auto', marginBottom: 20, marginTop: 20 }}>
      <Typography variant="h5">{kartica.name}</Typography>
      <Typography>Broj kartice: {showDetails ? kartica.number : `${kartica.number.substring(0, 4)} xxxx xxxx ${kartica.number.substring(12)}`}</Typography>
      <Typography>Vrsta kartice: {kartica.type}</Typography>
      <Typography>Datum kreiranja: {new Date(kartica.creationDate).toLocaleDateString()}</Typography>
      <Typography>Datum isteka: {new Date(kartica.expirationDate).toLocaleDateString()}</Typography>
      <Typography>Broj računa: {kartica.bankAccountNumber}</Typography>
      <Typography>CVV: {showDetails ? kartica.cvv : 'xxx'}</Typography>
      <Typography>Limit: {kartica.cardLimit}</Typography>
      <Typography>Status: {kartica.status}</Typography>
      <Button onClick={() => setShowDetails(!showDetails)}>{showDetails ? "Sakrij informacije" : "Prikaži informacije"}</Button>

      {me ? (hasPermission(me.permission, [EmployeePermissionsV2.activate_cards]) ? <Button onClick={() => handleStatusChange('aktivna')}>Aktiviraj</Button> : null) : null}
      {me ? (hasPermission(me.permission, [EmployeePermissionsV2.deactivate_cards]) ? <Button onClick={() => handleStatusChange('deaktivirana')}>Deaktiviraj</Button> : null) : null}
      {me ? (hasPermission(me.permission, [EmployeePermissionsV2.block_cards]) || !me.permission ? <Button onClick={() => handleStatusChange('blokirana')}>Blokiraj</Button> : null) : null}
    </Card>
    <ListaTransakcija transakcije={transakcije}></ListaTransakcija>
  </div>
  );
}
