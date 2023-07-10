import React from 'react';
import { Notification, SignUpForm } from '../../components';
import { Card, Col, Row, notification } from 'antd';
import { authService } from '../../services';
import { useNavigate } from 'react-router-dom';
export const SignUp = () => {
	const navigate = useNavigate();
	const [loading, setLoading] = React.useState(false);
	const [api, contextHolder] = notification.useNotification();
	const onFinish = (values) => {
		authService
			.signUp(values)
			.then((res) => {
				Notification.successMessage(api, 'You have successfully SignUp!');
				setLoading(false);
				navigate('/login');
			})
			.catch((e) => {
				setLoading(false);
				Notification.errorMessage(
					api,
					e.response.data?.data ?? 'Something went wrong!'
				);
			});
	};
	return (
		<>
			{contextHolder}
			<div
				id="login"
				style={{ height: '100vh', backgroundColor: '', display: 'flex' }}
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
							title="SignUp"
						>
							<SignUpForm
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
