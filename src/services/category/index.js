import { MyAxios } from '../axios';

export const categoryService = {
	baseUrl: '/api/category',
	create: ({ name }) =>
		new Promise((resolve, reject) => {
			let data = JSON.stringify({
				name,
			});

			let config = {
				method: 'post',
				maxBodyLength: Infinity,
				url: categoryService.baseUrl,
				headers: {
					Authorization: 'Bearer ' + localStorage.getItem('afaqAppToken'),
					'Content-Type': 'application/json',
				},
				data,
			};

			MyAxios.request(config)
				.then((response) => resolve(response.data))
				.catch((error) => reject(error));
		}),
	read: () =>
		new Promise((resolve, reject) => {
			let config = {
				method: 'get',
				maxBodyLength: Infinity,
				url: categoryService.baseUrl,
				headers: {
					Authorization: 'Bearer ' + localStorage.getItem('afaqAppToken'),
				},
			};
			MyAxios.request(config)
				.then((response) => resolve(response.data))
				.catch((error) => reject(error));
		}),
	update: ({ id, name }) =>
		new Promise((resolve, reject) => {
			let data = JSON.stringify({
				name,
			});
			let config = {
				method: 'patch',
				maxBodyLength: Infinity,
				url: categoryService.baseUrl + '/' + id,
				headers: {
					Authorization: 'Bearer ' + localStorage.getItem('afaqAppToken'),
					'Content-Type': 'application/json',
				},
				data,
			};
			MyAxios.request(config)
				.then((response) => resolve(response.data))
				.catch((error) => reject(error));
		}),
	delete: (id) =>
		new Promise((resolve, reject) => {
			let config = {
				method: 'delete',
				maxBodyLength: Infinity,
				url: categoryService.baseUrl + '/' + id,
				headers: {
					Authorization: `Bearer ${localStorage.getItem('afaqAppToken')}`,
				},
			};
			MyAxios.request(config)
				.then((response) => resolve(response.data))
				.catch((error) => reject(error));
		}),
};
