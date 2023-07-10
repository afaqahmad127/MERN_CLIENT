import React from 'react';
import { LoginForm, Notification } from '../../components';
import { Card, Col, Row, notification } from 'antd';
import { authService } from '../../services';
import { useAtom } from 'jotai';
import { userState } from '../../states';
export const Login = () => {
	const [, setUser] = useAtom(userState);
	const [loading, setLoading] = React.useState(false);
	const [api, contextHolder] = notification.useNotification();
	const onFinish = (values) => {
		setLoading(true);
		authService
			.login(values)
			.then((res) => {
				Notification.successMessage(api, 'You have successfully logged in!');
				setUser(res.data.user);
				setLoading(false);
				window.location.href = '/';
			})
			.catch((err) => {
				setLoading(false);
				console.log(err);
				Notification.errorMessage(
					api,
					err.response.data?.data ?? 'Something went wrong!'
				);
			});
	};
	return (
		<>
			{contextHolder}
			<div
				id="login"
				style={{ height: '100vh', display: 'flex' }}
			>
				<Row
					className="w-100 d-flex justify-content-center align-items-center"
					style={{ backgroundColor: '#E6E6E6' }}
				>
					<Col>
						<Card
							type="inner"
							hoverable
							bordered={true}
							title="Login"
						>
							<LoginForm
								onFinish={onFinish}
								loading={loading}
							/>
						</Card>
					</Col>
				</Row>
			</div>
		</>
	);
};
