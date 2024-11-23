import { CSSProperties, useState } from 'react';

import { Article } from '../article/Article';
import { ArticleParamsForm } from '../article-params-form/ArticleParamsForm';
import { defaultArticleState } from 'src/constants/articleProps';

import styles from './app.module.scss';

export const App = () => {
	const [currentOptions, setCurrentOptions] = useState(defaultArticleState);

	return (
		<main
			className={styles.main}
			style={
				{
					'--font-family': currentOptions.fontFamilyOption.value,
					'--font-size': currentOptions.fontSizeOption.value,
					'--font-color': currentOptions.fontColor.value,
					'--container-width': currentOptions.contentWidth.value,
					'--bg-color': currentOptions.backgroundColor.value,
				} as CSSProperties
			}>
			<ArticleParamsForm userOptions={setCurrentOptions} />
			<Article />
		</main>
	);
};
