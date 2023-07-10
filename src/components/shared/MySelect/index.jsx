import React from 'react';
import { Select } from 'antd';
export const MySelect = ({ value, options, placeholder, onChange }) => (
	<Select
		showSearch
		placeholder={placeholder}
		optionFilterProp="children"
		filterOption={(input, option) =>
			String(option?.label ?? '')
				?.toLowerCase()
				.includes(input.toLowerCase())
		}
		value={value}
		options={options}
		onChange={onChange}
		allowClear
	/>
);
