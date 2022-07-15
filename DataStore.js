'use strict'

const Store = require('electron-store')

class DataStore extends Store {
  constructor (settings) {
    super(settings)

    // initialize with agents or empty array
    this.agents = this.get('agents') || []
  }

  saveagents () {
    // save agents to JSON file
    this.set('agents', this.agents)

    // returning 'this' allows method chaining
    return this
  }

  getagents () {
    // set object's agents to agents in JSON file
    this.agents = this.get('agents') || []

    return this
  }

  addagent (agent) {
    // merge the existing agents with the new agent
    this.agents = [ ...this.agents, agent ]

    return this.saveagents()
  }

  deleteagent (agent) {
    // filter out the target agent
    this.agents = this.agents.filter(t => t !== agent)

    return this.saveagents()
  }
}

module.exports = DataStore
