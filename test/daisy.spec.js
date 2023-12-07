import {JSDOM} from 'jsdom'
import {test, before} from 'node:test'
import assert from 'node:assert/strict'
import {inspect} from 'node:util'
// prettier-ignore
import {
	convertColorFormat,
	updateCss,
	isDark,
	generateForegroundColorFrom,
	generateDarkenColorFrom,
	cutNumber,
} from '../src/daisy.js'

before(() => {
	const dom = new JSDOM('<style>[data-theme="test"]{color: green;}</style><div data-theme=test />')
	globalThis.document = dom.window.document
})

test('generate', () => {
	const res = convertColorFormat({
		primary: 'hsl(56deg 89% 78%)',
		secondary: '#15106d',
		accent: '#ea0036',
		neutral: '#1d1d30',
		'base-100': '#dfe5ec',
		info: '#97a7f7',
		success: '#3de189',
		warning: '#fc9936',
		error: '#e74671',
		'--xxx': '#FFCC00',
	})
	console.log(res)
	assert.ok(true)
})

test('base-100', () => {
	const res = convertColorFormat({
		'base-100': '#282a36',
	})
	console.log(res)
	assert.ok(true)
})

test('ignore state and use base-200', () => {
	const res = convertColorFormat({
		primary: 'hsl(56deg 89% 78%)',
		secondary: '#15106d',
		accent: '#ea0036',
		'base-200': 'red',
	})
	console.log(res)
	assert.ok(true)
})

test('invalid color', () => {
	const res = convertColorFormat({
		primary: 'xxx',
	})
	console.log(res)
	assert.ok(true)
})

test('invalid isDark', () => {
	const res = isDark()
	console.log(res)
	assert.ok(true)
})

test('invalid generateForegroundColorFrom', () => {
	const res = generateForegroundColorFrom()
	console.log(res)
	assert.ok(true)
})

test('invalid generateDarkenColorFrom', () => {
	const res = generateDarkenColorFrom()
	console.log(res)
	assert.ok(true)
})

test('invalid convertColorFormat', () => {
	const res = convertColorFormat()
	console.log(res)
	assert.ok(true)
})

test('invalid cutNumber', () => {
	const res = cutNumber()
	console.log(res)
	assert.ok(true)
})

test('updateCss', () => {
	updateCss('[data-theme="test"]', {
		'--p': '0.946807 0.115013 104.832694',
		'--bc': '0.183873 0.002301 252.093065',
		'--pc': '0.189361 0.023003 104.832694',
		'--sc': '0.853867 0.029909 272.328308',
		'--ac': '0.918373 0.047671 21.805728',
		'--nc': '0.848092 0.007219 283.350499',
		'--inc': '0.149491 0.023389 274.592072',
		'--suc': '0.161317 0.036431 154.592741',
		'--wac': '0.154035 0.031868 60.682465',
		'--erc': '0.126841 0.039598 8.990987',
		'--s': '0.269337 0.149543 272.328308',
		'--a': '0.591866 0.238354 21.805728',
		'--n': '0.240459 0.036096 283.350499',
		'--b1': '0.919367 0.011507 252.093065',
		'--in': '0.747457 0.116946 274.592072',
		'--su': '0.806586 0.182154 154.592741',
		'--wa': '0.770175 0.159339 60.682465',
		'--er': '0.634206 0.197991 8.990987',
	})

	console.log(inspect(globalThis.document.styleSheets[0].cssRules))
	assert.ok(true)
})
