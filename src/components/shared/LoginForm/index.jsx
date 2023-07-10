import React from 'react';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Form, Input } from 'antd';
import { useNavigate } from 'react-router-dom';
export const LoginForm = ({ onFinish, loading }) => {
	const naigate = useNavigate();
	return (
		<Form
			name="normal_login"
			className="login-form"
			initialValues={{}}
			onFinish={onFinish}
		>
			<Form.Item
				name="email"
				rules={[
					{
						required: true,
						message: 'Please input your email!',
					},
				]}
			>
				<Input
					prefix={<UserOutlined className="site-form-item-icon" />}
					type="email"
					placeholder="Email"
				/>
			</Form.Item>
			<Form.Item
				name="password"
				rules={[
					{
						required: true,
						message: 'Please input your password!',
					},
				]}
			>
				<Input
					prefix={<LockOutlined className="site-form-item-icon" />}
					type="password"
					placeholder="Password"
				/>
			</Form.Item>
			<Form.Item>
				<Button
					loading={loading}
					type="primary"
					htmlType="submit"
					className="login-form-button"
				>
					Log in
				</Button>
				Or <a onClick={() => naigate('/signup')}>SignUp now!</a>
			</Form.Item>
		</Form>
	);
};
