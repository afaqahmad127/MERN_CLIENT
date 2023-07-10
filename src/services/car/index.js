import { MyAxios } from '../axios';

export const carService = {
	baseUrl: '/api/car',
	create: ({ category, color, model, make, registrationNo }) =>
		new Promise((resolve, reject) => {
			let data = JSON.stringify({
				category,
				color,
				model,
				make,
				registrationNo,
			});

			let config = {
				method: 'post',
				maxBodyLength: Infinity,
				url: carService.baseUrl,
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
				url: carService.baseUrl,
				headers: {
					Authorization: `Bearer ${localStorage.getItem('afaqAppToken')}`,
				},
			};
			MyAxios.request(config)
				.then((response) => resolve(response.data))
				.catch((error) => reject(error));
		}),
	update: ({ id, body }) =>
		new Promise((resolve, reject) => {
			let data = JSON.stringify(body);
			let config = {
				method: 'patch',
				maxBodyLength: Infinity,
				url: carService.baseUrl + '/' + id,
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
				url: carService.baseUrl + '/' + id,
				headers: {
					Authorization: 'Bearer ' + localStorage.getItem('afaqAppToken'),
					'Content-Type': 'application/json',
				},
			};
			MyAxios.request(config)
				.then((response) => resolve(response.data))
				.catch((error) => reject(error));
		}),
};
