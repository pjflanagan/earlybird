
const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
const TYPE = {
	SCHEDULE: 'schedule',
	DRAFT: 'draft',
	SEND: 'send',
	UNDATED: -1,
	NOID: -1,
};
const ACTION = {
	CREATE: 'create',
	UPDATE: 'update',
	SEND: 'send',
	DELETE: 'delete'
}
const ALERT = {
	SUCCESS: 'success',
	WARNING: 'warning',
	ERROR: 'danger',
	INFO: 'info'
};
const MAX_TWEET_LENGTH = 140 * 2;
const MAX_DRAFT_LENGTH = 140 * 3;
