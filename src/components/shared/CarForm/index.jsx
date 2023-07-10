import React from 'react';
import { Button, Form, Input } from 'antd';
import { GenericModal } from '../Modal';
import { MySelect } from '../MySelect';
import { categoryState } from '../../../states';
import { useAtomValue } from 'jotai';
export const CarForm = ({ onFinish, loading, open, setOpen, record }) => {
	const category = useAtomValue(categoryState);
	return (
		<GenericModal
			title={'Car'}
			open={open}
			setOpen={setOpen}
			record={record}
		>
			<Form
				// ref={record.current}
				name="carForm"
				className="login-form"
				initialValues={record.current}
				onFinish={onFinish}
			>
				<Form.Item
					label="Category"
					name="category"
					rules={[{ required: true, message: 'Please input your Category!' }]}
				>
					<MySelect
						placeholder={'Category'}
						options={category.map((item) => ({
							label: item?.name,
							value: item._id,
						}))}
						onChange={(value) => {
							record.current = {
								...record.current,
								category: { ...category.find((i) => i._id == value) },
							};
						}}
						value={record.current?.category ?? {}}
					/>
				</Form.Item>
				<Form.Item
					label="Model"
					name="model"
					rules={[{ required: true, message: 'Please input your Model!' }]}
				>
					<Input
						type="text"
						placeholder="Model"
					/>
				</Form.Item>
				<Form.Item
					label="Make"
					name="make"
					rules={[{ required: true, message: 'Please input your Make!' }]}
				>
					<Input
						type="text"
						placeholder="Make"
					/>
				</Form.Item>
				<Form.Item
					label="Reg#"
					name="registrationNo"
					rules={[{ required: true, message: 'Please input Registration No!' }]}
				>
					<Input
						type="text"
						placeholder="Registration No."
					/>
				</Form.Item>
				<Form.Item
					label="Color"
					name="color"
					rules={[{ required: true, message: 'Please input Color!' }]}
				>
					<Input
						type="text"
						placeholder="Color"
					/>
				</Form.Item>

				<Form.Item className="add-btn">
					<Button
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
