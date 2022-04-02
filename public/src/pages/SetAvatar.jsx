import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import loader from "../assets/loader.gif";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { setAvatarRoute } from "../utils/APIRoutes";

export default function SetAvatar() {
	const api = "https://api.com.multiavatar.com/45678945";
	const navigate = useNavigate();
	const [avatars, setAvatars] = useState([]);
	const [isLoading, setIsLoading] = useState(true);
	const [SelectedAvatar, setSelectedAvatar] = useState(undefined);

	return (
		<>
			<Container>
				<div className="title-container">
					<h1>Pick an avatar as your profile picture</h1>
				</div>
				<div className="avatars">{}</div>
			</Container>
			<ToastContainer />
		</>
	);
}
const Container = styled.div``;
