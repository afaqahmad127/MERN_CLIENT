import React from 'react';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Form, Input } from 'antd';
import { useNavigate } from 'react-router-dom';
export const SignUpForm = ({ onFinish, loading }) => {
	const navigate = useNavigate();
	return (
		<>
			<Form
				name="normal_login"
				className="login-form"
				initialValues={{}}
				onFinish={onFinish}
			>
				<Form.Item
					name="name"
					rules={[
						{
							required: true,
							message: 'Please input your name!',
						},
						{
							min: 4,
							message: 'Name length must be at least 4!',
						},
					]}
				>
					<Input
						prefix={<UserOutlined className="site-form-item-icon" />}
						placeholder="Name"
					/>
				</Form.Item>
				<Form.Item
					name="email"
					rules={[
						{
							required: true,
							message: 'Please input your Email!',
						},
					]}
				>
					<Input
						prefix={<LockOutlined className="site-form-item-icon" />}
						type="email"
						placeholder="Email"
					/>
				</Form.Item>

				<Form.Item>
					<Button
						loading={loading}
						type="primary"
						htmlType="submit"
						className="login-form-button"
					>
						SignUp
					</Button>
					Or <a onClick={() => navigate('/login')}>Login now!</a>
				</Form.Item>
			</Form>
		</>
	);
};
