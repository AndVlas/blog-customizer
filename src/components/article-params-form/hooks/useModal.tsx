import { useEffect } from 'react';

type TUseModal = {
	opened: boolean;
	onClose: () => void;
	rootRef: React.RefObject<HTMLElement>;
};

export function useModal({ opened, onClose, rootRef }: TUseModal) {
	useEffect(() => {
		const clickHandler = (evt: MouseEvent) => {
			const target = evt.target as HTMLElement;
			if (rootRef.current && !rootRef.current.contains(target)) {
				onClose();
			}
		};

		document.addEventListener('mousedown', clickHandler);

		return () => {
			document.removeEventListener('mousedown', clickHandler);
		};
	}, [opened, onClose, rootRef]);
}
