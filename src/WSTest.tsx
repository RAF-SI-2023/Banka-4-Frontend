// import { Button } from '@mui/material';
// import React, { useState, useEffect } from 'react';
// import useWebSocket from 'react-use-websocket';
// import SockJS from 'sockjs-client';
// import Stomp from '@stomp/stompjs';


// const stompClient = Stomp

// const onConnect = () => {
//     let email = userService.getUserEmail();
//     if(email != null){
//       stompClient.subscribe('/vacuum-fe/' + email, changeVacuums.bind(this));
//     }
//   }


// const connectToSocket = () => {
//     let jwt = localStorage.getItem("jwt");
//     const socket = new SockJS(`ws://${process.env.REACT_APP_BANKA_URL}/ws/topic/uplata-posiljaoca/444000000000000100}` + "?jwt=" + jwt);
//     const stompClient = Stomp.over(socket);
//     stompClient.connect({}, onConnect.bind(this));

//   }

// const WSTest: React.FC = () => {
//     const [uplataData, setUplataData] = useState(null);
//     const [prenosData, setPrenosData] = useState(null);
//     const racunPosiljaoca = '444000000000000100';
//     // const { sendMessage, lastMessage: lastUplataMessage } = useWebSocket(
//     //     `ws://http://api.stamenic.work:8082/ws/topic/uplata/${idUplate}`,
//     //     { shouldReconnect: () => true }
//     // );

//     const { sendMessage, lastMessage: lastUplataMessage } = useWebSocket(
//         `ws://${process.env.REACT_APP_BANKA_URL}/ws/topic/uplata-posiljaoca/${racunPosiljaoca}?jwt=${localStorage.getItem('si_jwt')}`,
//         { shouldReconnect: () => true }
//     );

//     // const { sendMessage: sendMessagePrenos, lastMessage: lastPrenosMessage } = useWebSocket(
//     //     `ws://http://api.stamenic.work:8082/ws/topic/prenos-sredstava/${idPrenosaSredstava}`,
//     //     { shouldReconnect: () => true }
//     // );

//     useEffect(() => {
//         if (lastUplataMessage) {
//             const data = JSON.parse(lastUplataMessage.data);
//             setUplataData(data);
//         }
//     }, [lastUplataMessage]);

//     // useEffect(() => {
//     //     if (lastPrenosMessage) {
//     //         const data = JSON.parse(lastPrenosMessage.data);
//     //         setPrenosData(data);
//     //     }
//     // }, [lastPrenosMessage]);
//     return (
//         <Button onClick={() => sendMessage('ads')}>SEND MESSAGE</Button>
//     )

// }
// export default WSTest;