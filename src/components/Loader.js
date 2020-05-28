import Loader from 'react-loader-spinner';
import React from 'react';
import * as colors from '../constants/colors';
 
const LoaderView = (props) => {
	const {classes, size=300} = props;
  return(
		<Loader
			type="Puff"
			color={colors.BLACK}
			secondaryColor={colors.BLACK}
			height={size}
			width={size}
		/>
	);
}

export default LoaderView;