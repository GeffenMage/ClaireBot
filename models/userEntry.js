class UserEntry {
	constructor(uid) {
		this.uid = uid;
		this.cego = 0;
        this.criminoso = 0;
        this.fragmentado = 0;
		this.solado = 0;
		this.surdo = 0;
		this.ignorado = 0;
	}
}

module.exports = {
    UserEntry,
};