'use strict'
const DataStore = require('./DataStore')
    const { ipcRenderer } = require('electron')

    document.getElementById('agentForm').addEventListener('submit', (evt) => {
      // prevent default refresh functionality of forms
      evt.preventDefault()

      // input on the form
      const input = evt.target[0]
    const i1 = evt.target[1]
    
      const inputs = {
        name: evt.target[0].value,
        intents: evt.target[1].value
      }
      console.log(inputs)
      // send todo to main process
      ipcRenderer.send('add-agent', inputs)

      // reset input
      input.value = ''
      i1.value = ''
    })
    const agentsData = new DataStore({ name: 'Agents Main' })
    const agentList1 = document.getElementById('intentsList')
    const agents = agentsData.agents
    const agentItems1 = agents.reduce((html, agent) => {
        html += `<option>${agent.name}: ${agent.intents}</option>`

        return html
    }, '')
    agentList1.innerHTML = agentItems1