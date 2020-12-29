import React, { createContext, useCallback, useContext, useState } from 'react'

interface MenuContextProps {
	show: boolean
	setShow: (value: boolean) => void
}

const MenuContext = createContext<MenuContextProps>({} as MenuContextProps)

const MenuProvider: React.FC = ({ children }) => {
	const [showMenu, setShowMenu] = useState(false)

	const setShow = useCallback((value: boolean) => setShowMenu(value), [])

	return (
		<MenuContext.Provider value={{ show: showMenu, setShow }} >
			{children}
		</MenuContext.Provider>
	)
}

function useShowMenu(): MenuContextProps {
	const context = useContext(MenuContext)

	if (!context) {
		throw new Error('useShowMenu must be used within an MenuProvider')
	}

	return context
}

export { MenuProvider, useShowMenu }
