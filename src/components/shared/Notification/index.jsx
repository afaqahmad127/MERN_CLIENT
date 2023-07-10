export const Notification = {
	infoMessage: (api, description) => {
		api.info({
			message: 'Info',
			description,
			placement: 'top',
		});
	},
	errorMessage: (api, description) => {
		api.error({
			message: 'Error',
			description,
			placement: 'top',
		});
	},
	successMessage: (api, description) => {
		api.success({
			message: 'Success',
			description,
			placement: 'top',
		});
	},
};
