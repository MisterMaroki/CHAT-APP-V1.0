import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Logo from "../assets/logo.svg";

export default function Contacts({ contacts, currentUser }) {
	const [currentUserName, setcurrentUserName] = useState(undefined);
	const [currentUserImage, setcurrentUserImage] = useState(undefined);
	const [currentSelected, setCurrentSelected] = useState(undefined);

	useEffect(() => {
		if (currentUser) {
			setCurrentUserImage(currentUser.avatarImage);
			setCurrentUserName(currentUser.username);
		}
	}, [currentUser]);

	return <div>Contacts</div>;
}
