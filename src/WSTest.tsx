import { Button } from '@mui/material';
import React, { useState, useEffect } from 'react';
import useWebSocket from 'react-use-websocket';

const WSTest: React.FC = () => {
    const [uplataData, setUplataData] = useState(null);
    const [prenosData, setPrenosData] = useState(null);
    const idUplate = 1;
    const idPrenosaSredstava = 1;
    const { sendMessage, lastMessage: lastUplataMessage } = useWebSocket(
        `ws://http://api.stamenic.work:8082/ws/topic/uplata/${idUplate}`,
        { shouldReconnect: () => true }
    );

    const { sendMessage: sendMessagePrenos, lastMessage: lastPrenosMessage } = useWebSocket(
        `ws://http://api.stamenic.work:8082/ws/topic/prenos-sredstava/${idPrenosaSredstava}`,
        { shouldReconnect: () => true }
    );

    useEffect(() => {
        if (lastUplataMessage) {
            const data = JSON.parse(lastUplataMessage.data);
            setUplataData(data);
        }
    }, [lastUplataMessage]);

    useEffect(() => {
        if (lastPrenosMessage) {
            const data = JSON.parse(lastPrenosMessage.data);
            setPrenosData(data);
        }
    }, [lastPrenosMessage]);
    return (
        <Button onClick={() => sendMessage}>SEND MESSAGE</Button>
    )

}
export default WSTest;