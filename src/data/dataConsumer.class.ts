import { DataService } from './data.service';

export abstract class DataConsumerService<T> {
 abstract readonly fileName: string;
 
 protected data: T[];
 protected dataService: DataService;

  async retrieveData() {
    this.data = await this.dataService.read(this.fileName);
    console.log(this.data);
  }

  save() {
    this.dataService.write(this.fileName, this.data);
  }
}
