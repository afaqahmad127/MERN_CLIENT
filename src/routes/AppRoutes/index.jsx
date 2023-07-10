import React from 'react';
import { Car, Category, Home, Login, SignUp } from '../../pages';

const allRoutes = [
	{
		key: 0,
		path: '/',
		element: Home,
		private: true,
	},
	{
		key: 2,
		path: '/login',
		element: Login,
		private: false,
	},
	{
		key: 3,
		path: '/car',
		element: Car,
		private: true,
	},
	{
		key: 4,
		path: '/category',
		element: Category,
		private: true,
	},
	{
		key: 5,
		path: '/signup',
		element: SignUp,
		private: false,
	},
];

function withNavigationWatcher(Component, path) {
	const WrappedComponent = function (props) {
		return <Component {...props} />;
	};
	return <WrappedComponent />;
}
const publicRoute = allRoutes.filter((route) => !route.private);
export const publicAppRoutes = publicRoute.map((route) => {
	return {
		...route,
		element: withNavigationWatcher(route.element, route.path),
	};
});
const privateRoute = allRoutes.filter((route) => route.private);
export const privateAppRoutes = privateRoute.map((route) => {
	return {
		...route,
		element: withNavigationWatcher(route.element, route.path),
	};
});
