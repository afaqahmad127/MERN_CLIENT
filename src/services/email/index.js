import emailjs from '@emailjs/browser';
export const emailService = {
	sendEmail: async ({ to, name, password }) => {
		try {
			const res = await emailjs.send(
				process.env.REACT_APP_EMAILJS_SERVICE_ID ?? '',
				process.env.REACT_APP_EMAILJS_TEMPLATE_ID ?? '',
				{
					from:
						process.env.REACT_APP_OWNER_EMAIL ??
						'afaq.ahmad.developer@gmail.com',
					to,
					email: to,
					name,
					password,
				},
				process.env.REACT_APP_EMAILJS_PUBLIC_KEY ?? ''
			);
			return res;
		} catch (err) {
			console.log('error sending email', err);
		}
	},
};
