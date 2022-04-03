import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
<<<<<<< HEAD
import { io } from "socket.io-client";
import styled from "styled-components";
import { allUsersRoute, host } from "../utils/APIRoutes";
import ChatContainer from "../components/ChatContainer";
import Contacts from "../components/Contacts";
import Welcome from "../components/Welcome";

export default function Chat() {
=======
import { allUsersRoute } from "../utils/APIRoutes";
import Contacts from "../components/Contacts";
function Chat() {
>>>>>>> f24d7a65a14c7427ea901bf6263f22e00faba060
	const navigate = useNavigate();
	const socket = useRef();
	const [contacts, setContacts] = useState([]);
	const [currentChat, setCurrentChat] = useState(undefined);
	const [currentUser, setCurrentUser] = useState(undefined);
	useEffect(() => {
		async function isLoggedIn() {
			if (!localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY)) {
				navigate("/login");
			} else {
				setCurrentUser(
					await JSON.parse(
						localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY)
					)
				);
			}
		}
		isLoggedIn();
	}, []);
	useEffect(() => {
		if (currentUser) {
			socket.current = io(host);
			socket.current.emit("add-user", currentUser._id);
		}
	}, [currentUser]);

	useEffect(() => {
		async function isTher() {
			if (currentUser) {
				if (currentUser.isAvatarImageSet) {
					const data = await axios.get(`${allUsersRoute}/${currentUser._id}`);
					setContacts(data.data);
				} else {
					navigate("/setAvatar");
				}
			}
		}
		isTher();
	}, [currentUser]);
	const handleChatChange = (chat) => {
		setCurrentChat(chat);
	};
	return (
<<<<<<< HEAD
		<>
			<Container>
				<div className="container">
					<Contacts contacts={contacts} changeChat={handleChatChange} />
					{currentChat === undefined ? (
						<Welcome />
					) : (
						<ChatContainer currentChat={currentChat} socket={socket} />
					)}
				</div>
			</Container>
		</>
=======
		<Container>
			<div className="container">
				<Contacts contacts={contacts} currentUser={currentUser} />
			</div>
		</Container>
>>>>>>> f24d7a65a14c7427ea901bf6263f22e00faba060
	);
}

const Container = styled.div`
	height: 100vh;
	width: 100vw;
	display: flex;
	flex-direction: column;
	justify-content: center;
	gap: 1rem;
	align-items: center;
	background-color: #131324;
	.container {
		height: 85vh;
		width: 85vw;
		background-color: #00000076;
		display: grid;
		grid-template-columns: 25% 75%;
		@media screen and (min-width: 720px) and (max-width: 1080px) {
			grid-template-columns: 35% 65%;
		}
	}
`;
