import { Service } from 'egg'

/**
 * Test Service
 */
export default class News extends Service {
  /**
   * sayHi to you
   * @param name - your name
   */
  public async getList() {
    return 'List'
  }
}
