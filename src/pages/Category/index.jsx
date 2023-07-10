import {
	Button,
	Card,
	Col,
	Popconfirm,
	Row,
	Space,
	Table,
	notification,
} from 'antd';
import { useAtom } from 'jotai';
import React from 'react';
import { categoryState } from '../../states';
import { CategoryForm, Notification } from '../../components';
import { useNavigate } from 'react-router-dom';
import {
	EditOutlined,
	DeleteOutlined,
	QuestionCircleOutlined,
} from '@ant-design/icons';
import { categoryService } from '../../services';
export const Category = () => {
	const navigate = useNavigate();
	const [open, setOpen] = React.useState(false);
	const [api, contextHolder] = notification.useNotification();
	const [category, setCategory] = useAtom(categoryState);
	const [loading, setLoading] = React.useState(false);
	const selectedItem = React.useRef({});
	const selectedItemId = React.useRef({});
	React.useEffect(() => {
		setLoading(true);
		categoryService
			.read()
			.then((res) => {
				setCategory(res.data);
				setLoading(false);
			})
			.catch((err) => {
				Notification.errorMessage(
					api,
					err.response.data?.data ?? 'Something went wrong!'
				);
				setLoading(false);
			});
	}, []);
	// data table columns
	const columns = [
		{
			title: 'Name',
			dataIndex: 'name',
			key: 'name',
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
						description="Are you sure to delete this category?"
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
		selectedItem.current = record;
		selectedItemId.current = record._id;
		setOpen(true);
	};
	const onDelete = (id) => {
		setLoading(true);
		categoryService
			.delete(id)
			.then((res) => {
				setCategory([...category.filter((i) => i._id !== id)]);
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
		if (Object.keys(selectedItem.current).length > 0) {
			categoryService
				.update({
					id: selectedItemId.current,
					name: values.name,
				})
				.then((res) => {
					const newCategory = category.map((i) => {
						if (i._id === selectedItemId.current) {
							i.name = values.name;
						}
						return i;
					});

					setCategory(newCategory);
					selectedItem.current = {};
				})
				.catch((err) => {
					Notification.errorMessage(
						api,
						err.response.data?.data ?? 'Something went wrong!'
					);
				});
		} else {
			categoryService
				.create(values)
				.then((res) => {
					setCategory([...category, { ...res.data }]);
					selectedItem.current = {};
				})
				.catch((err) => {
					Notification.errorMessage(
						api,
						err.response.data?.data ?? 'Something went wrong!'
					);
				});
		}
		setOpen(false);
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
							title={'Category'}
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
										extra={<Button onClick={() => setOpen(true)}>Add</Button>}
										title="Categories"
										style={{ minHeight: '350px' }}
									>
										<Table
											loading={loading}
											columns={columns}
											dataSource={category}
										/>
									</Card>
								</Col>
							</Row>
						</Card>
					</Col>
				</Row>
			</div>
			{open && (
				<CategoryForm
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
