import DOMPurify from 'dompurify' // xss
// highlight.js 高亮代码
// 通过类名 .hljs 来控制代码高亮
export default function Qs(props: any) {
  const img = '<img src="../../assets/image/009.jpg" onload="alert(cookie)">'

  const html = DOMPurify.sanitize(img)
  syslog(html)

  console.log('---props---', props)
  return <div>index</div>
}
