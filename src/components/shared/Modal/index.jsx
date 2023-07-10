import React from 'react';
import { Modal } from 'antd';
export const GenericModal = ({ title, children, open, setOpen, record }) => {
	const handleCancel = () => {
		setOpen(false);
		record.current = {};
	};
	return (
		<>
			<Modal
				destroyOnClose={true}
				title={title}
				open={open}
				onCancel={handleCancel}
				footer={[]}
			>
				{children}
			</Modal>
		</>
	);
};
