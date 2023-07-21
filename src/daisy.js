import {
	colord,
	extend,
} from 'colord'
import mixPlugin from 'colord/plugins/mix'
import colorNames from './lib/color-names.js'
import variables from './lib/variables.js'

extend([mixPlugin])

export function turnColorValuesToString(input) {
	return `${input.h}deg ${input.s}% ${input.l}%`
}

export function generateForegroundColorFrom(input, percentage = 0.8) {
	const res = colord(input)
		.mix(colord(input).isDark() ? 'white' : 'black', percentage)
		.toHsl()
	return turnColorValuesToString(res)
}

export function generateDarkenColorFrom(input, percentage = 0.07) {
	const res = colord(input)
		.darken(percentage)
		.toHsl()
	return turnColorValuesToString(res)
}

// export function convertColorFormat(input, colorFunction = 'hsl') {
export function convertColorFormat(input) {
	const resultObj = {}

	for (const [rule, value] of Object.entries(input)) {
		if (colorNames?.[rule]) {
			const hslArray = colord(value).toHsl()
			resultObj[colorNames[rule]] = `${hslArray.h}deg ${hslArray.s}% ${hslArray.l}%`
		} else {
			resultObj[rule] = value
		}

		// auto generate focus colors
		const focus = [
			['primary', 'primary-focus', '--pf'],
			['secondary', 'secondary-focus', '--sf'],
			['accent', 'accent-focus', '--af'],
			['neutral', 'neutral-focus', '--nf'],
		]

		for (const [prop, prop_focus, varname] of focus) {
			if (Object.hasOwn(input, prop_focus) === false) {
				resultObj[varname] = generateDarkenColorFrom(input[prop])
			}
		}

		// auto generate base colors
		if (Object.hasOwn(input, 'base-100') === false) {
			resultObj['--b1'] = '100deg 0% 0%'
		}
		if (Object.hasOwn(input, 'base-200') === false) {
			resultObj['--b2'] = generateDarkenColorFrom(input['base-100'])
		}
		if (Object.hasOwn(input, 'base-300') === false) {
			const hasBase200 = Object.hasOwn(input, 'base-200')
			resultObj['--b3'] = hasBase200 ? generateDarkenColorFrom(input['base-200']) : generateDarkenColorFrom(input['base-100'], 0.14)
		}

		// auto generate state colors
		if (Object.hasOwn(input, 'info') === false) {
			resultObj['--in'] = '198deg 93% 60%'
		}
		if (Object.hasOwn(input, 'success') === false) {
			resultObj['--su'] = '158deg 64% 52%'
		}
		if (Object.hasOwn(input, 'warning') === false) {
			resultObj['--wa'] = '43deg 96% 56%'
		}
		if (Object.hasOwn(input, 'error') === false) {
			resultObj['--er'] = '0deg 91% 71%'
		}

		// auto generate content colors
		const contentColor = [
			['base-content', 'base-100', '--bc'],
			['primary-content', 'primary', '--pc'],
			['secondary-content', 'secondary', '--sc'],
			['accent-content', 'accent', '--ac'],
			['neutral-content', 'neutral', '--nc'],
		]

		for (const [prop, prop_base, varname] of contentColor) {
			if (Object.hasOwn(input, prop) === false) {
				resultObj[varname] = generateForegroundColorFrom(input[prop_base])
			}
		}

		if (Object.hasOwn(input, 'info-content') === false) {
			const _c = Object.hasOwn(input, 'info')
			resultObj['--inc'] = _c ? generateForegroundColorFrom(input['info']) : '198deg 100% 12%'
		}
		if (Object.hasOwn(input, 'success-content') === false) {
			const _c = Object.hasOwn(input, 'success')
			resultObj['--suc'] = _c ? generateForegroundColorFrom(input['success']) : '158deg 100% 10%'
		}
		if (Object.hasOwn(input, 'warning-content') === false) {
			const _c = Object.hasOwn(input, 'warning')
			resultObj['--wac'] = _c ? generateForegroundColorFrom(input['warning']) : '43deg 100% 11%'
		}
		if (Object.hasOwn(input, 'error-content') === false) {
			const _c = Object.hasOwn(input, 'error')
			resultObj['--erc'] = _c ? generateForegroundColorFrom(input['error']) : '0deg 100% 14%'
		}

		// add css variables if not exist
		for (const [variable, value] of Object.entries(variables)) {
			if (Object.hasOwn(input, variable) === false) {
				resultObj[variable] = value
			}
		}
	}

	return resultObj
}

export function updateCss(rule, props) {
	let element
	const styleSheets = document.styleSheets
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
