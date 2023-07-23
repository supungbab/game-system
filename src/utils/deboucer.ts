export class Debouncer {
  constructor(public pendingData: any) {}

  async debounce({ data }, callback) {
    if (this.pendingData[data] !== undefined) {
      return await this.pendingData[data];
    }

    this.pendingData[data] = callback(data);

    try {
      return await this.pendingData[data];
    } finally {
      delete this.pendingData[data];
    }
  }
}
