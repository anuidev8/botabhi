
import axios from 'axios'
export const useOpenAiApi = () =>{

    const getThread = async () =>{
        if (!localStorage.getItem('threadId')) {
            /* let data = JSON.stringify({})
          
            let config = {
              method: 'post',
              maxBodyLength: Infinity,
              url: 'https://api.openai.com/v1/threads',
              headers: {
                'OpenAI-Beta': 'assistants=v1',
                Authorization: 'Bearer ' + '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',
                'Content-Type': 'application/json'
              },
              data: data
            }
          
            const response = await axios.request(config)
            localStorage.setItem('threadId',`${response.data.id}`)

            return response.data.id */
            const res = await axios.get('https://testappapi.pythonanywhere.com/start')
          const data = res.data.thread_id
          localStorage.setItem('threadId',`${data}`)
          return data
          }else{
            return localStorage.getItem('threadId')
          }
          
    }

    const sendMessage =  async(message) =>{
        const threadId = localStorage.getItem('threadId')
        const user ={
          "thread_id": threadId,
          "message": message
      
      }
        const res = await axios.post('https://testappapi.pythonanywhere.com/chat',user)
          const data = res.data.run_id
          return data 
        /* let data = JSON.stringify({
            role: 'user',
            content:`In short summary response according to docs to user ${message}`
          })
          
          let config = {
            method: 'post',
            maxBodyLength: Infinity,
            url: `https://api.openai.com/v1/threads/${threadId}/messages`,
            headers: {
              'OpenAI-Beta': 'assistants=v1',
              Authorization: `Bearer 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`,
              'Content-Type': 'application/json'
            },
            data: data
          }
          
         const res = await axios.request(config)
         console.log(res); */
    }

    const checking = async (id) =>{
        const threadId = localStorage.getItem('threadId')
        /* const creationResponse = await axios.request({
            method: 'post',
            maxBodyLength: Infinity,
            url: `https://api.openai.com/v1/threads/${threadId}/runs`,
            headers: {
              'OpenAI-Beta': 'assistants=v1',
              Authorization: `Bearer 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`,
              'Content-Type': 'application/json'
            },
            data: JSON.stringify({
              assistant_id: 'asst_3SQjJomOmOEFlgBJtMhdtJcX'
            })
          })
          
          const runId = creationResponse.data.id
          
          const waitTillRunComplete = async () => {
            const statusResponse = await axios.request({
              method: 'get',
              maxBodyLength: Infinity,
              url: `https://api.openai.com/v1/threads/${threadId}/runs/${runId}`,
              headers: {
                'OpenAI-Beta': 'assistants=v1',
                Authorization: `Bearer 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`,
                'Content-Type': 'application/json'
              }
            })
          
            if (['queued', 'in_progress'].includes(statusResponse.data.status) === false) {
              console.log('the status is:', statusResponse.data.status)
              return
            }
            await new Promise((resolve) => {
              setTimeout(resolve, 1000)
            })
            await waitTillRunComplete()
          }
          
          await waitTillRunComplete() */
          
        const user ={
          "thread_id": threadId,
          "run_id": id
      
      }
        const res = await axios.post('https://testappapi.pythonanywhere.com/check',user)
          const data = res.data.response
          return data 
          
    }

    const getMessage = async () =>{
        const threadId = localStorage.getItem('threadId')
        const response = await axios.request({
            method: 'get',
            maxBodyLength: Infinity,
            url: `https://api.openai.com/v1/threads/${threadId}/messages`,
            headers: {
              'OpenAI-Beta': 'assistants=v1',
              Authorization: `Bearer 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`,
              'Content-Type': 'application/json'
            }
          })
          
          return response.data.data[0].content[0].text.value ?? null
          
    }
    return{
        getThread,
        sendMessage,
        checking,
        getMessage

    }
}