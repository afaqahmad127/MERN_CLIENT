import { Button, Card, Col, Row, notification } from 'antd';
import { useAtom, useAtomValue } from 'jotai';
import React from 'react';
import { carState, categoryState, userState } from '../../states';
import { carService, categoryService } from '../../services';
import { Notification } from '../../components';
import { useNavigate } from 'react-router-dom';
export const Home = () => {
	const navigate = useNavigate();
	const [api, contextHolder] = notification.useNotification();
	const user = useAtomValue(userState);
	const [car, setCar] = useAtom(carState);
	const [category, setCategory] = useAtom(categoryState);
	const getData = async () => {
		Promise.all([await carService.read(), await categoryService.read()])
			.then((res) => {
				setCar(res[0].data);
				setCategory(res[1].data);
			})
			.catch((err) => {
				Notification.errorMessage(
					api,
					err.response.data?.data ?? 'Something went wrong!'
				);
			});
	};
	React.useEffect(() => {
		if (car.length === 0 || category.length === 0) {
			getData();
		}
	}, []);
	return (
		<>
			{contextHolder}
			<div
				className="pt-2"
				style={{ height: '100vh' }}
			>
				<Row
					className="container-fluid"
					style={{ backgroundColor: '#E6E6E6' }}
				>
					<Col span={24}>
						<Card
							extra={
								<Button
									onClick={() => {
										localStorage.clear();
										window.location.reload();
									}}
								>
									Logout
								</Button>
							}
							type="inner"
							title={`Welcome ${user?.name ?? ''}`}
						>
							<Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
								<Col>
									<Card
										hoverable
										type="inner"
										extra={
											<a onClick={() => navigate('/category')}>View more</a>
										}
										title="Categories "
									>
										Total Categories: {category.length}
									</Card>
								</Col>
								<Col>
									<Card
										hoverable
										type="inner"
										extra={<a onClick={() => navigate('/car')}>View more</a>}
										title="Car "
									>
										Total Car: {car.length}
									</Card>
								</Col>
							</Row>
						</Card>
					</Col>
				</Row>
			</div>
		</>
	);
};
