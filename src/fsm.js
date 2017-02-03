class FSM {
    /**
     * Creates new FSM instance.
     * @param config
     */
    constructor(config) {
		if (!config) {throw new Error("Config missing")}; 	
    	this.state = config.initial;
    	this.states = config.states;
    	this.history = [config.initial];
    	this.step = 0;
    }

    /**
     * Returns active state.
     * @returns {String}
     */
    getState() {
    	return this.state;
    }

    /**
     * Goes to specified state.
     * @param state
     */
    changeState(state) {
    	if (this.states[state] === undefined) {throw new Error("Wrong state")};
    	this.state = state;
    	this.history[this.step + 1] = state;
    	this.step++;
    }

    /**
     * Changes state according to event transition rules.
     * @param event
     */
    trigger(event) {
    	if (this.states[this.state]["transitions"][event] === undefined) {throw new Error("Wrong state")};
    	this.state = this.states[this.state]["transitions"][event];
    	this.history[this.step + 1] = this.state;
    	this.step++;
    }

    /**
     * Resets FSM state to initial.
     */
    reset() {
    	this.state = "normal";
    	this.history[this.step + 1] = this.state;
    	this.step++;
    }

    /**
     * Returns an array of states for which there are specified event transition rules.
     * Returns all states if argument is undefined.
     * @param event
     * @returns {Array}
     */
    getStates(event) {
    	if (event === undefined) {return ['normal', 'busy', 'hungry', 'sleeping']}

    	var all = [],
    		count = 0;
    	for (var key in this.states) {
    		if (this.states[key]["transitions"][event]) {
    			all[count] = key;
    			count++;
    		}
    	}
    	return all;
    }

    /**
     * Goes back to previous state.
     * Returns false if undo is not available.
     * @returns {Boolean}
     */
    undo() {
		if (this.step == 0) {return false;}; 
    	this.state = this.history[this.step - 1];
    	this.step--;
    	return true;
    }

    /**
     * Goes redo to state.
     * Returns false if redo is not available.
     * @returns {Boolean}
     */
    redo() {
		if (this.history[this.step + 1] == null) {return false;};
    	this.state = this.history[this.step + 1];
    	this.step++;    	
    	return true;
    }

    /**
     * Clears transition history
     */
    clearHistory() {
    	this.history = [];
    	this.step = 0;
    }
}

module.exports = FSM;

/** @Created by Uladzimir Halushka **/
