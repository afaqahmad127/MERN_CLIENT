import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

export const UnAuthorizedWrapper = () => {
	const auth = localStorage.getItem('afaqAppToken');
	return auth ? <Navigate to="/" /> : <Outlet />;
};

export const AuthorizeWrapper = () => {
	const auth = localStorage.getItem('afaqAppToken');
	return auth ? <Outlet /> : <Navigate to="/login" />;
};
