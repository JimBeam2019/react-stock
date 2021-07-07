const DbEvent = require('../event/DbEvent');

/**
 *
 *
 * @class Init
 */
class Init {
  /**
   *
   *
   * @memberof Init
   */
  async initApp() {
    const dbEvent = new DbEvent();
    const INIT_DATABASE = dbEvent.getInitDbEventName();

    dbEvent.emit(INIT_DATABASE);

    dbEvent.removeAllListeners(INIT_DATABASE);
  }
}

module.exports = Init;
