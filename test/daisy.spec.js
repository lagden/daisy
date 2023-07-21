import {JSDOM} from 'jsdom'
import test from 'ava'
import {
	convertColorFormat,
	updateCss,
} from '../src/daisy.js'

test.before(() => {
	const dom = new JSDOM('<style>[data-theme="nimble"]{color: green;}</style><div data-theme=nimble />')
	globalThis.document = dom.window.document
})

test('generate', t => {
	const res = convertColorFormat({
		'primary': 'hsl(56deg 89% 78%)',
		'secondary': '#15106d',
		'accent': '#ea0036',
		'neutral': '#1d1d30',
		'base-100': '#dfe5ec',
		'info': '#97a7f7',
		'success': '#3de189',
		'warning': '#fc9936',
		'error': '#e74671',
		'xxx': '#FFCC00',
	})
	t.snapshot(res, 'generate')
})

test('ignore state and use base-200', t => {
	const res = convertColorFormat({
		'primary': 'hsl(56deg 89% 78%)',
		'secondary': '#15106d',
		'accent': '#ea0036',
		'base-200': 'red',
	})
	t.snapshot(res, 'ignore state and use base-200')
})

test('updateCss', t => {
	updateCss('[data-theme="nimble"]', {
		'--a': '346deg 100% 46%',
		'--ac': '5deg 50% 13%',
		'--af': '346deg 100% 39%',
		'--animation-btn': '0.25s',
		'--animation-input': '.2s',
		'--b1': '212deg 25% 90%',
		'--b2': '212deg 25% 83%',
		'--b3': '212deg 25% 76%',
		'--bc': '212deg 2% 17%',
		'--border-btn': '1px',
		'--btn-focus-scale': '0.95',
		'--btn-text-case': 'uppercase',
		'--er': '344deg 77% 59%',
		'--erc': '350deg 35% 13%',
		'--in': '230deg 86% 78%',
		'--inc': '233deg 17% 16%',
		'--n': '240deg 25% 15%',
		'--nc': '245deg 29% 4%',
		'--nf': '240deg 25% 8%',
		'--p': '56deg 89% 78%',
		'--pc': '54deg 19% 16%',
		'--pf': '56deg 89% 71%',
		'--rounded-badge': '1.9rem',
		'--rounded-box': '1rem',
		'--rounded-btn': '0.5rem',
		'--s': '243deg 74% 25%',
		'--sc': '266deg 69% 6%',
		'--sf': '243deg 74% 18%',
		'--su': '148deg 73% 56%',
		'--suc': '141deg 31% 13%',
		'--tab-border': '1px',
		'--tab-radius': '0.5rem',
		'--wa': '30deg 97% 60%',
		'--wac': '28deg 45% 13%',
	})
	t.snapshot(globalThis.document.styleSheets)
})
