import pc from 'picocolors'
import {oklch, interpolate, wcagContrast} from 'culori'
import colorNames from './lib/color-names.js'

const colorIsInvalid = input => {
	console.error(`├─ ${pc.red('⚠︎')} ${pc.bgRed(' Error ')} Invalid color ${pc.red(input)} in ${pc.green('your config.')}`)
}

export const cutNumber = number => {
	return globalThis.isNaN(number) ? 0 : +number.toFixed(6)
}

export const isDark = color => {
	try {
		if (wcagContrast(color, 'black') < wcagContrast(color, 'white')) {
			return true
		}
	} catch (error) {
		console.debug('isDark', error.message, color)
	}
	return false
}

export const colorObjToString = input => {
	const {l, c, h} = input
	return `${cutNumber(l)} ${cutNumber(c)} ${cutNumber(h)}`
}

export const generateForegroundColorFrom = (input, percentage = 0.8) => {
	try {
		const result = interpolate([input, isDark(input) ? 'white' : 'black'], 'oklch')(percentage)
		return colorObjToString(result)
	} catch (error) {
		console.debug('generateForegroundColorFrom', error.message, input)
		return false
	}
}

export const generateDarkenColorFrom = (input, percentage = 0.07) => {
	try {
		const result = interpolate([input, 'black'], 'oklch')(percentage)
		return colorObjToString(result)
	} catch (error) {
		console.debug('generateDarkenColorFrom', error.message, input)
		return false
	}
}

export const convertColorFormat = input => {
	if (typeof input !== 'object' || input === null) {
		return input
	}

	const resultObj = {}

	for (const [rule, value] of Object.entries(input)) {
		if (Object.hasOwn(colorNames, rule)) {
			try {
				const colorObj = oklch(value)
				resultObj[colorNames[rule]] = colorObjToString(colorObj)
			} catch {
				colorIsInvalid(value)
				continue
			}
		} else {
			resultObj[rule] = value
		}

		// auto generate content colors
		const contentColor = [
			['base-content', 'base-100', '--bc'],
			['primary-content', 'primary', '--pc'],
			['secondary-content', 'secondary', '--sc'],
			['accent-content', 'accent', '--ac'],
			['neutral-content', 'neutral', '--nc'],
			['info-content', 'info', '--inc'],
			['success-content', 'success', '--suc'],
			['warning-content', 'warning', '--wac'],
			['error-content', 'error', '--erc'],
		]

		const point = 0.8

		for (const [prop, prop_base, varname] of contentColor) {
			if (Object.hasOwn(input, prop) === false && Object.hasOwn(input, prop_base)) {
				resultObj[varname] = generateForegroundColorFrom(input[prop_base], point)
			}
		}

		// add other custom styles
		if (!Object.hasOwn(colorNames, rule)) {
			resultObj[rule] = value
		}
	}

	return resultObj
}

export function updateCss(rule, props) {
	let element
	const styleSheets = globalThis.document.styleSheets
	for (const styleSheet of styleSheets) {
		let cssRules
		/* c8 ignore next 5 */
		try {
			cssRules = styleSheet?.cssRules ?? []
		} catch {
			cssRules = []
		}
		for (const cssRule of cssRules) {
			if (cssRule.selectorText === rule) {
				element = cssRule
				break
			}
		}
	}

	if (element) {
		for (const [k, v] of Object.entries(props)) {
			element.style.setProperty(k, v)
		}
	}
}
