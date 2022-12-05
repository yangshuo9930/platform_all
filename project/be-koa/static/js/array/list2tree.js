let lll = [
  {
    id: '1',
    parentId: ''
  },
  {
    id: '1-1',
    parentId: '1'
  },
  {
    id: '1-2',
    parentId: '1'
  },
  {
    id: '2',
    parentId: ''
  },
  {
    id: '2-2',
    parentId: '2'
  }
]

function list2tree(arr, parentId = '') {
  let temp = []
  arr.forEach((item) => {
    if (item.parentId === parentId) {
      const children = list2tree(arr, item.id)
      children.length && (item.children = children)
      temp.push(item)
    }
  })
  return temp
}

function tree2list(tree, childName = 'children') {
  let list = []
  tree.forEach((item) => {
    list.push(item)
    if (item[childName] && item[childName].length) {
      let result = tree2list(item[childName])
      list = [...list, ...result]
      delete item[childName]
    }
  })
  return list
}

document.querySelector('.list2tree').addEventListener('click', () => {
  const tree = list2tree(lll, '')
  const list = tree2list(tree)
  console.log(tree)
  console.log(list)
})

function list2Tree(list, parentId = '') {
  let tree = []
  list.forEach((item) => {
    if (item.parentId === parentId) {
      const children = list2Tree(list, item.id)
      children.length && (item.children = children)
      tree.push(item)
    }
  })

  return tree
}

function tree2List(tree) {
  let list = []
  tree.forEach((item) => {
    list.push(item)
    if (item.children && item.children.length) {
      const result = tree2List(item.children)
      list = [...list, ...result]
      delete item.children
    }
  })
  return list
}
