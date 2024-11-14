import { ArrowButton } from 'src/ui/arrow-button';
import { Button } from 'src/ui/button';
import { Select } from 'src/ui/select';
import { Text } from 'src/ui/text';
import { RadioGroup } from 'src/ui/radio-group';
import { Separator } from 'src/ui/separator';

import { useState, useRef, FormEvent } from 'react';
import { useModal } from './hooks/useModal';

import {
	ArticleStateType,
	OptionType,
	fontFamilyOptions,
	fontSizeOptions,
	fontColors,
	backgroundColors,
	contentWidthArr,
	defaultArticleState,
} from 'src/constants/articleProps';

import styles from './ArticleParamsForm.module.scss';

type TArticleParamsForm = {
	defaultOptions: ArticleStateType;
	userOptions: (data: ArticleStateType) => void;
};

export const ArticleParamsForm = ({
	defaultOptions,
	userOptions,
}: TArticleParamsForm) => {
	const [opened, setOpened] = useState(false);
	const [option, setOption] = useState(defaultOptions);
	const ref = useRef<HTMLElement | null>(null);

	useModal({
		opened,
		onClose: () => setOpened(false),
		rootRef: ref,
	});

	const openHandler = () => {
		opened === false ? setOpened(true) : setOpened(false);
	};

	const resetOptions = () => {
		setOption(defaultArticleState);
		userOptions(defaultArticleState);
	};

	const applyOptions = (evt: FormEvent) => {
		evt.preventDefault();
		userOptions(option);
	};

	const fontFamilyOptionHandler = (value: OptionType) => {
		setOption({ ...option, fontFamilyOption: value });
	};

	const fontSizeOptionsHandler = (value: OptionType) => {
		setOption({ ...option, fontSizeOption: value });
	};

	const fontColorHandler = (value: OptionType) => {
		setOption({ ...option, fontColor: value });
	};

	const backgroundColorHandler = (value: OptionType) => {
		setOption({ ...option, backgroundColor: value });
	};

	const contentWidthHandler = (value: OptionType) => {
		setOption({ ...option, contentWidth: value });
	};

	return (
		<>
			<ArrowButton isOpen={opened} onClick={openHandler} />
			<aside
				className={
					opened === true
						? `${styles.container} ${styles.container_open}`
						: styles.container
				}
				ref={ref}>
				<form
					className={styles.form}
					onSubmit={applyOptions}
					onReset={resetOptions}>
					<Text size={31} weight={800} uppercase={true}>
						Задайте параметры
					</Text>
					<Select
						selected={option.fontFamilyOption}
						options={fontFamilyOptions}
						title='Шрифт'
						onChange={fontFamilyOptionHandler}
					/>
					<RadioGroup
						selected={option.fontSizeOption}
						name='font-size'
						options={fontSizeOptions}
						title='Размер шрифта'
						onChange={fontSizeOptionsHandler}
					/>
					<Select
						selected={option.fontColor}
						options={fontColors}
						title='Цвет шрифта'
						onChange={fontColorHandler}
					/>
					<Separator />
					<Select
						selected={option.backgroundColor}
						options={backgroundColors}
						title='Цвет фона'
						onChange={backgroundColorHandler}
					/>
					<Select
						selected={option.contentWidth}
						options={contentWidthArr}
						title='Ширина контента'
						onChange={contentWidthHandler}
					/>
					<div className={styles.bottomContainer}>
						<Button title='Сбросить' htmlType='reset' type='clear' />
						<Button title='Применить' htmlType='submit' type='apply' />
					</div>
				</form>
			</aside>
		</>
	);
};
