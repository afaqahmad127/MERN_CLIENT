import React from 'react';
import {
	BrowserRouter as Router,
	Route,
	Routes,
	Navigate,
} from 'react-router-dom';
import {
	AuthorizeWrapper,
	UnAuthorizedWrapper,
	publicAppRoutes,
	privateAppRoutes,
} from './routes';
import { useAtom } from 'jotai';
import { userState } from './states';

function App() {
	const [, setUser] = useAtom(userState);
	let token = localStorage.getItem('afaqAppToken');
	React.useEffect(() => {
		if (token) {
			setUser(JSON.parse(localStorage.getItem('user')));
		}
	}, []);

	function renderRoutes() {
		if (token) {
			return (
				// <MainLayout>
				<Routes>
					<Route
						path="*"
						element={<Navigate to="/" />}
					/>

					{privateAppRoutes.map(({ path, element, key }) => (
						<Route
							key={key}
							exact
							path={path}
							element={<AuthorizeWrapper />}
						>
							<Route
								key={key + 1}
								exact
								path={path}
								element={element}
							/>
						</Route>
					))}
				</Routes>
				// </MainLayout>
			);
		} else {
			return (
				// <MainLayout>
				<Routes>
					<Route
						path="*"
						element={<Navigate to="/login" />}
					/>

					{publicAppRoutes.map(({ path, element, key }) => (
						<Route
							key={key}
							exact
							path={path}
							element={<UnAuthorizedWrapper />}
						>
							<Route
								key={key + 1}
								exact
								path={path}
								element={element}
							/>
						</Route>
					))}
				</Routes>
				// </MainLayout>
			);
		}
	}
	return <Router>{renderRoutes()}</Router>;
}

export default App;
