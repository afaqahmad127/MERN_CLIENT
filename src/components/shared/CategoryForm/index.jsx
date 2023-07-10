import React from 'react';
import { UserOutlined } from '@ant-design/icons';
import { Button, Form, Input } from 'antd';
import { GenericModal } from '../Modal';
export const CategoryForm = ({ onFinish, loading, open, setOpen, record }) => {
	return (
		<GenericModal
			title={'Category'}
			open={open}
			setOpen={setOpen}
			record={record}
		>
			<Form
				name="categoryForm"
				initialValues={record.current}
				onFinish={onFinish}
			>
				<Form.Item
					label="Name"
					name="name"
					rules={[
						{
							required: true,
							message: 'Please input name!',
						},
					]}
				>
					<Input
						prefix={<UserOutlined className="site-form-item-icon" />}
						type="text"
						placeholder="Name"
					/>
				</Form.Item>
				<Form.Item>
					<Button
						loading={loading}
						type="primary"
						htmlType="submit"
						className="login-form-button"
					>
						Submit
					</Button>
				</Form.Item>
			</Form>
		</GenericModal>
	);
};
