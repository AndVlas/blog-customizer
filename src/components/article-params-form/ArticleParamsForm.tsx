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
	userOptions: (data: ArticleStateType) => void;
};

export const ArticleParamsForm = ({ userOptions }: TArticleParamsForm) => {
	const [isOpened, setIsOpened] = useState(false);
	const [option, setOption] = useState(defaultArticleState);
	const ref = useRef<HTMLElement | null>(null);

	useModal({
		isOpened,
		onClose: () => setIsOpened(false),
		rootRef: ref,
	});

	const openHandler = () => {
		isOpened === false ? setIsOpened(true) : setIsOpened(false);
	};

	const resetOptions = () => {
		setOption(defaultArticleState);
		userOptions(defaultArticleState);
	};

	const applyOptions = (evt: FormEvent) => {
		evt.preventDefault();
		userOptions(option);
	};

	const handleOnChange = (field: keyof ArticleStateType) => {
		return (value: OptionType) => {
			setOption((prevOption) => ({ ...prevOption, [field]: value }));
		};
	};

	return (
		<>
			<ArrowButton isOpen={isOpened} onClick={openHandler} />
			<aside
				className={
					isOpened === true
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
						onChange={handleOnChange('fontFamilyOption')}
					/>
					<RadioGroup
						selected={option.fontSizeOption}
						name='font-size'
						options={fontSizeOptions}
						title='Размер шрифта'
						onChange={handleOnChange('fontSizeOption')}
					/>
					<Select
						selected={option.fontColor}
						options={fontColors}
						title='Цвет шрифта'
						onChange={handleOnChange('fontColor')}
					/>
					<Separator />
					<Select
						selected={option.backgroundColor}
						options={backgroundColors}
						title='Цвет фона'
						onChange={handleOnChange('backgroundColor')}
					/>
					<Select
						selected={option.contentWidth}
						options={contentWidthArr}
						title='Ширина контента'
						onChange={handleOnChange('contentWidth')}
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
