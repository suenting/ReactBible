import {act} from '@testing-library/react'

export const flush = async() => {
	await act(async () => {
		await Promise.resolve();
	})
};
