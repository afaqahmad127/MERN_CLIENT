import {
	Button,
	Card,
	Col,
	Popconfirm,
	Row,
	Space,
	Table,
	Tag,
	notification,
} from 'antd';
import { useAtom } from 'jotai';
import React from 'react';
import { carState, categoryState } from '../../states';
import { CarForm, CategoryForm, Notification } from '../../components';
import { useNavigate } from 'react-router-dom';
import {
	EditOutlined,
	DeleteOutlined,
	QuestionCircleOutlined,
} from '@ant-design/icons';
import { carService, categoryService } from '../../services';
export const Car = () => {
	const navigate = useNavigate();
	const [open, setOpen] = React.useState(false);
	const [api, contextHolder] = notification.useNotification();
	const [category, setCategory] = useAtom(categoryState);
	const [car, setCar] = useAtom(carState);
	const [loading, setLoading] = React.useState(false);
	const [edit, setEdit] = React.useState(false);
	const selectedItem = React.useRef({});
	const selectedItemId = React.useRef({});
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
		getData();
	}, []);
	// data table columns
	const columns = [
		{
			title: 'Registration#',
			dataIndex: 'registrationNo',
			key: 'registrationNo',
			sorter: (a, b) => a.registrationNo - b.registrationNo,
		},
		{
			title: 'Color',
			dataIndex: 'color',
			key: 'color',
			sorter: (a, b) => a.color.length - b.color.length,
		},
		{
			title: 'Model',
			dataIndex: 'model',
			key: 'model',
			sorter: (a, b) => a.model.length - b.model.length,
		},
		{
			title: 'Make',
			dataIndex: 'make',
			key: 'make',
			sorter: (a, b) => a.make.length - b.make.length,
		},
		{
			title: 'Category',
			key: 'category',
			dataIndex: 'category',
			render: (category) => {
				let color = 'geekblue';
				if (category?.name === 'Sedan') {
					color = 'green';
				} else if (category?.name === 'SUV') {
					color = 'volcano';
				} else {
					color = 'orange';
				}
				return (
					<Tag
						color={color}
						key={category?.name}
					>
						{category?.name.toUpperCase() || 'N/A'}
					</Tag>
				);
			},
		},
		{
			title: 'Action',
			key: 'action',
			render: (_, record) => (
				<Space size="middle">
					<Button onClick={() => onEditButtonClick(record)}>
						<EditOutlined />
					</Button>
					<Popconfirm
						onConfirm={() => onDelete(record?._id)}
						title="Delete the task"
						description="Are you sure to delete this car?"
						icon={
							<QuestionCircleOutlined
								style={{
									color: 'red',
								}}
							/>
						}
					>
						<Button danger>
							<DeleteOutlined />
						</Button>
					</Popconfirm>
				</Space>
			),
		},
	];
	const onEditButtonClick = (record) => {
		selectedItem.current = {
			...record,
			category: record.category
				? { value: record.category?._id, label: record.category.name }
				: {},
		};
		selectedItemId.current = record._id;
		setEdit(true);
		setOpen(true);
	};
	const onDelete = (id) => {
		setLoading(true);
		carService
			.delete(id)
			.then((res) => {
				setCar([...car.filter((i) => i._id !== id)]);
				setLoading(false);
			})
			.catch((err) => {
				Notification.errorMessage(
					api,
					err.response.data?.data ?? 'Something went wrong!'
				);
				setLoading(false);
			});
	};
	const onFinish = (values) => {
		const body = {
			...values,
			category:
				typeof values.category !== 'string'
					? values.category.value
					: values.category,
		};
		if (edit) {
			carService
				.update({
					id: selectedItemId.current,
					body,
				})
				.then((res) => {
					const newCar = car.map((i) => {
						if (i._id === selectedItemId.current) {
							i = {
								...values,
								_id: selectedItemId.current,
								category: {
									...category.find((i) => i._id === body.category),
								},
							};
						}
						return i;
					});
					console.log(newCar);
					setCar(newCar);
					selectedItem.current = {};
					setOpen(false);
				})
				.catch((err) => {
					Notification.errorMessage(
						api,
						err.response.data?.data ?? 'Something went wrong!'
					);
				});
		} else {
			carService
				.create(values)
				.then((res) => {
					setCar([
						...car,
						{
							...res.data,
							category: {
								...category.find((i) => i._id === res.data.category),
							},
						},
					]);
					selectedItem.current = {};
					setOpen(false);
				})
				.catch((err) => {
					Notification.errorMessage(
						api,
						err.response.data?.data ?? 'Something went wrong!'
					);
				});
		}
	};
	return (
		<>
			{contextHolder}
			<div
				className=" pt-2"
				style={{ height: '100vh' }}
			>
				<Row
					className="container-fluid"
					style={{ backgroundColor: '#E6E6E6' }}
				>
					<Col span={24}>
						<Card
							extra={<a onClick={() => navigate(-1)}>Back</a>}
							type="inner"
							title={'Car'}
							style={{ minHeight: '90vh' }}
						>
							<Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
								<Col
									span={24}
									className="min-h-200px"
								>
									<Card
										hoverable
										type="inner"
										extra={
											<Button
												onClick={() => {
													setEdit(false);
													setOpen(true);
												}}
											>
												Add
											</Button>
										}
										title="Categories"
										style={{ minHeight: '350px' }}
									>
										<Table
											loading={loading}
											columns={columns}
											dataSource={car}
										/>
									</Card>
								</Col>
							</Row>
						</Card>
					</Col>
				</Row>
			</div>
			{open && (
				<CarForm
					open={open}
					setOpen={setOpen}
					loading={loading}
					onFinish={onFinish}
					record={selectedItem}
				/>
			)}
		</>
	);
};
