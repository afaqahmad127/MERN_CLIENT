import { MyAxios } from '../axios';
import { emailService } from '../email';

export const authService = {
	login: ({ email, password }) =>
		new Promise((resolve, reject) => {
			let data = JSON.stringify({
				email,
				password,
			});
			let config = {
				method: 'post',
				maxBodyLength: Infinity,
				url: '/auth/login',
				headers: {
					'Content-Type': 'application/json',
				},
				data,
			};
			MyAxios.request(config)
				.then((response) => {
					localStorage.setItem('user', JSON.stringify(response.data.data.user));
					localStorage.setItem(
						'afaqAppToken',
						JSON.stringify(response.data.data.token.replace(/"/g, ''))
					);
					resolve(response.data);
				})
				.catch((error) => reject(error));
		}),
	signUp: ({ name, email }) =>
		new Promise((resolve, reject) => {
			const password = Math.random().toString(36).slice(-8);
			let data = JSON.stringify({
				email,
				password,
				name,
			});

			let config = {
				method: 'post',
				maxBodyLength: Infinity,
				url: 'http://localhost:2023/auth/signup',
				headers: {
					'Content-Type': 'application/json',
				},
				data: data,
			};
			MyAxios.request(config)
				.then((response) => {
					emailService.sendEmail({ to: email, name, password });
					resolve(response.data);
				})
				.catch((error) => reject(error));
		}),
};
