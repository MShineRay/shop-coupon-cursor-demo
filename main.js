import ollama from 'ollama'

const response = await ollama.chat({
  model: 'llama3.2',
  messages: [{ role: 'user', content: `规则：
功能描述：实现店家返券方面的业务，至少3个页面，有登录页面，有排队页面，有优惠券列表页面；登录页需要手机号及短信验证码，排队页面需要展示当前已排队人数，我排得号码是多少；优惠券列表页要区分开未使用，已使用，已过期等状态，需要展示优惠的金额，有效期
客户端类型：移动端
支持响应式
弹性布局
支持mock数据
设计风格：精简
请求工具：fetch/axios
技术栈：vue、vite、vantui

要求：
  输出完整的示例代码，展示完整的目录结构` }],
})
console.log(response.message.content)