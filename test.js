import test from 'ava'
import ig from './'

test('main', async t => {
	const result = await ig(['node', 'osx'])
	t.same(result[0].name, 'Node.gitignore')
	t.same(result[1].name, 'global/OSX.gitignore')
	t.true(result[1].value.indexOf('.DS_Store') > -1)
})
