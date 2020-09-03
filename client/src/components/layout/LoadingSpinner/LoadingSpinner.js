import React from 'react';

const LoadingSpinner = () => {
	return (
		<div className='h-full w-full flex justify-center items-center'>
			<div className='LoadingSpinner__Container h-8 w-8 
							border-4 border-gray-200 border-opacity-0.5 rounded-full
							animate-spin'>
			</div>
		</div>
	);
};

export default LoadingSpinner;
