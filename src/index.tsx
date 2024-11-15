import { createRoot } from 'react-dom/client';
import { StrictMode, CSSProperties, useState } from 'react';
import clsx from 'clsx';

import { Article } from './components/article/Article';
import { ArticleParamsForm } from './components/article-params-form/ArticleParamsForm';
import { defaultArticleState } from './constants/articleProps';

import './styles/index.scss';
import styles from './styles/index.module.scss';

const domNode = document.getElementById('root') as HTMLDivElement;
const root = createRoot(domNode);

const App = () => {
	const [defaultOptions, userOptions] = useState(defaultArticleState);

	return (
		<main
			className={clsx(styles.main)}
			style={
				{
					'--font-family': defaultOptions.fontFamilyOption.value,
					'--font-size': defaultOptions.fontSizeOption.value,
					'--font-color': defaultOptions.fontColor.value,
					'--container-width': defaultOptions.contentWidth.value,
					'--bg-color': defaultOptions.backgroundColor.value,
				} as CSSProperties
			}>
			<ArticleParamsForm
				defaultOptions={defaultOptions}
				userOptions={userOptions}
			/>
			<Article />
		</main>
	);
};

root.render(
	<StrictMode>
		<App />
	</StrictMode>
);
